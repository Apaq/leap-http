export interface HttpHandler {
  handle(req: Request): Promise<Response>;
}