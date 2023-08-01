import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {Observable} from "rxjs";
import {ROLES_TOKEN} from "@app/common/decorators";
import {Roles} from "@app/common/enum/roles.enum";
import {ExpiredTokenFilter, RolesFilter} from "@app/common/auth/filters";
import {AuthFilter} from "@app/common/auth/filters/filter";
import {User} from "../entity/user.schema";
import {AuthService} from "@app/common/services/auth.service";

@Injectable()
export class ProtectGuard implements CanActivate {
    constructor(private reflector: Reflector, private authService: AuthService) {
    }

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {

        const authorization = context.getType() == "http" ? context.switchToHttp().getRequest()
            .headers?.authorization : context.switchToRpc().getData().Authorization;

        const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_TOKEN, [
            context.getHandler(),
            context.getClass()
        ]);

        if (!authorization || authorization == '')
            return false;

        const parts: string[] = authorization.split(" ");
        if (parts.length <= 1)
            return false;

        const token: string = parts[1];
        const payload: any = this.authService.verifyAccessToken(token);

        if (!payload) return false;

        console.log(payload)

        const extra: any = payload.extra;
        const user: User = new User();
        user.id = extra.id;
        user.username = extra.user_name;
        user.roles = extra.all_roles;
        user.permissions = extra.all_permissions;
        user.phone = extra.phone;
        user.isAdmin = !user.roles.includes("user");

        const filters: AuthFilter[] = [new ExpiredTokenFilter(), new RolesFilter(requiredRoles)];
        filters.forEach(filter => {
            const result = filter.doFilter(user);
            if (!result.passed)
                throw new UnauthorizedException(result.error.message);
            console.log(result.message); // todo logs
        });
        return true;
    }
}