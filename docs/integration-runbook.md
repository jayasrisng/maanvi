# Maanvi integration runbook

## Calendly

1. In the existing Calendly account create **Maanvi Private Viewing** as a 60-minute event.
2. Connect Stripe in Calendly and require **$20 USD** at booking. Confirm the account plan supports paid events.
3. Add invitee questions for Phone / WhatsApp, Country / time zone, occasion, budget, preferences, archive favorites, and notes. Calendly renders availability in each visitor's local time zone.
4. Set `VITE_CALENDLY_URL` to the published event URL. The site pre-fills name, email, occasion, budget, preferences, and colors through supported query parameters.
5. Create an `invitee.created` webhook pointing to `/api/calendly-webhook` and set its signing key as `CALENDLY_WEBHOOK_SIGNING_KEY`.

## Appointment-credit ledger

Run `docs/appointment-credits.sql` in the production Supabase project, then set server-only `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. Never expose the service-role key in a `VITE_` variable.

Each paid booking is inserted idempotently by its unique Calendly booking URI. Staff redeem the credit using `redeem_appointment_credit(booking_id, order_reference)`. The transaction only succeeds for an unredeemed record, and both the order reference and redeemed timestamp are required, preventing reuse.

Calendly's webhook event does not itself guarantee payment settlement on every account configuration. Before production launch, verify the connected paid-event flow emits `invitee.created` only after the Stripe payment succeeds or extend the handler to consume the payment provider's verified settlement webhook.

## Analytics

The UI emits `maanvi:analytics` browser events and forwards them to `gtag` when present. Configure a consent-aware analytics provider in the deployment shell. Events include home CTA, archive open/year/favorite, quiz start/completion, Calendly open, and WhatsApp click. Booking and payment-completed events should be emitted from the verified Calendly/Stripe webhook after the account is connected.
