import { HttpMethod, RequestEntity, ResponseEntity } from "../types";

export interface RestOperations {
    exchange(uri: string, method: HttpMethod, entity?: RequestEntity): Promise<ResponseEntity>;

    deleteForResponse(uri: string): Promise<ResponseEntity>;

    deleteForObject(uri: string): Promise<void>;

    getForResponse(uri: string): Promise<ResponseEntity>;

    getForObject<T>(uri: string): Promise<T>;

    postForResponse(uri: string, data?: any): Promise<ResponseEntity>;

    postForObject<T>(uri: string, data?: T): Promise<T>;

    putForResponse(uri: string, data?: any): Promise<ResponseEntity>;

    putForObject<T>(uri: string, data?: T): Promise<T>;
}