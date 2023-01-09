import { ValueConverter } from "./value-converter";

export class PropertyMapper {

    public static mapValues(converter: ValueConverter<any, any>, object: Object) {
        if (!object || !(object instanceof Object)) {
            return;
        }

        if (object instanceof Array) {
            for (const item of object) {
                this.mapValues(converter, item);
            }
        }

        for (const key of Object.keys(object)) {
            const value = object[key];
            
            if (value instanceof Array) {
                for (const item of value) {
                    this.mapValues(converter, item);
                }
            }

            if (value instanceof Object) {
                this.mapValues(converter, value);
            }

            console.log('Can convert: ', key, converter.canConvert(key, value), converter);
            if (converter.canConvert(key, value)) {
                object[key] = converter.convert(key, value);
            }

        }
    }
}