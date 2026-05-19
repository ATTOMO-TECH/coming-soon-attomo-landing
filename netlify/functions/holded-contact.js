// Netlify serverless function — creates a contact (lead) in Holded.
//
// The Holded API key is a SECRET with full account access. It must never reach
// the browser bundle, so this call runs server-side. Configure the key as the
// `HOLDED_API_KEY` environment variable in the Netlify dashboard
// (Site settings → Environment variables).

const HOLDED_CONTACTS_ENDPOINT =
  "https://api.holded.com/api/invoicing/v1/contacts";

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

  try {
    const res = await fetch(HOLDED_CONTACTS_ENDPOINT, {
      method: "POST",
      headers: {
        key: apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: nombre,
        email,
        phone: telefono || "",
        type: "lead",
        isperson: true,
        note: mensaje || "Contacto desde la web de ATTOMO",
        tags: ["attomo-coming-soon"],
      }),
    });

    const data = await res.json().catch(() => ({}));

    // Holded answers HTTP 200 even on logical errors, flagged with `status: 0`.
    if (!res.ok || data.status === 0) {
      return Response.json(
        { error: "Holded request failed", detail: data },
        { status: 502 },
      );
    }

    return Response.json({ ok: true, contact: data });
  } catch (err) {
    return Response.json(
      { error: "Could not reach Holded", detail: String(err) },
      { status: 502 },
    );
  }
};

export const config = { path: "/api/holded-contact" };
