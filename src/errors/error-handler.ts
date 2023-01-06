
export interface ErrorHandler {
  hasError(response: Response): boolean;
  handleError(response: Response): Promise<void>;
}