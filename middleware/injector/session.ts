import type { Middleware } from "nextfastapi/types";
import { getServerSession } from "next-auth";
import { AnonymousRole, getRoleById, UserRole } from "@/lib/authorization/role";
import { registerRequesterCredentials } from "@/lib/authorization/accessControl";
import { FlowContext } from "../flow";

const SessionInjector: Middleware<FlowContext> = async (req, _, next) => {
  const session = await getServerSession();

  let requesterUser = { role: AnonymousRole.id };
  let requesterCredentialsManager = registerRequesterCredentials(AnonymousRole);

  if (session) {
    const user = await database?.user.findUnique({
      where: { id: session.user.id },
    });

    if (user) {
      const userRole = getRoleById(user.role || UserRole.id) || UserRole;

      requesterUser = { ...user, role: user.role || UserRole.id };
      requesterCredentialsManager = registerRequesterCredentials(userRole);
    }
  }

  const sessionInContext = {
    user: {
      ...requesterUser,
      canDo: requesterCredentialsManager,
    },
  };

  req.context.session = sessionInContext;

  return next();
};

export default SessionInjector;
