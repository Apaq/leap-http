# Leap Http

<p align="center">
  <b>Leap Http</b> provides a simple Rest Client
  <br>
  for communicating with <b>REST APIs</b> in <b>a browser</b>.</b>
</p>


<hr>

# It's like [Spring's RestTemplate](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/client/RestTemplate.html) for Javascript

- It uses [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) underneath.
- **Message Formatters**: Add any message formatter you want for converting response into Javascript objects. Out of the box it will parse and format JSON(including dates)  as well as blobs.
- **Error handling**: Easily add your own error handler.
- **Interception**: Intercept any HTTP request for specialized handling.
- **Request Factory**: Create specialized HTTP Request for authentication etc.
- **TypeScript**: Supports TypeScript

```js
import { RestTemplate } from '@apaq/leap-http'

const interface Cat {
    name: string;
    createdDate: Date;
}

const rest = new RestTemplate();
rest.getForObject<Cat>('https://myserver/cats/cat-1').then(cat => {
    //=> {name: "Garfield", createdAt: <date object>}
});

```

The library is available as an [npm package](https://www.npmjs.com/package/@apaq/leap-http).
To install the package run:

```bash
npm install @apaq/leap-http --save
# or with yarn
yarn add @apaq/leap-http
```

## Converters
leap-http allows for adding custom message converters, but comes with 2 builtin: JsonMessageConverter and BlobMessageConverter.

### JsonMessageConverter
This converter converts from and to JSON including Date type when content type is `application/json`. In order to parse and format dates it makes use of date-fns.

### BlobMessageConverter
This converter takes anything not already handled by other converters as blob input.

### Custom converters
You can add any message conversion you'ld like by implementing the HttpMessageConveter interface.

```ts
class XmlMessageConverter implements HttpMessageConverter {
    readonly supportedMediaTypes: string[] = ['application/xml'];
    
    public canRead(mediaType: string): boolean { return this.supportedMediaTypes.includes(mediaType); }

    public canWrite(data: any): boolean { return typeof (data) === 'object'; }

    read(response: Response): Promise<any> {
        // handle reading xml from response and converting it to an object.
    }

    write(data: any): Promise<{headers: Headers, body: BodyInit}> {
        // return headers with corrent content type and convert data to xml.
    }
}

const rest = new RestTemplate();
rest.httpMessageConverters = [new XmlMessageConverter()];

let cat: Cat = { name: 'Garfield' };
cat = rest.postForObject<Cat>('https://myserver/cats', cat);
```

## Error handling
For easy error handling, you can set a custom error interceptor on the RestTemplate object. The error handler simply needs to implement the ErrorHandler interface.

```ts
class MyErrorHandler implements ErrorHandler {
    hasError(response: Response): boolean {
        return !response.ok;
    }

    handleError(response: Response): Promise<void> {
        const statusCode = response.status;
        if (statusCode !== 200) {
            throw new Error('Response was not ok.');
        }
    }
}

const rest = new RestTemplate();
rest.errorHandler = new MyErrorHandler();

rest.getForObject<Cat>('https://none-existing');
//=> Throws error
```

## License
MIT
