import { RouteController } from "nextfastapi";
import { AuthenticatedContext, FlowContext } from "./flow";
import SessionInjector from "./injector/session";
import { UnauthorizedError } from "nextfastapi/errors";

const controller = new RouteController<FlowContext>().use(SessionInjector);
const authenticatedController = new RouteController<AuthenticatedContext>().use(
  SessionInjector
);

controller.onError((err, _, $, next) => {
  console.log(err);

  return next();
});

authenticatedController.use((req, _, next) => {
  if (!req.context.session.user.id) {
    throw new UnauthorizedError({
      message: "Você não tem permissão para executar essa ação.",
    });
  }

  return next();
});

authenticatedController.onError((err, _, $, next) => {
  console.log(err);

  return next();
});

export { controller, authenticatedController };
