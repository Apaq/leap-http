import { getUnixTime, isSameDay, set } from "date-fns";
import {DateToStringConverter, StringToDateConverter} from '../../../src/http/converter';

describe("property mapper", () => {

  
    it("should format date according to current locale", async () => {
        // Arrange
        const converter = new DateToStringConverter({localDateFields: ['startDate']});
        

        // Act
        const result = converter.convert('startDate', set(getUnixTime(0), {hours:0, minutes: 0, seconds: 0, milliseconds: 0}));

        // Assert
        expect(result).toEqual('1970-01-01')
    })

    it("should format subscriptionExpires property", async () => {
        // Arrange
        const converter = new StringToDateConverter();
        const expected = new Date(2023,0,1);

        // Act
        const result = converter.convert('subscriptionExpires', '2023-01-01');

        // Assert
        expect(isSameDay(expected, result)).toBeTruthy();
    })
});