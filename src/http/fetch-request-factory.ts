import { HttpMethod } from "./types";

/**
 * Factory for Fetch Request objects. Requests are created by the createRequest(URI, HttpMethod) method.
 */
export interface FetchRequestfactory {
    createRequest(uri: string, method: HttpMethod, body?: BodyInit, headers?: Headers): Promise<Request>
}