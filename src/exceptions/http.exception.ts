export class HttpException extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.name = "HttpException";
    this.status = status;
    this.message = message;
  }
}
