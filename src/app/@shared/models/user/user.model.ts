import { UserRole } from '../../enums/user-role.enum';

export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
    isBlocked: boolean;
}
