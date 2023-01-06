import { HttpHandler } from "./http-handler";

export interface HttpInterceptor {
  intercept(req: Request, next: HttpHandler): Promise<any>
}