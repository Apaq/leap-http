
import fetchMock from "jest-fetch-mock";
import {RestTemplate} from '../../../src/http/client';

describe("passport control", () => {

    let template: RestTemplate;

    beforeAll(() => {
        fetchMock.enableMocks();

        template = new RestTemplate();
    });

    it("should handle error correctly", async () => {
        // Arrange
        template.errorHandler = {
            hasError: () => true,
            handleError: () => {throw Error('')}
        }
        fetchMock.mockIf('https://localhost', req => {
            return Promise.resolve({
                status: 500,
                body: JSON.stringify({message: 'Error'}),
                headers: {
                    'content-type': 'application/json'
                }
            });
        });

        // Act
        let result: any = undefined;
        
        try {
            await template.exchange('https://localhost', 'GET');
        } catch(error) {
            result = 'error'
        }

        // Assert
        expect(result).toEqual('error');
    });

    it("should contenttype header issues correctly", async () => {
        // Arrange
        template.errorHandler = {
            hasError: () => false,
            handleError: () => {throw Error('')}
        }
        fetchMock.mockIf('http://localhost/test', req => {
            return Promise.resolve({
                status: 200,
                body: JSON.stringify({id: '123'}),
                headers: {
                    'content-type': 'application/json; application/xml',
                    'Content-Type': 'application/json'
                }
            });
        });

        // Act
        const result = await template.getForObject('http://localhost/test') as any;
        
        // Assert
        expect(result.id).toEqual('123');
    });

    it("should handle typerror", async () => {
        // Arrange
        template.errorHandler = {
            hasError: (request, response) => !response.ok,
            handleError: (response) => {throw Error(response.statusText)}
        }
        fetchMock.mockIf('http://localhost/test', req => {
            return Promise.reject(new TypeError('Load failed'));
        });

        // Act
        let result: any = undefined;
                
        try {
            await template.exchange('https://localhost/test', 'GET');
        } catch(error) {
            result = 'error'
        }

        // Assert
        expect(result).toEqual('error');
    });

});