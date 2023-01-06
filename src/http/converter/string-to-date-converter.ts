import { parseISO } from "date-fns";
import { DATE_TIME_REGEX, LOCAL_DATE_REGEX, LOCAL_DATE_TIME_REGEX, LOCAL_TIME_REGEX } from "./constants";
import { ValueConverter } from "./value-converter";

export class StringToDateConverter implements ValueConverter<string, Date> {


    canConvert(key: string, value: string) {
        return (typeof value === 'string' &&
            (DATE_TIME_REGEX.test(value) ||
            LOCAL_DATE_REGEX.test(value) ||
            LOCAL_DATE_TIME_REGEX.test(value) ||
            LOCAL_TIME_REGEX.test(value)));
    }

    convert(key: string, value: string): Date {
        if(value == null) {
            return null;
        }

        if(LOCAL_DATE_REGEX.test(value) || LOCAL_DATE_TIME_REGEX.test(value)) {
            return parseISO(value);
        }
        if (LOCAL_TIME_REGEX.test(value)) {
            return parseISO(`1970-01-01T${value}`);
        }
        return new Date(value);
    }

}