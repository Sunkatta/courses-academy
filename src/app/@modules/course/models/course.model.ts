import { Student } from './student.model';

export class Course {
    id: string;
    title: string;
    description: string;
    rating: number;
    students: any;
    studentsCount: number;
    voters: number;
    image: string;
}
