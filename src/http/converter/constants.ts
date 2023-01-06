export const DATE_TIME_FORMAT_LOCAL_DATE = 'yyyy-MM-dd';
export const DATE_TIME_FORMAT_LOCAL_DATETIME = 'yyyy-MM-dd\'T\'HH:mm';
export const DATE_TIME_FORMAT_LOCAL_TIME = 'HH:mm';

// tslint:disable-next-line: max-line-length
export const DATE_TIME_REGEX = /^(?:[1-9]\d{3}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[1-9]\d(?:0[48]|[2468][048]|[13579][26])|(?:[2468][048]|[13579][26])00)-02-29)T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.[0-9]{3})?(?:Z|[+-][01]\d:[0-5]\d)$/;
export const LOCAL_DATE_TIME_REGEX = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)$/;
export const LOCAL_DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})$/;
export const LOCAL_TIME_REGEX = /^(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)$/;