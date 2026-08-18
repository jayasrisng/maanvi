# Maanvi payment integration

## Recommended checkout

Use Razorpay as Maanvi's primary payment rail and add PayPal later as an optional international method. This gives Indian and overseas clients one consistent Maanvi checkout handoff without making PayPal the only route for domestic customers.

The customer flow should remain:

1. Complete the private-viewing questionnaire.
2. Meet Maanvi and choose a saree.
3. Maanvi confirms the piece, delivery address, shipping charge and final total.
4. Maanvi sends one secure payment link.
5. The payment provider confirms payment; Maanvi confirms fulfilment separately.

No amount should be charged before the selected piece, shipping and total have been confirmed.

## Configuration prepared in the site

- `VITE_PAYMENT_URL`: the public Razorpay Payment Link, Payment Page or hosted checkout URL.
- `VITE_PAYMENT_LABEL`: optional customer-facing button label.
- `VITE_PAYPAL_URL`: reserved for a PayPal checkout or invoice link once the account is approved.

Only public checkout URLs belong in `VITE_` variables. API keys, webhook secrets and credentials must stay server-side.

## Before activation

- Complete business KYC and international-payment activation with the chosen provider.
- Approve and publish accurate Terms, Privacy, Shipping, Refund and Cancellation policies.
- Decide supported countries, shipping rates, duties/tax wording and return eligibility.
- Add a server-side webhook and order ledger before automating payment confirmation.
- Test successful, failed, cancelled and duplicate payments in provider test mode.

The current UI intentionally says the connection is pending until a real checkout URL is configured.
