export enum ApiErrorCause {
  IncorrectPassword = 'invalid-password',
  UserNotFound = 'user-not-found',
  EmailNotUnique = 'email-not-unique',
  PostNotFound = 'post-not-found',
  NoAccessToken = 'no-access-token',
  ExpiredAccessToken = 'expired-access-token',
  InvalidAccessToken = 'invalid-access-token',
}
