
export interface IAboutContent{
    journey:string,
    vision:string,
    mission:string,
    commitment:string
}
export interface IAbout{
    content:{
        en:IAboutContent,
        bn:IAboutContent
    }  
}
export interface ContentSchema<T>{
    _id?:string,
    about:T
}
export interface GetAboutResponse{
    success:boolean,
    data:IAbout
}