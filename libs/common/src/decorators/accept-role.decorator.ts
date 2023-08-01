import {SetMetadata} from "@nestjs/common";
import {Roles} from "@app/common/enum/roles.enum";

export const ROLES_TOKEN = "roles";

export const AcceptRoles = (...roles: Roles[]) => SetMetadata(ROLES_TOKEN, roles);
