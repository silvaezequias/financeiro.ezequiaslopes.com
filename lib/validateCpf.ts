import axios from "axios";

export function isValidCpfStructure(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, "");
  if (!cpf || cpf.length !== 11) return false;
  if (/^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(10))) return false;

  return true;
}

export async function checkCpfExists(cpf: string): Promise<boolean | null> {
  try {
    cpf = cpf.replace(/\D/g, "");
    const res = await axios.get(
      `https://scpa-backend.saude.gov.br/public/scpa-usuario/validacao-cpf/${cpf}`
    );
    return res.data === true;
  } catch {
    return null; // fallback in case of error
  }
}

export async function validateCpf(
  cpf: string
): Promise<{ valid: boolean; verified: boolean }> {
  const structureValid = isValidCpfStructure(cpf);
  if (!structureValid) return { valid: false, verified: false };

  const exists = await checkCpfExists(cpf);
  if (exists === true) return { valid: true, verified: true };
  if (exists === null) return { valid: true, verified: false }; // fallback
  return { valid: false, verified: false };
}
