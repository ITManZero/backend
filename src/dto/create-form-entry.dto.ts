import {Type} from "class-transformer";
import {ArrayMinSize, IsArray, ValidateNested} from "class-validator";
import {CreateFieldEntryDto} from "./create-field-entry.dto";

export class CreateFromEntryDto {

    @IsArray()
    @ValidateNested({each: true})
    @ArrayMinSize(1)
    // @ArrayMaxSize(2)
    @Type(() => CreateFieldEntryDto)
    fields: CreateFieldEntryDto[]

}