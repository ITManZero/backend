import {AuthFilter} from "@app/common/auth/filters/filter";
import {Roles} from "@app/common/enum/roles.enum";

export class RolesFilter implements AuthFilter {

    constructor(private requiredRolesIds: number[]) {
    }

    doFilter(user: any): any {


        if (this.requiredRolesIds == null) return {
            passed: true,
            message: "Public Endpoint !"
        };

        const requiredRoles = this.requiredRolesIds.map(roleId => (Roles[roleId]));

        const approved = requiredRoles.some((role) => user.role?.includes(role));

        if (!approved)
            return {
                passed: false,
                error: {
                    code: 401,
                    message: "You can't access this resources",
                    type: "Unauthorized"
                }
            };


        return {
            passed: true,
            message: "Public Endpoint !"
        };

    }
}
