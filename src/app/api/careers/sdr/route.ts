import {
  addKekaCandidateNote, createKekaCandidate, fieldLabel, getSdrForm, KekaError, uploadKekaDocument, uploadKekaResume,
} from "@/lib/kekaHire";
import { APPLICATION_UNAVAILABLE, APPLICATION_UPLOAD_BYTES, validApplicationFile } from "@/lib/sdrApplication";
import { CALL_ID, canReadReport, getCallResult } from "@/lib/voxsphere";

const CACHE_HEADERS = { "Cache-Control": "private, no-store" };
const json = (body: object, status = 200) => Response.json(body, { status, headers: CACHE_HEADERS });

export async function GET(request: Request) {
  if (request.headers.get("sec-fetch-site") === "cross-site") return json({ available: false }, 403);
  try {
    const { documents, fields } = await getSdrForm();
    const gender = fields.find((field) => fieldLabel(field) === "gender");
    return json({
      available: true,
      documents: documents.length,
      genderOptions: gender?.fieldOptions?.map((option) => option.value) ?? [],
      genderRequired: gender?.required === true,
      dateOfBirth: fields.some((field) => ["date of birth", "dob"].includes(fieldLabel(field))),
    });
  } catch (error) {
    console.error("Keka application unavailable", error instanceof KekaError ? error.message : undefined);
    return json({ available: false }, 503);
  }
}

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) return json({ message: "Submit from the campaign page." }, 403);
  if (Number(request.headers.get("content-length")) > APPLICATION_UPLOAD_BYTES + 100_000) {
    return json({ message: "The combined attachments must be 4 MB or smaller." }, 413);
  }

  const data = await request.formData().catch(() => null);
  if (!data) return json({ message: "The application could not be read." }, 400);
  const text = (name: string) => {
    const value = data.get(name);
    return typeof value === "string" ? value.trim() : "";
  };
  const number = (name: string) => {
    const value = text(name);
    return value && /^\d+$/.test(value) && Number.isSafeInteger(Number(value)) ? Number(value) : undefined;
  };
  const callId = text("call_id");
  const firstName = text("first_name");
  const lastName = text("last_name");
  const email = text("email");
  const countryCode = text("phone_code");
  const phone = text("phone").replace(/[\s().-]/g, "");
  const automation = text("automation");
  const resume = data.get("resume");
  const documents = data.getAll("documents");

  if (!CALL_ID.test(callId) || !canReadReport(callId, request.headers.get("authorization"))) {
    return json({ message: "Your call session expired. Take another call to apply." }, 403);
  }
  if (!firstName || firstName.length > 100 || !lastName || lastName.length > 100 ||
      email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !/^\+\d{1,4}$/.test(countryCode) || !/^\d{6,14}$/.test(phone) ||
      text("consent") !== "yes" || !automation || automation.length > 1000) {
    return json({ message: "Check your name, email, phone, automation answer and consent." }, 400);
  }
  if (!(resume instanceof File) || !validApplicationFile(resume) ||
      !documents.every((file): file is File => file instanceof File && validApplicationFile(file))) {
    return json({ message: "Attach your résumé and use one of the supported document formats." }, 400);
  }
  if (resume.size + documents.reduce((bytes, file) => bytes + file.size, 0) > APPLICATION_UPLOAD_BYTES) {
    return json({ message: "The combined attachments must be 4 MB or smaller." }, 413);
  }

  let creating = false;
  let created = false;
  try {
    const [{ jobId, fields, resume: resumeField, details, documents: documentFields }, call] = await Promise.all([
      getSdrForm(),
      getCallResult(callId),
    ]);
    if (call.callId !== callId || call.status !== "completed" || typeof call.totalScore !== "number" || call.verdict === "no_call") {
      return json({ message: "Complete a scored mock call before submitting." }, 409);
    }
    if (documents.length > documentFields.length) return json({ message: "Remove extra attachments and try again." }, 400);

    const values: Record<string, unknown> = { firstName, lastName, email, phone: [countryCode, phone] };
    const byLabel: Record<string, unknown> = {
      "first name": firstName,
      "last name": lastName,
      email,
      "email address": email,
      phone: values.phone,
      "phone number": values.phone,
      "mobile number": values.phone,
      "mobile phone": values.phone,
      "contact number": values.phone,
      "current location": text("current_location"),
      "current city": text("current_location"),
      "preferred location": text("preferred_location"),
      "notice period": number("notice_days"),
      "notice period days": number("notice_days"),
      "available to join in days": number("notice_days"),
      linkedin: text("linkedin"),
      "linkedin profile url": text("linkedin"),
      "linkedin profile": text("linkedin"),
      "middle name": text("middle_name"),
      "date of birth": text("dob"),
      dob: text("dob"),
    };
    const years = number("exp_years");
    const months = number("exp_months") ?? 0;
    if ((years !== undefined || months > 0) && (years ?? 0) <= 40 && months <= 11) {
      values.workExperience = [years ?? 0, months];
      byLabel["work experience"] = byLabel.experience = values.workExperience;
    }
    for (const [name, identifier, label] of [
      ["current_salary", "currentSalary", "current salary"],
      ["expected_salary", "expectedSalary", "expected salary"],
    ]) {
      const salary = number(name);
      if (salary !== undefined) values[identifier] = byLabel[label] = ["INR", salary];
    }

    const detail = [
      `VoxSphere mock call ID: ${callId}`,
      `Automation example: ${automation}`,
      ...([
        ["current_location", "Current city"], ["preferred_location", "Preferred location"],
        ["notice_days", "Notice period (days)"], ["experience", "Experience history"],
        ["education", "Education"], ["skills", "Skills"], ["linkedin", "LinkedIn"],
      ].flatMap(([name, label]) => text(name) ? [`${label}: ${text(name)}`] : [])),
    ].join("\n");
    if (detail.length > 8_000) return json({ message: "Shorten the background information and try again." }, 400);
    if (details) values[details.id] = detail;

    const files = documents.map((file, index) => [documentFields[index], file] as const);
    if (resumeField) files.unshift([resumeField, resume]);
    const attachmentFields = new Set(files.map(([field]) => field.id));
    for (const field of fields) {
      if (field.id === details?.id || attachmentFields.has(field.id)) continue;
      const label = fieldLabel(field);
      const supplied = label === "gender" ? text("gender") : Object.hasOwn(byLabel, label) ? byLabel[label] : undefined;
      const value = typeof supplied === "string" && field.fieldOptions?.length
        ? field.fieldOptions.find((option) => option.value.toLowerCase() === supplied.toLowerCase())?.id
        : label === "gender" ? undefined : supplied;
      if (value !== undefined && value !== "") values[field.id] = value;
      if (field.required && values[field.id] === undefined) {
        if (label === "gender" || label === "date of birth" || label === "dob" || /^additional document /.test(label)) {
          return json({ message: `Complete the required Keka field: ${field.fieldName}.` }, 400);
        }
        throw new KekaError(503, "unsupported required field");
      }
    }
    const uploads = await Promise.all(files.map(async ([field, file]) => [field.id, await uploadKekaDocument(file)] as const));
    creating = true;
    const candidateId = await createKekaCandidate(jobId, { ...values, ...Object.fromEntries(uploads) });
    created = true;

    if (!details || !resumeField) {
      if (!candidateId) throw new KekaError(502, "candidate identifier");
      const attachments = await Promise.allSettled([
        details ? undefined : addKekaCandidateNote(jobId, candidateId, detail),
        resumeField ? undefined : uploadKekaResume(candidateId, resume),
      ]);
      for (const attachment of attachments) {
        if (attachment.status === "rejected") throw attachment.reason;
      }
    }
    return json({ submitted: true }, 201);
  } catch (error) {
    console.error("Keka SDR application failed", error instanceof KekaError ? error.message : undefined);
    if (created) {
      return json({ message: "Keka received your application, but some attachments could not be confirmed. Contact the hiring team to complete it.", uncertain: true }, 502);
    }
    if (error instanceof KekaError && error.status === 409 && creating) {
      return json({ message: "Keka already has an application for this candidate." }, 409);
    }
    if (creating && (!(error instanceof KekaError) || error.status >= 500)) {
      return json({ message: "Keka could not confirm your submission. Check with the hiring team before submitting again.", uncertain: true }, 502);
    }
    if (error instanceof KekaError && error.status === 400 && creating) {
      return json({ message: "Keka rejected the application details. Check your information before trying again." }, 422);
    }
    return json({ message: APPLICATION_UNAVAILABLE }, 503);
  }
}
