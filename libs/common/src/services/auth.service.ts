import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {
    }

    verifyAccessToken(token: string): any {
        const payload: any = this.jwtService.verify(token,
            {secret: "5y1RJckO8H0ychkOhBTBaxLpxfeOWyLuhNgNqqb4QoHb51TCG1O9TF9HvJ8YZji3"});
        if (!payload) return null;
        return payload;
    }
}
