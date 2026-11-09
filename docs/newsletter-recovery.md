# Recovering a failed welcome email

The signup stays active if welcome delivery fails. The API retries once after a network error or provider 5xx response, using the same Resend idempotency key. It does not immediately retry a 4xx response or rate limit. The owner notification flags a failed welcome; provider logs remain the fallback if that notification also fails.

When a “Welcome delivery needs attention” notification arrives:

1. Check the recipient's Resend contact. If they have opted out, stop; never reactivate them to replay a welcome.
2. Check Resend email records for the welcome subject and recipient. An accepted email is not a failed send. Do not replay a delivered, bounced, suppressed, queued or ambiguous email; resolve its recorded state first.
3. For a confirmed failed send, correct the provider error and resend the existing welcome through Resend's dashboard. Use the current `welcome` subject and text in `api/subscribe.js`, sender `notes@ai-automation-station.com`, and reply-to `automojic@proton.me`. Do not send a new broadcast or confirmation email.
4. Record the original incident, replay time and new email ID in the private operations log. Keep recipient details out of this repository.

Submitting the signup form again does not replay welcome mail for an existing active contact. Resend retains API idempotency keys for 24 hours; a later manual send needs the delivery-record check above. The current implementation does not persist delivery state or consume confirmation tokens. The 15-minute resubscription window limits old-link reuse but cannot guarantee that every later opt-out wins against an earlier link.

Controlled tests cover temporary and permanent failures, network ambiguity, stable idempotency keys and concurrent confirmations. They do not send mail or establish real delivery.

Provider reference: [Resend idempotency keys](https://resend.com/docs/dashboard/emails/idempotency-keys).
