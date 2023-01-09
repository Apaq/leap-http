import { ValueConverter } from "./value-converter";

export class PropertyMapper {

    public static mapValues(converter: ValueConverter<any, any>, object: Object) {
        console.log('Mapping object: ', object, converter);
        if (object == null || typeof(object) !== 'object') {
            console.log('Object not considered an object: ', object, typeof(object));
            return;
        }

        if (object instanceof Array) {
            console.log('Object considered an array: ', object, typeof(object));
            for (const item of object) {
                this.mapValues(converter, item);
            }
        }

        for (const key of Object.keys(object)) {
            const value = object[key];

            console.log('Mapping value: ', key,  value, typeof(value));
            
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