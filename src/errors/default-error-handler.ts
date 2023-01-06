import { ErrorHandler } from "./error-handler";

type Error = {
    message: string;
}

export class DefaultErrorHandler implements ErrorHandler {
    hasError(response: Response): boolean {
        return !response.ok;
    }

    handleError(response: Response): Promise<void> {
        const statusCode = response.status;
        if (statusCode == null || statusCode === 0) {
            throw new Error('Unknown status code retruend from server');
        }
        return this.doHandleError(response, statusCode);
    }

    private async doHandleError(response: Response, statusCode: number): Promise<void> {
        const statusText = response.statusText;
        const headers = response.headers;
        const error = await response.json() as Error;
        const message = this.getErrorMessage(statusCode, statusText, error);

        if(statusCode >= 400 && statusCode < 500) {
            throw new Error("Client Error: " + message);
        } else if(statusCode >= 500 && statusCode < 600) {
            throw new Error("Server Error: " + message);
        } else {
            throw new Error("Unknown HTTP Status: " + message);
        }
    }

    private getErrorMessage(statusCode: number, statusText: string, error: Error) {
        const preface = `${statusCode} ${statusText}: `;
        return preface + error.message;
    }

}