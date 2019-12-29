export class Response {
    constructor(status, success, message, response) {
        this.responseMessage = new ResponseMessage(success, message, response);
        this.status = status;
    }
}
export class ResponseMessage {
    constructor(success, message, response) {
        this.success = success;
        this.message = message;
        this.response = response;
    }
}
