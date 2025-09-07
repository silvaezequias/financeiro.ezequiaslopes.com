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

enum WalletSummaryCredential {
  ReadWalletSummary = "read:wallet_summary",
  ReadWalletSummaryList = "read:wallet_summary:list",
  ReadWalletSummaryOther = "read:wallet_summary:other",
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
  walletSummary: WalletSummaryCredential,
};

export default credentials;

export type Credentials =
  | AuthorizationCodeCredential
  | SessionCredential
  | UserCredential
  | WalletCredential
  | TransactionCredential
  | WalletSummaryCredential;

const GuestWalletMemberRoles = [
  WalletCredential.ReadWallet,
  WalletCredential.LeaveWallet,
  WalletSummaryCredential.ReadWalletSummaryList,
  TransactionCredential.ReadTransaction,
  TransactionCredential.ReadTransactionList,
  TransactionCredential.DeleteTransactionOther,
];

const OwnerWalletMemberRoles = [
  ...GuestWalletMemberRoles,
  WalletCredential.UpdateWallet,
  WalletSummaryCredential.ReadWalletSummary,
];

export const WalletPermissions = {
  walletMember: {
    owner: OwnerWalletMemberRoles,
    guest: GuestWalletMemberRoles,
  },
};
