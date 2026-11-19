# Automatic sync to Comprinno dev

A push to `tanmaya-r-comprinno/comprinno-website:main` runs `Sync to Comprinno dev` in that repository. It merges the latest source `main` into `comprinnotech/comprinno-website:dev` with a merge commit. There is no scheduled polling.

The source secret `COMPRINNO_DEV_SYNC_SSH_KEY` authenticates with a write-enabled deploy key scoped to the destination repository. No personal GitHub token is stored. Only `dev` is targeted by the workflow; production still requires the normal `dev` to `main` PR.

The destination's `.github/workflows/` and `src/content/products.ts` are retained. A conflict in `src/app/contact/page.tsx` keeps the destination's HubSpot embed. Other conflicts stop the run without pushing; resolve them with a manual merge. The workflow never force-pushes. If someone updates destination `dev` during the run, rerun the failed sync after reviewing the changes.

The sync runner only performs Git operations. The destination's existing deployment workflow installs dependencies, builds and checks TypeScript on Vercel, then verifies staging. Lint remains a local check. This avoids a second build or a polling workflow.

To pause synchronization, disable `Sync to Comprinno dev` in the source repository's Actions tab. To revoke access, remove the `Tanmaya main to dev auto-sync` deploy key from the destination and delete the source secret.
