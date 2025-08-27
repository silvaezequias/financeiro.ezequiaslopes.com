import { AnonymousSession } from "@/middleware/flow";
import credendials, { Credentials } from "./credentials";

class Role {
  constructor(public id: string, public credentials: Credentials[]) {}
}

const { user, session, wallet } = credendials;

export const AnonymousRole = new Role("anonymous", [session.CreateSession]);
export const UserRole = new Role("user", [
  user.ReadUser,
  user.UpdateUser,
  session.ReadSession,
  session.DeleteSession,
  wallet.CreateWallet,
  wallet.ReadWallet,
  wallet.LeaveWallet,
  wallet.UpdateWallet,
]);
export const UserManagerRole = new Role("user_manager", [
  ...UserRole.credentials,
  user.CreateUser,
  user.ReadUserList,
  user.ReadUserOther,
  user.UpdateUserOther,

  session.DeleteSessionOther,
  session.ReadSessionOther,
]);

export const AdminRole = new Role("admin", [...UserManagerRole.credentials]);

export const RolesId = [
  AnonymousRole.id,
  UserRole.id,
  UserManagerRole.id,
  AdminRole.id,
] as const;

export type Roles = Role;

export function getRoleById(roleId: string): Role | undefined {
  switch (roleId) {
    case "anonymous":
      return AnonymousRole;
    case "user":
      return UserRole;
    case "user_manager":
      return UserManagerRole;
    case "admin":
      return AdminRole;
    default:
      return undefined;
  }
}
