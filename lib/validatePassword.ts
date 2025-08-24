export function validatePassword(password: string): {
  valid: boolean;
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  specialChar: boolean;
} {
  const length = password.length >= 8;
  const uppercase = /[A-Z]/.test(password);
  const lowercase = /[a-z]/.test(password);
  const number = /[0-9]/.test(password);
  const specialChar = /[^A-Za-z0-9]/.test(password);

  const valid = length && uppercase && lowercase && number && specialChar;

  return {
    valid,
    length,
    uppercase,
    lowercase,
    number,
    specialChar,
  };
}
