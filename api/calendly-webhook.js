import crypto from "node:crypto";

function validSignature(rawBody, signatureHeader, secret) {
  if (!secret || !signatureHeader) return false;
  const parts = Object.fromEntries(signatureHeader.split(",").map((part) => part.split("=")));
  if (!parts.t || !parts.v1) return false;
  const expected = crypto.createHmac("sha256", secret).update(`${parts.t}.${rawBody}`).digest("hex");
  const actualBuffer = Buffer.from(parts.v1, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  return actualBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(actualBuffer, expectedBuffer);
}

export default async function handler(request, response) {
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed" });
  const rawBody = typeof request.body === "string" ? request.body : JSON.stringify(request.body);
  if (!validSignature(rawBody, request.headers["calendly-webhook-signature"], process.env.CALENDLY_WEBHOOK_SIGNING_KEY)) return response.status(401).json({ error: "Invalid signature" });
  const event = typeof request.body === "string" ? JSON.parse(request.body) : request.body;
  if (event.event !== "invitee.created") return response.status(200).json({ ignored: true });
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return response.status(503).json({ error: "Credit ledger is not configured" });
  const invitee = event.payload;
  const answers = Object.fromEntries((invitee.questions_and_answers || []).map((answer) => [answer.question, answer.answer]));
  const record = {
    booking_id: invitee.uri,
    customer_name: invitee.name,
    customer_email: invitee.email,
    phone_whatsapp: answers["Phone / WhatsApp"] || null,
    appointment_date: invitee.scheduled_event?.start_time || null,
    appointment_fee_usd: 20,
    credit_amount_usd: 20,
    credit_status: "unredeemed",
    calendly_event_uri: invitee.scheduled_event?.uri || null,
    source_payload: event,
  };
  const ledgerResponse = await fetch(`${process.env.SUPABASE_URL}/rest/v1/appointment_credits?on_conflict=booking_id`, {
    method: "POST",
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=ignore-duplicates,return=minimal",
    },
    body: JSON.stringify(record),
  });
  if (!ledgerResponse.ok) return response.status(500).json({ error: "Could not record appointment credit" });
  return response.status(200).json({ recorded: true });
}
