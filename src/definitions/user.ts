export interface ISocial{
    facebook?:string,
    instagram?:string,
    linkedin?:string,
    youtube?:string
}
export interface IUser{
    _id:string,
    name:string,
    username:string,
    role:string,
    userpic?:string,
    social?:ISocial
}

export interface GetMembersResponse{
    success:boolean,
    data:IUser[]
}

