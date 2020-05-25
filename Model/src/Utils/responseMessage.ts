export class Response {
    public responseMessage: ResponseMessage;
    public status: number;
    constructor(status: number, success: boolean, message: string, response: string) {
        this.responseMessage = new ResponseMessage(success, message, response);
        this.status = status;
    }
}
export class ResponseMessage {
    success: boolean;
    message: string;
    response: string;
    constructor(success: boolean, message: string, response: string) {
        this.success = success;
        this.message = message;
        this.response = response;
    }
}
