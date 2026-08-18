create table if not exists public.appointment_credits (
  id uuid primary key default gen_random_uuid(),
  booking_id text not null unique,
  customer_name text not null,
  customer_email text not null,
  phone_whatsapp text,
  appointment_date timestamptz,
  appointment_fee_usd numeric(10,2) not null default 20,
  credit_amount_usd numeric(10,2) not null default 20,
  credit_status text not null default 'unredeemed' check (credit_status in ('unredeemed','redeemed','void')),
  redeemed_at timestamptz,
  order_reference text unique,
  calendly_event_uri text,
  source_payload jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint redeemed_requires_order check (credit_status <> 'redeemed' or (redeemed_at is not null and order_reference is not null))
);

alter table public.appointment_credits enable row level security;
-- No public policies: only the server-side service role and authorized staff tooling may read or update credits.

create or replace function public.redeem_appointment_credit(p_booking_id text, p_order_reference text)
returns public.appointment_credits
language plpgsql
security definer
set search_path = public
as $$
declare result public.appointment_credits;
begin
  update public.appointment_credits
  set credit_status = 'redeemed', redeemed_at = now(), order_reference = p_order_reference, updated_at = now()
  where booking_id = p_booking_id and credit_status = 'unredeemed'
  returning * into result;
  if result.id is null then raise exception 'Credit is missing or already used'; end if;
  return result;
end;
$$;
