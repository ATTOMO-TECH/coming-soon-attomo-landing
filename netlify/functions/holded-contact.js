// Netlify serverless function — creates a Holded contact AND a CRM lead.
//
// The Holded API key is a SECRET with full account access. It must never reach
// the browser bundle, so this call runs server-side. Configure the key as the
// `HOLDED_API_KEY` environment variable in the Netlify dashboard
// (Site settings → Environment variables).
//
// Behaviour on submit:
//   1. POST a contact to /api/invoicing/v1/contacts (as a Company).
//   2. POST a CRM lead to /api/crm/v1/leads pointing at the new contact,
//      placed in the first column ("Lead") of the "Inbound" funnel.
// The CRM-lead step is best-effort: a failure there does not flip the contact
// creation into an error — the response just reports what happened.

const HOLDED_API_BASE = "https://api.holded.com";
const CONTACTS_ENDPOINT = `${HOLDED_API_BASE}/api/invoicing/v1/contacts`;
const LEADS_ENDPOINT = `${HOLDED_API_BASE}/api/crm/v1/leads`;

// Inbound funnel + its first stage ("Lead"). Discovered via
// scripts/holded-list-funnels.js against the production Holded account.
const INBOUND_FUNNEL_ID = "6a0c76984e2a5cea4b00bc40";
const INBOUND_LEAD_STAGE_ID = "6a0c76984e2a5cea4b00bc3b";

async function holdedPost(url, apiKey, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      key: apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  // Holded answers HTTP 200 even on logical errors, flagged with `status: 0`.
  const ok = res.ok && data.status !== 0;
  return { ok, httpStatus: res.status, data };
}

export default async (req) => {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const apiKey = process.env.HOLDED_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "HOLDED_API_KEY is not configured" },
      { status: 500 },
    );
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { nombre, email, telefono, mensaje } = payload ?? {};
  if (!nombre || !email) {
    return Response.json(
      { error: "nombre and email are required" },
      { status: 400 },
    );
  }

  let contact;
  try {
    contact = await holdedPost(CONTACTS_ENDPOINT, apiKey, {
      name: nombre,
      email,
      phone: telefono || "",
      type: "lead",
      // Create as a Company (set to true for a Person contact).
      isperson: false,
      note: mensaje || "Contacto desde la web de ATTOMO",
      tags: ["attomo-coming-soon"],
    });
  } catch (err) {
    return Response.json(
      { error: "Could not reach Holded (contact)", detail: String(err) },
      { status: 502 },
    );
  }

  if (!contact.ok) {
    return Response.json(
      { error: "Holded contact request failed", detail: contact.data },
      { status: 502 },
    );
  }

  const contactId = contact.data?.id;

  // Best-effort: drop the new contact into the Inbound funnel as a CRM lead.
  // Logged but not surfaced as a failure — the contact is already created.
  let lead = null;
  if (contactId) {
    try {
      lead = await holdedPost(LEADS_ENDPOINT, apiKey, {
        name: nombre,
        funnelId: INBOUND_FUNNEL_ID,
        stageId: INBOUND_LEAD_STAGE_ID,
        contactId,
      });
      if (!lead.ok) {
        console.error("Holded lead creation failed:", lead.data);
      }
    } catch (err) {
      console.error("Holded lead creation failed:", err);
    }
  } else {
    console.error(
      "Holded contact response missing id — skipped CRM lead creation:",
      contact.data,
    );
  }

  return Response.json({ ok: true, contact: contact.data, lead: lead?.data });
};

export const config = { path: "/api/holded-contact" };
