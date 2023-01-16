
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

});