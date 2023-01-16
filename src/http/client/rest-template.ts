import { ErrorHandler } from "../../errors/error-handler";
import { DefaultRequestFactory } from "../default-request-factory";
import { FetchRequestfactory } from "../fetch-request-factory";
import { HttpHandler } from "../http-handler";
import { HttpInterceptor } from "../http-interceptor";
import { BlobMessageConverter } from "../converter/blob-message-converter";
import { RequestEntity, HttpMethod, ResponseEntity } from "../types";
import { RestOperations } from "./rest-operations";
import { HttpMessageConverter } from "../converter/http-message-converter";
import { JsonMessageConverter } from "../converter/json-message-converter";
import { DefaultErrorHandler } from "../../errors/default-error-handler";
import structuredClone from '@ungap/structured-clone';

export class RestTemplate implements RestOperations {
    

    public httpMessageConverters: HttpMessageConverter[];
    public errorHandler: ErrorHandler = new DefaultErrorHandler();
    public httpInterceptor: HttpInterceptor;
    
    constructor(private readonly requestFactory: FetchRequestfactory = new DefaultRequestFactory()) {
        this.httpMessageConverters = [
            new JsonMessageConverter(),
            new BlobMessageConverter()
        ]
    }

    public async exchange(uri: string, method: HttpMethod, entity?: RequestEntity): Promise<ResponseEntity> {
        const converter = await this.selectWriteConverter(entity?.body);
        const output = await converter?.write(structuredClone(entity.body)) ?? undefined

        const finalHeaders = new Headers();
        entity?.headers?.forEach((value, key) => finalHeaders.append(key, value));
        output?.headers?.forEach((value, key) => finalHeaders.append(key, value));
        
        const request = await this.requestFactory.createRequest(uri, method, output?.body, finalHeaders);
        return new Promise<ResponseEntity>((resolve, reject) => {
            this.handleFetch(request)
                .then(response => this.handleErrors(request, response))
                .then(response => this.handleData(response))
                .then(([data, response]) => resolve({headers: response.headers, body: data, status: response.status, statusText: response.statusText}))
                .catch(error => reject(error));
        });
    }

    public async deleteForResponse(uri: string): Promise<ResponseEntity> {
        return this.exchange(uri, 'DELETE');
    }

    public async deleteForObject(uri: string): Promise<void> {
        return this.deleteForResponse(uri).then(_ => null);
    }

    public async getForResponse(uri: string): Promise<ResponseEntity> {
        return this.exchange(uri, 'GET');
    }

    public async getForObject<T>(uri: string): Promise<T> {
        return this.getForResponse(uri)
        .then(response => response.body);
    }

    public async postForResponse(uri: string, data?: any): Promise<ResponseEntity> {
        return this.exchange(uri, 'POST', {body: data});
    }

    public async postForObject<T>(uri: string, data?: T): Promise<T> {
        return this.postForResponse(uri, data)
        .then(response => response.body);
    }

    public async putForResponse(uri: string, data?: any): Promise<ResponseEntity> {
        return this.exchange(uri, 'PUT', {body: data});
    }

    public async putForObject<T>(uri: string, data?: T): Promise<T> {
        return this.putForResponse(uri, data).then(response => response.body);
    }
   
    private handleFetch(request: Request): Promise<Response> {
        const handler: HttpHandler = {
            handle: (request) => fetch(request)
        }

        if(this.httpInterceptor) {
            return this.httpInterceptor.intercept(request, handler);
        } else {
            return handler.handle(request);
        }
    }

    private async handleErrors(request: Request, response: Response): Promise<Response> {
        const hasError = this.errorHandler.hasError(request, response);

        if (hasError) {
            await this.errorHandler.handleError(response);
        }
        
        return Promise.resolve(response);        
    }

    
    private async handleData<D>(response: Response): Promise<[D, Response]> {
        const contentTypeHeader = response.headers.get('content-type');
        const contentType = contentTypeHeader?.split(';')[0] ?? undefined;

        if(!contentType) {
            return Promise.resolve([null, response]);
        }

        for(let i=0;i<this.httpMessageConverters.length;i++) {
            const m = this.httpMessageConverters[i];
            if(m.canRead(contentType)) {
                const data = await m.read(response);
                return Promise.resolve([data,response]);
            }
        }
        return Promise.reject(`No message converters for reading ${contentType}`);
    }

    private async selectWriteConverter(data: any): Promise<HttpMessageConverter> {
        if(data == null) return undefined;
        const converter = this.httpMessageConverters.find(mc => mc.canWrite(data));
        if(converter == null) {
            return Promise.reject(`No message converters for writing ${typeof(data)}`);
        } else {
            return Promise.resolve(converter);
        }
    }

}