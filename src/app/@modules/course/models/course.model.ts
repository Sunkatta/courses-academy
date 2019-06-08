import { Student } from './student.model';

export class Course {
    id: string;
    title: string;
    description: string;
    rating: number;
    students: Student[];
    image: string;
}
