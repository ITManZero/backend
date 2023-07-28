import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IsNumber, IsString} from "class-validator";

@Schema({_id: false})
export class FileValue {
    @IsString()
    @Prop({required: true})
    filename: string;
    @IsNumber()
    @Prop({required: true})
    filesize: number;
    @IsString()
    @Prop({required: true})
    mimetype: string;
    @IsString()
    @Prop({required: true})
    extension: string;
}

@Schema({_id: false})
export class FileEntry {
    @Prop({required: true, type: FileValue})
    value: FileValue;
}

export const FileEntrySchema = SchemaFactory.createForClass(FileEntry);
