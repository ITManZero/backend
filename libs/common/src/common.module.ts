import {Module} from '@nestjs/common';
import {AuthService} from "@app/common/services/auth.service";
import {JwtService} from "@nestjs/jwt";

@Module({
    providers: [AuthService, JwtService],
    exports: [AuthService, JwtService],
})
export class CommonModule {
}
