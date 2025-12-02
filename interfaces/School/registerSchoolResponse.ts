export  interface RegisterSchoolResponse{
    success:boolean,
    school?:{
        diseCode:number,
        schoolName:string,
        pinCode:number,
        contactNumber:number
    }
    error?:string
}