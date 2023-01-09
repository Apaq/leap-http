import { format, getUnixTime, isSameDay, isSameHour, parseISO, set } from "date-fns";
import {DateToStringConverter, JsonMessageConverter, StringToDateConverter} from '../../../src/http/converter';
import { DATE_TIME_FORMAT_LOCAL_DATE, DATE_TIME_FORMAT_LOCAL_DATETIME, DATE_TIME_FORMAT_LOCAL_TIME } from "../../../src/http/converter/constants";
import structuredClone from '@ungap/structured-clone';

describe("json message converter", () => {

  
    it("should read object property", async () => {
        // Arrange
        const converter = new JsonMessageConverter();
        const data = {
            date: '2020-01-01T12:00:00Z',
            localdatetime: '2020-01-01T12:00:00',
            localdate: '2020-01-01',
            localtime: '12:00:00',
            boolean: true,
            string: 'hello',
            number: 12
        }
        var stringData = JSON.stringify(data);
        const mockResponse = {
            json: () => Promise.resolve(JSON.parse(stringData))
        } as Response;

        // Act
        const result = await converter.read(mockResponse);
        console.log(parseISO(`1970-01-01T${data.localtime}`), data.localtime);

        // Assert
        expect(result.date).toEqual(new Date(data.date));
        expect(result.localdatetime).toEqual(parseISO(data.localdatetime));
        expect(isSameDay(result.localdate, parseISO(data.localdate))).toBeTruthy()
        expect(isSameHour(result.localtime, parseISO(`1970-01-01T${data.localtime}`))).toBeTruthy()
        expect(result.boolean).toBeTruthy()
        expect(result.string).toEqual('hello');
        expect(result.number).toEqual(12);
    })

    it("should write object property", async () => {
        // Arrange
        const converter = new JsonMessageConverter({
            localDateFields:['localdate'],
            localDateTimeFields: ['localdatetime'],
            localTimeFields: ['localtime']
        }
        );
        const data = {
            date: new Date(),
            localdatetime: new Date(),
            localdate: new Date(),
            localtime: new Date(),
            boolean: true,
            string: 'hello',
            number: 12
        }
        
        // Act
        const result = await converter.write(structuredClone(data))
        const json = JSON.parse(result.body as string);

        // Assert
        expect(json.date).toEqual(data.date.toISOString());
        expect(json.localdatetime).toEqual(format(data.localdatetime, DATE_TIME_FORMAT_LOCAL_DATETIME));
        expect(json.localdate).toEqual(format(data.localdatetime, DATE_TIME_FORMAT_LOCAL_DATE));
        expect(json.localtime).toEqual(format(data.localdatetime, DATE_TIME_FORMAT_LOCAL_TIME));
        expect(json.boolean).toBeTruthy()
        expect(json.string).toEqual('hello');
        expect(json.number).toEqual(12);
    })


});