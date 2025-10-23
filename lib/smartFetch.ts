import { InternalError } from "nextfastapi/errors";
import { toast } from "sonner";

export default async function smartFetch(
  url: string,
  options?: RequestInit
  // onError?: (err: any) => void
) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      let errorMessage = "Não foi possível prosseguir nessa operação";

      try {
        const data = await response.json();
        errorMessage = data.message || errorMessage;
      } catch {}

      throw new InternalError({ message: errorMessage });
    }

    return response.json();
  } catch (err: any) {
    const message =
      err.message || "Um erro inesperado ocorreu em processamento interno.";
    toast.error(message);

    return { message };
  }
}
