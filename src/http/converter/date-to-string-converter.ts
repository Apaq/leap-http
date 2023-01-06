import { format } from "date-fns";
import { DATE_TIME_FORMAT_LOCAL_DATE, DATE_TIME_FORMAT_LOCAL_DATETIME, DATE_TIME_FORMAT_LOCAL_TIME } from "./constants";
import { ValueConverter } from "./value-converter";

export class DateToStringConverter implements ValueConverter<Date, string> {

    constructor(private config?: {localDateTimeFields?: string[], localDateFields?: string[], localTimeFields?: string[]}) {}

    canConvert(key: string, value: Date): boolean {
        return value instanceof Date;
    }

    convert(key: string, value: Date): string {
        if(value == null) {
            return null;
        }

        if (this.config?.localDateTimeFields?.indexOf(key) >= 0) {
            return format(value, DATE_TIME_FORMAT_LOCAL_DATETIME);
        }
        if (this.config?.localDateFields?.indexOf(key) >= 0) {
            return format(value, DATE_TIME_FORMAT_LOCAL_DATE);
        }
        if (this.config?.localTimeFields?.indexOf(key) >= 0) {
            return format(value, DATE_TIME_FORMAT_LOCAL_TIME);
        }
        return value.toISOString();
    }
}