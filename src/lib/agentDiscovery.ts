/**
 * Discovery documents that tell AI agents what this site offers and how to use it.
 * They describe only what really exists: /llms.txt, Markdown at every page URL,
 * and the public read-only MCP server at /mcp. Nothing requires authentication.
 */
import { createHash } from "node:crypto";
import { site } from "@/lib/site";
import { MCP_PATH, SERVER_INFO, abs, hostname, tools } from "@/lib/agentApi";
import { SCOPE, endpoints, oauthEnabled } from "@/lib/oauth";

const sha256 = (s: string) => `sha256:${createHash("sha256").update(s, "utf8").digest("hex")}`;
const toolList = () => tools.map((t) => `- \`${t.name}\`: ${t.description}`).join("\n");

export function serverCard() {
  return {
    serverInfo: SERVER_INFO,
    description: `Read-only access to public content on ${site.url}: Comprinno's services, products, case studies, blog posts and press releases.`,
    protocolVersion: "2025-06-18",
    transport: { type: "streamable-http", endpoint: abs(MCP_PATH) },
    endpoint: abs(MCP_PATH),
    capabilities: { tools: { listChanged: false } },
    tools: tools.map(({ name, title, description, inputSchema }) => ({ name, title, description, inputSchema })),
    authentication: oauthEnabled()
      ? { required: false, schemes: ["oauth2"], protectedResourceMetadata: endpoints.prmMcp, scopes: [SCOPE] }
      : { required: false, schemes: [] },
    documentation: abs("/llms.txt"),
  };
}

export function apiCatalog() {
  return {
    linkset: [
      {
        anchor: abs(MCP_PATH),
        "service-desc": [{ href: abs("/.well-known/mcp/server-card.json"), type: "application/json" }],
        "service-doc": [{ href: abs("/llms.txt"), type: "text/plain" }],
      },
    ],
  };
}

export function aiCatalog() {
  const host = hostname();
  return {
    specVersion: "1.0",
    host: { displayName: "Comprinno Technologies", identifier: `did:web:${host}` },
    entries: [
      {
        identifier: `urn:air:${host}:server:website`,
        displayName: "Comprinno website MCP server",
        type: "application/mcp-server-card+json",
        url: abs("/.well-known/mcp/server-card.json"),
        representativeQueries: [
          "find Comprinno case studies about AWS migration",
          "what managed cloud services does Comprinno offer",
          "how do I contact Comprinno sales",
        ],
      },
      {
        identifier: `urn:air:${host}:doc:llms-txt`,
        displayName: "Comprinno site index (llms.txt)",
        type: "text/plain",
        url: abs("/llms.txt"),
        representativeQueries: ["list all Comprinno services and products", "Comprinno blog posts about FinOps"],
      },
      {
        identifier: `urn:air:${host}:skills:index`,
        displayName: "Comprinno Agent Skills",
        type: "application/json",
        url: abs("/.well-known/agent-skills/index.json"),
        representativeQueries: ["how should an agent read comprinno.net", "how to help a user contact Comprinno"],
      },
    ],
  };
}

/** Personal Agent Protocol, website-only discovery (no sessions or sign-in offered). */
export function poppy() {
  return { protocol_version: "0.1", organization: { name: "Comprinno Technologies", domain: hostname().replace(/^www\./, "") }, web: {} };
}

const skillDocs: Record<string, { description: string; body: () => string }> = {
  "comprinno-website": {
    description: "Read and search comprinno.net: services, products, case studies, blog posts and press releases, as Markdown or through the site's read-only MCP server.",
    body: () => `---
name: comprinno-website
description: Read and search comprinno.net (Comprinno, an AWS Premier Tier cloud and AI partner) as Markdown or via its read-only MCP server.
---

# Reading comprinno.net

Comprinno is an agentic-AI-first AWS Premier Tier Services Partner. Its website is public and needs no authentication.

## Ways to read the site

1. **Site index**: ${abs("/llms.txt")} lists every service, product, partnership, case study, press release and blog post with URLs.
2. **Markdown pages**: request any page URL with the header \`Accept: text/markdown\` to get it as Markdown instead of HTML.
3. **MCP server**: ${abs(MCP_PATH)} (Streamable HTTP, JSON-RPC over POST, no auth). Tools:
${toolList()}

## Tips

- Start with \`search_content\` for a topic, then \`get_page\` for the full text.
- Cite the page URL when you quote Comprinno content.
`,
  },
  "contact-comprinno": {
    description: "Help a user get in touch with Comprinno: the right email, phone, office or enquiry form. The agent provides details; the user sends the message.",
    body: () => `---
name: contact-comprinno
description: Help a user get in touch with Comprinno (sales, support or careers). Provide contact details and the enquiry form; the user sends the message.
---

# Contacting Comprinno

Give the user the right contact. Do not submit forms or send email on the user's behalf unless they explicitly ask and confirm the content.

- Sales and new projects: ${site.emails.sales}
- Support for existing customers: ${site.emails.support}
- Careers: ${site.emails.careers}
- General: ${site.emails.general}
- Phone: ${site.phone}
- Enquiry form: ${abs("/contact")} (an AWS-certified expert replies within 24 to 48 hours)

A useful first message covers: company, country, what they want to do (migrate, modernize, managed services, cost, AI) and timeline.

For offices and addresses, read ${abs("/contact")} with \`Accept: text/markdown\`, or call the MCP tool \`get_contact_info\` at ${abs(MCP_PATH)}.
`,
  },
};

export const skillNames = Object.keys(skillDocs);
export const skillMd = (name: string) => skillDocs[name]?.body() ?? null;

export function skillsIndex() {
  return {
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills: skillNames.map((name) => ({
      name,
      type: "skill-md",
      description: skillDocs[name].description,
      url: `/.well-known/agent-skills/${name}/SKILL.md`,
      digest: sha256(skillDocs[name].body()),
    })),
  };
}

export function authMd() {
  const reg = abs("/auth.md#anonymous-public-access");
  const claim = abs("/auth.md#claim-and-revocation");
  const oauth = oauthEnabled();
  const discover = oauth
    ? `1. Fetch ${endpoints.prmRoot} (or ${endpoints.prmMcp} for the MCP server). It lists the authorization server and the scope \`${SCOPE}\`.
2. Fetch ${endpoints.asMetadata} and read its \`agent_auth\` block. The only supported identity type is \`anonymous\`.
3. Fetch ${abs("/.well-known/api-catalog")} to find the agent interfaces.`
    : `1. Read this page and the \`agent_auth\` block below. The only supported identity type is \`anonymous\`.
2. Fetch ${abs("/.well-known/api-catalog")} to find the agent interfaces.
3. There is no OAuth authorization server: do not send an \`Authorization\` header.`;
  const tokens = oauth
    ? `
## Optional access tokens

Tokens are optional: every interface also works without one. Some agent tools expect OAuth, so a real authorization server issues tokens for scope \`${SCOPE}\`, which grants exactly the public, read-only access above and nothing more.

Anonymous agents (no user, no client secret):

\`\`\`http
POST ${endpoints.token}
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials&scope=${encodeURIComponent(SCOPE)}&resource=${encodeURIComponent(abs(MCP_PATH))}
\`\`\`

\`\`\`json
{ "access_token": "<jwt>", "token_type": "Bearer", "expires_in": 3600, "scope": "${SCOPE}" }
\`\`\`

MCP clients may instead use authorization code with PKCE (S256): register at ${endpoints.register} (optional, stateless), send the user to ${endpoints.authorize}, then exchange the code at ${endpoints.token}. Present the token as \`Authorization: Bearer <access_token>\`. Tokens are ES256 JWTs (keys at ${endpoints.jwks}), expire after one hour and have no refresh token: request a new one.
`
    : "";
  return `# auth.md

You are an agent accessing **${site.url}**, the public website of Comprinno, an AWS Premier Tier cloud and AI partner.
This service supports anonymous public access only. Registration is documentation-only because no account or credential is required.

## Discover

${discover}

## Anonymous public access

\`${reg}\` is the registration URI. Reading this section completes registration:

1. Do not send user identity, email, assertions, secrets or credentials.
2. Use credential type \`none\`.
3. Use the public, read-only interfaces:
   - ${abs("/llms.txt")}: site index
   - Any page URL with the header \`Accept: text/markdown\`: the page as Markdown
   - ${abs(MCP_PATH)}: MCP server (Streamable HTTP, JSON-RPC over POST), described at ${abs("/.well-known/mcp/server-card.json")}

No account, API key or user claim is created. Registration has no server-side state and grants only the same public, read-only access every visitor has.
${tokens}
## Claim and revocation

\`${claim}\` is the claim information URI. Anonymous public access has no owner, account or registration record, so there is nothing to claim. ${oauth ? "Access tokens are short-lived (one hour) and grant only public data, so there is no revocation endpoint: discard a token you no longer need." : "Do not send claim or revocation requests."}

## agent_auth

\`\`\`yaml
agent_auth:
  skill: ${abs("/auth.md")}
  register_uri: ${reg}
  claim_uri: ${claim}
  identity_types_supported:
    - anonymous
  anonymous:
    credential_types_supported:
      - none
\`\`\`

## Public endpoints

| Purpose | URL |
| --- | --- |
| API catalog | ${abs("/.well-known/api-catalog")} |
| MCP server card | ${abs("/.well-known/mcp/server-card.json")} |
${oauth ? `| Protected Resource Metadata | ${endpoints.prmRoot} |\n| Authorization Server Metadata | ${endpoints.asMetadata} |\n` : ""}| Agent Skills | ${abs("/.well-known/agent-skills/index.json")} |
| AI catalog | ${abs("/.well-known/ai-catalog.json")} |
| Site index | ${abs("/llms.txt")} |
| Sitemap | ${abs("/sitemap.xml")} |

## Contact

Questions about agent access: ${site.emails.general}. Never send credentials or private keys.
`;
}
