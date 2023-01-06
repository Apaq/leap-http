export interface ValueConverter<S, T> {
    canConvert(key: string, value: S): boolean;
    convert(key: string, value: S): T;
}
