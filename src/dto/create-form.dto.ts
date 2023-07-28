import {IsEnum, IsOptional, IsString} from 'class-validator';
import {FormStatus} from '../constants/form-status.constants';

export class CreateFormDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsOptional()
    @IsEnum(FormStatus)
    active: FormStatus;
}
