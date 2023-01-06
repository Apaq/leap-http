/**
 * Strategy interface for converting from and to HTTP requests and responses.
 */
export interface HttpMessageConverter {
    canRead(mediaType: string): boolean;
    canWrite(data: any): boolean;
    readonly supportedMediaTypes: string[];
    read(response: Response): Promise<any>;
    write(data: any): Promise<{headers: Headers, body: BodyInit}>;
}