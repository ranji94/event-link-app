// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AuthCode {
  export enum Success {
    UserCreatedVerifyEmail = "USER_CREATED_VERIFY_EMAIL",
    UserVerified = "USER_EMAIL_ADDRESS_VERIFIED",
    UserPasswordResetRequested = "USER_PASSWORD_RESET_REQUESTED",
    UserPasswordResetSuccess = "USER_PASSWORD_RESET_SUCCESS",
    LoggedOut = "LOGGED_OUT",
    Refreshed = "REFRESHED",
    LoggedIn = "LOGGED_IN",
  }

  export enum Failed {
    EmailAlreadyInUse = "USER_CREATE_EMAIL_ALREADY_IN_USE",
    VerificationCodeSendFailed = "USER_CREATE_VERIFICATION_CODE_SEND_FAILED",
    InvalidCredentials = "USER_INVALID_CREDENTIALS",
    UserNotFound = "USER_NOT_FOUND",
    InvalidRefreshToken = "USER_INVALID_REFRESH_TOKEN",
    InvalidToken = "USER_INVALID_TOKEN",
    InvalidOrExpiredResetPasswordToken = "USER_INVALID_OR_EXPIRED_RESET_PASSWORD_TOKEN",
    ResetPasswordTokenSendFailed = "USER_CREATE_RESET_PASSWORD_TOKEN_SEND_FAILED",
    InsufficientPermissions = "INSUFFICIENT_PERMISSIONS",
    WorkspaceNotSelected = "WORKSPACE_NOT_SELECTED",
    WorkspaceNoAccess = "WORKSPACE_NO_ACCESS",
    AlreadyAuthenticated = "ALREADY_AUTHENTICATED",
    Generic = "GENERIC",
  }
}
