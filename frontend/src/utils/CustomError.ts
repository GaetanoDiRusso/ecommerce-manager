export enum errorCodeEnum {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403, //Without permission to access the resourse
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  SERVER_ERROR = 500,
}

export enum errorMessageEnum {
  ONLY_HATTRICK_MEMBERS_CAN_SIGN_IN = "Only Hattrick's members can sign in",
  INVALID_TOKEN = 'Invalid token',
  INVALID_INPUT = 'Invalid input',
  EMAIL_ALREADY_EXISTS = 'The email already exists',
  DATABASE_ERROR = 'Database error',
  PAGE_NOT_FOUND = "This page doesn't exist",
  PAGE_MUST_BE_GREATER_THAN_ZERO = 'The page must be greater than 0',
  OPTION_ID_DOESNT_EXIST = "The optionId doesn't exist",
  CAN_ONLY_VOTE_ONE_OPTION = 'You can only vote one option',
  POLL_POST_DOESNT_EXIST = 'The Poll Post does not exist',
  USER_NOT_FOUND = 'User not found',
  POST_NOT_FOUND = 'Post not found',
  REPEATED_COMMENT_ID = 'Repeated comment ID',
  INVALID_DEVICE_TOKEN = 'Invalid device token',
  FAILED_TO_SEND_PUSH_NOTIFICATION = 'Failed to send push notification',
}

export class CustomError extends Error {
  code: errorCodeEnum;
  description: string;
  extraInfo?: string;

  constructor(code: errorCodeEnum, description: string, extraInfo?: string) {
    super(description);
    this.code = code;
    this.description = description;
    this.extraInfo = extraInfo;
  }
}
