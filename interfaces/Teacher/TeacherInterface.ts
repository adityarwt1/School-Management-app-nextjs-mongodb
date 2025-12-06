import mongoose from "mongoose"

interface MongoId{
    _id:mongoose.Types.ObjectId | string 
}
export interface TeacherInterface extends MongoId {
    fullName:string
    contactNumber:number
    bcCode:string
    password:string
    schoolId:mongoose.Types.ObjectId | string
    diseCode:number   
    profilePicture:string | ArrayBuffer  | null,
    classTeacher:number
}