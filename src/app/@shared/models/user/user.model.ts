import { UserRole } from '../../enums/user-role.enum';

export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    isBlocked: boolean;
}
