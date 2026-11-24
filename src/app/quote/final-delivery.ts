// Shared by the quote page, the quote form, and /api/quote.
// Kept out of the client form so the route can import it without
// pulling in client components.

export const FINAL_DELIVERY_SERVICE = "Final Delivery";

// Homepage and any other entry point. The quote page reads `service`.
export const FINAL_DELIVERY_QUOTE_HREF = "/quote?service=final-delivery";

// Exact subject for this request type. Regular quotes keep their own subject.
export const FINAL_DELIVERY_SUBJECT = "Final Delivery Quote";

// Sole inbox for website rate quotes when QUOTE_TO is not set.
export const QUOTE_INBOX = "ashlee@candcwarehouse.com";

export const DELIVERY_LOCATION_OPTIONS = [
  "Business",
  "Residential",
  "Not sure",
] as const;

export const YES_NO_UNSURE_OPTIONS = ["Yes", "No", "Not sure"] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type FinalDeliveryField =
  | "name"
  | "email"
  | "deliveryStreet"
  | "deliveryCity"
  | "deliveryState"
  | "deliveryZip";

export type FinalDeliveryFieldErrors = Partial<
  Record<FinalDeliveryField, string>
>;

// Client-side checks for a Final Delivery request. The regular quote
// path does not call this — its validation stays on the server, same
// as before.
export function finalDeliveryFieldErrors(fields: {
  name: string;
  email: string;
  deliveryStreet: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryZip: string;
}): FinalDeliveryFieldErrors {
  const errors: FinalDeliveryFieldErrors = {};
  if (!fields.name.trim()) errors.name = "Full name is required.";
  const email = fields.email.trim();
  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email.";
  if (!fields.deliveryStreet.trim())
    errors.deliveryStreet = "Street address is required.";
  if (!fields.deliveryCity.trim()) errors.deliveryCity = "City is required.";
  if (!fields.deliveryState.trim()) errors.deliveryState = "State is required.";
  if (!fields.deliveryZip.trim()) errors.deliveryZip = "ZIP code is required.";
  return errors;
}

export function isFinalDeliveryParam(
  value: string | string[] | undefined,
): boolean {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return false;
  const normalized = raw.trim().toLowerCase().replace(/[\s_]+/g, "-");
  return normalized === "final-delivery" || normalized === "finaldelivery";
}

// Final Delivery is its own request. Choosing it clears other services;
// choosing any other service leaves Final Delivery. Delivery fields then
// hide, and the submission stays on the regular quote path.
export function nextServices(current: readonly string[], value: string): string[] {
  if (value === FINAL_DELIVERY_SERVICE) {
    return current.includes(FINAL_DELIVERY_SERVICE)
      ? current.filter((service) => service !== FINAL_DELIVERY_SERVICE)
      : [FINAL_DELIVERY_SERVICE];
  }
  const set = new Set(
    current.filter((service) => service !== FINAL_DELIVERY_SERVICE),
  );
  if (set.has(value)) set.delete(value);
  else set.add(value);
  return Array.from(set);
}
