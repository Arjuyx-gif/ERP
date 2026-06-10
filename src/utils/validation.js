export const isValidEmail = (v) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export const isCiplEmail = (v) =>
  v.trim().toLowerCase().endsWith("@cipl.org.in");

// Min 8 chars, 1 uppercase, 1 lowercase, 1 digit
export const isStrongPassword = (v) =>
  v.length >= 8 && /[A-Z]/.test(v) && /[a-z]/.test(v) && /\d/.test(v);

// Letter followed by 3+ digits e.g. A001, B1234
export const isValidEmployeeId = (v) =>
  /^[A-Za-z]\d{3,}$/.test(v.trim());

// At least 2 chars, letters/spaces/hyphens/apostrophes only
export const isValidFullName = (v) =>
  v.trim().length >= 2 && /^[a-zA-Z\s''-]+$/.test(v.trim());
