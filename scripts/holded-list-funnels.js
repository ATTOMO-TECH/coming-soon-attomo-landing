// Read-only helper — lists Holded CRM funnels and their stages.
// Run with:  node --env-file=.env scripts/holded-list-funnels.js
//
// Uses HOLDED_API_KEY from the env. Makes only GET requests, so it cannot
// modify anything in the Holded account.

const apiKey = process.env.HOLDED_API_KEY;
if (!apiKey) {
  console.error("HOLDED_API_KEY is not set. Add it to .env or pass it inline.");
  process.exit(1);
}

async function get(path) {
  const res = await fetch(`https://api.holded.com${path}`, {
    headers: { key: apiKey, Accept: "application/json" },
  });
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }
  return { status: res.status, data };
}

// Holded's CRM module lives under /api/crm/v1. Funnels (pipelines) each
// contain an array of stages (the kanban columns).
const candidatePaths = [
  "/api/crm/v1/funnels",
  "/api/invoicing/v1/funnels",
];

for (const path of candidatePaths) {
  console.log(`\n→ GET ${path}`);
  const { status, data } = await get(path);
  console.log(`  status: ${status}`);
  console.log(JSON.stringify(data, null, 2));
  if (status === 200) break;
}
