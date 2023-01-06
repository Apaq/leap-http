import { HttpMessageConverter } from "./http-message-converter";

export class BlobMessageConverter implements HttpMessageConverter {

    readonly supportedMediaTypes: string[] = ['*'];

    canRead(mediaType: string): boolean { return true; }

    canWrite(data: any): boolean { return false; }

    async read(response: Response): Promise<any> { return response.blob(); }

    write(data: any): Promise<{headers: Headers, body: BodyInit}> { throw 'Not implemented.'; }
    
}