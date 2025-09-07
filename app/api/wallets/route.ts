import { authenticatedController } from "@/middleware";
import { handleGet, handleGetValidation } from "./get";
import { handlePost, handlePostValidation } from "./post";

authenticatedController
  .post(handlePostValidation, handlePost)
  .get(handleGetValidation, handleGet);

export const GET = authenticatedController.expose();
export const POST = authenticatedController.expose();
