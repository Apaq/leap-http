export interface DateConversionConfig {
    
    /**
     * Defines fields/properties that should be formatted a local date time without time zone. (fx. 2020-12-01T12:00:00)
     */
    localDateTimeFields?: string[];

    /**
     * Defines fields/properties that should be formatted a local date without time. (fx. 2020-12-01)
     */
    localDateFields?: string[];

    /**
     * Defines fields/properties that should be formatted a local time without date and time zone. (fx. 12:00:00)
     */
    localTimeFields?: string[]
}