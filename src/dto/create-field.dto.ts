import {IsEnum, IsInt, IsOptional, IsString, Min} from 'class-validator';
import {FieldTypes} from '../constants/field.constants';
import {FieldGroupTypes} from '../constants/field-groups.constants';

export class CreateFieldDto {

    @IsString()
    label: string;

    @IsInt()
    @Min(0)
    order: number;

    @IsEnum(FieldTypes)
    type: string;

    @IsOptional()
    @IsEnum(FieldGroupTypes)
    group: FieldGroupTypes;

}