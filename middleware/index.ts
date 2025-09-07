import { RouteController } from "nextfastapi";
import { AuthenticatedContext, FlowContext } from "./flow";
import SessionInjector from "./injector/session";
import { UnauthorizedError } from "nextfastapi/errors";
import { locale } from "@/i18n";

const controller = new RouteController<FlowContext>().use(SessionInjector);
const authenticatedController = new RouteController<AuthenticatedContext>().use(
  SessionInjector
);

controller.onError((err, _, $, next) => {
  console.log(err);

  return next();
});

authenticatedController.use(({ context }, _, next) => {
  const $ = locale(context.locale.lang);

  if (!context.session.user.id) {
    const { message, action } = $.api.user.cant.access;

    throw new UnauthorizedError({
      message,
      action,
    });
  }

  return next();
});

authenticatedController.onError((err, _, $, next) => {
  console.log(err);

  return next();
});

export { controller, authenticatedController };
