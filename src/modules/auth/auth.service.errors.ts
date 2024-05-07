export class AuthError extends Error {}
export class IncorrectPasswordError extends AuthError {}
export class UserNotFoundError extends AuthError {}
export class EmailNotUniqueError extends AuthError {}
export class AccessTokenExpiredError extends AuthError {}
export class AccessTokenInvalidError extends AuthError {}
