import { authenticatedController } from "@/middleware";
import { handleGet, handleGetValidation } from "./get";

authenticatedController.get(handleGetValidation, handleGet);

export const GET = authenticatedController.expose();
