enum AuthorizationCodeCredential {
  ReadAuthorizationCode = "read:authorization_code",
  CreateAuthorizationCode = "create:authorization_code",
  DeleteAuthorizationCode = "delete:authorization_code",
}

enum SessionCredential {
  ReadSession = "read:session",
  CreateSession = "create:session",
  DeleteSession = "delete:session",
  ReadSessionOther = "read:session:other",
  DeleteSessionOther = "delete:session:other",
}

enum UserCredential {
  CreateUser = "create:user",
  ReadUser = "read:user",
  ReadUserList = "read:user:list",
  ReadUserOther = "read:user:other",
  UpdateUser = "update:user",
  UpdateUserOther = "update:user:other",
}

enum WalletCredential {
  CreateWallet = "create:wallet",
  ReadWallet = "read:wallet",
  ReadWalletList = "read:wallet:list",
  ReadWalletOther = "read:wallet:other",
  UpdateWallet = "update:wallet",
  UpdateWalletOther = "update:wallet:other",
  JoinWallet = "join:wallet",
  JoinWalletOther = "join:wallet:other",
  LeaveWallet = "leave:wallet",
}

const credentials = {
  authorizationCode: AuthorizationCodeCredential,
  session: SessionCredential,
  user: UserCredential,
  wallet: WalletCredential,
};

export default credentials;
export type Credentials =
  | AuthorizationCodeCredential
  | SessionCredential
  | UserCredential
  | WalletCredential;

const GuestWalletMemberRoles = [
  WalletCredential.ReadWallet,
  WalletCredential.LeaveWallet,
];

const OwnerWalletMemberRoles = [
  ...GuestWalletMemberRoles,
  WalletCredential.UpdateWallet,
];

export const WalletPermissions = {
  walletMember: {
    owner: OwnerWalletMemberRoles,
    guest: GuestWalletMemberRoles,
  },
};
