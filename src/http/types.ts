export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'TRACE';

export type RequestEntity = { body?: any, headers?: Headers };
export type ResponseEntity = { body?: any, headers?: Headers, status: number, statusText: string };