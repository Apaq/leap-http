import { HttpMessageConverter } from "./http-message-converter";
import structuredClone from '@ungap/structured-clone';
import { DateToStringConverter } from "./date-to-string-converter";
import { StringToDateConverter } from "./string-to-date-converter";
import { PropertyMapper } from "./property-mapper";
import { DateConversionConfig } from "./date-conversion-config";

export class JsonMessageConverter implements HttpMessageConverter {

    private readonly dateToStringConverter;
    private readonly stringToDateConverter = new StringToDateConverter();

    readonly supportedMediaTypes: string[] = ['application/json'];

    constructor(dateConfig?: DateConversionConfig) {
        this.dateToStringConverter = new DateToStringConverter(dateConfig);
    }

    canRead(mediaType: string): boolean {
        return this.supportedMediaTypes.includes(mediaType);
    }

    canWrite(data: any): boolean {
        return typeof (data) === 'object';
    }

    read(response: Response): Promise<any> {
        return Promise.resolve(response.json()
            .then(data => {
                PropertyMapper.mapValues(this.stringToDateConverter, data);
                return data;
            }));
    }

    write<T>(data: T): Promise<{ headers: Headers, body: BodyInit }> {
        data = structuredClone(data);
        PropertyMapper.mapValues(this.dateToStringConverter, data);

        const headers = new Headers();
        headers.append('content-type', 'application/json')
        return Promise.resolve({ headers, body: JSON.stringify(data) });
    }

}