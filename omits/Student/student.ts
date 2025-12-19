import { StudentInterface } from "@/interfaces/Student/Student";

export type RegisterStudentOmit = Omit<StudentInterface, never>;
