export enum StatusCode {
    'BAD_REQUEST' = 400,
    "INTERNAL_SERVER_ISSUE" = 500,
    "OK" = 200,
    "CREATED" = 201,
    "CONFLICT" = 209,
    "UNOTHERIZED" = 401
}
export interface StanderedResponse{
    success:boolean,
    error?:string
    message?:string,
    status:number
}