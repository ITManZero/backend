import {AuthFilter} from "@app/common/auth/filters/filter";

export class ExpiredTokenFilter implements AuthFilter {

    doFilter(user: any): any {
        if (user == null)
            return {
                passed: false,
                error: {
                    code: 401,
                    message: "Your token is expired !",
                    type: "Unauthorized"
                }
            };
        return {
            passed: true,
            message: "Token not expired yet valid !"
        };
    }
}
