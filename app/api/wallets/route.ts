import { authenticatedController } from "@/middleware";
import { handleGet, handleGetValidation } from "./(main)/get";
import { handlePost, handlePostValidation } from "./(main)/post";

authenticatedController
  .post(handlePostValidation, handlePost)
  .get(handleGetValidation, handleGet);

export const GET = authenticatedController.expose();
export const POST = authenticatedController.expose();
