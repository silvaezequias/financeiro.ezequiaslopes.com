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
  DeleteWallet = "delete:wallet",
  DeleteWalletOther = "delete:wallet:other",
  LeaveWallet = "leave:wallet",
}

enum TransactionCredential {
  CreateTransaction = "create:transaction",
  ReadTransaction = "read:transaction",
  ReadTransactionList = "read:transaction:list",
  ReadTransactionOther = "read:transaction:other",
  UpdateTransaction = "update:transaction",
  UpdateTransactionOther = "update:transaction:other",
  DeleteTransaction = "delete:transaction",
  DeleteTransactionOther = "delete:transaction:other",
}

const credentials = {
  authorizationCode: AuthorizationCodeCredential,
  session: SessionCredential,
  user: UserCredential,
  wallet: WalletCredential,
  transaction: TransactionCredential,
};

export default credentials;
export type Credentials =
  | AuthorizationCodeCredential
  | SessionCredential
  | UserCredential
  | WalletCredential
  | TransactionCredential;

const GuestWalletMemberRoles = [
  WalletCredential.ReadWallet,
  WalletCredential.LeaveWallet,
  TransactionCredential.ReadTransaction,
  TransactionCredential.ReadTransactionList,
  TransactionCredential.DeleteTransactionOther,
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
