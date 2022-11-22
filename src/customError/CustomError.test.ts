import CustomError from "./CustomError";

describe("Given a CustomError class", () => {
  describe("When instantiated with message 'Error' with status 400 and public message 'Something went wrong'", () => {
    test("Then it should create an object with message 'Error' with status 400 and public message 'Something went wrong'", () => {
      const expectedCustomError = {
        message: "Error",
        publicMessage: "Something went wrong",
        statusCode: 400,
      };

      const { message, publicMessage, statusCode } = expectedCustomError;
      const messageProperty = "message";
      const publicMessageProperty = "publicMessage";
      const statusCodeProperty = "statusCode";

      const resultCustomError = new CustomError(
        message,
        publicMessage,
        statusCode
      );

      expect(resultCustomError).toHaveProperty(messageProperty, message);
      expect(resultCustomError).toHaveProperty(
        publicMessageProperty,
        publicMessage
      );
      expect(resultCustomError).toHaveProperty(statusCodeProperty, statusCode);
    });
  });
});
