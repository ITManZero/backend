import {
    ArrayMinSize,
    IsArray,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    Min,
    ValidateNested
} from 'class-validator';
import {FieldTypes} from '../constants/field.constants';
import {FieldGroupTypes} from '../constants/field-groups.constants';
import {Type} from "class-transformer";
import {StringValue} from "../schemas/fields/string-entry.schema";
import {FileValue} from "../schemas/fields/file-entry.schema";
import {ChoicesValue} from "../schemas/fields/choices-entry.schema";

export class CreateFieldEntryDto {

    @IsString()
    label: string;

    @IsInt()
    @Min(1)
    order: number;

    @IsArray()
    @ArrayMinSize(1)
    @Type(() => String)
    @IsOptional()
    choices: string[];
    

    @IsEnum(FieldTypes)
    type: FieldTypes;

    @IsEnum(FieldGroupTypes)
    group: FieldGroupTypes;

    @IsNotEmpty()
    @ValidateNested({each: true})
    @Type((opts) => {
        if (opts.object.group === FieldGroupTypes.DATE
            || opts.object.group === FieldGroupTypes.NUMBER
            || opts.object.group === FieldGroupTypes.TEXT) return StringValue;
        if (opts.object.group === FieldGroupTypes.FILE) return FileValue;
        if (opts.object.group === FieldGroupTypes.CHOICES) return ChoicesValue;
    })
    value: StringValue | ChoicesValue | FileValue;
}