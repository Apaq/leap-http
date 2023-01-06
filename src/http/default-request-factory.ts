import { FetchRequestfactory } from "./fetch-request-factory";

export class DefaultRequestFactory implements FetchRequestfactory {

    async createRequest(uri: string, method: "POST" | "PUT" | "GET" | "DELETE" | "PATCH" | "HEAD", body?: BodyInit, headers?: Headers): Promise<Request> {
        return new Request(uri, {
            method,
            headers,
            mode: 'cors',
            cache: 'default',
            body
        });
    }

}