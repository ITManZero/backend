import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from "@nestjs/common";
import mongoose from "mongoose";

@Injectable()
export class ParseObjectIdPipe implements PipeTransform {
    transform(value: string, metadata: ArgumentMetadata) {

        const {type, metatype, data} = metadata;
        const isValid: boolean = this.validateType(metatype);
        // const isParamDecorator: boolean = type == "param";

        // if (!metatype || !isValid) {
        //    throw new InternalServerErrorException(
        //       `validation error object id must be a string property : ${data}, value : ${value}`,
        //    );
        // }

        // if (!isParamDecorator) {
        //   throw new InternalServerErrorException(`not allowed decorator type (${metatype.name})`);
        // }

        if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new BadRequestException(`validation error: object id is invalid [id: ${value}]`);
        }

        return value;
    }

    private validateType(metaType: any): boolean {
        const types: any[] = [Boolean, Number, Array, Object];
        return !types.includes(metaType);
    }
}
