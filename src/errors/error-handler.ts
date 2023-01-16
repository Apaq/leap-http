
export interface ErrorHandler {
  hasError(request: Request, response: Response): boolean;
  handleError(response: Response): Promise<void>;
}