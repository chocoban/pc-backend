import { GraphQLError } from 'graphql';

class CustomError extends GraphQLError {
  constructor(message, errMsg) {
    super(message, errMsg);
    this.customError = errMsg;
  }
}

export default CustomError;
