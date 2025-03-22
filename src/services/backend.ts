import { LoginPayload } from "../definitions/user";
import { RestService } from "./rest";
import { baseUrl, urls } from "./url";

const serviceClient=new RestService({baseURL:baseUrl});
const getClient=()=>serviceClient.client;

const localClient=new RestService({baseURL:"http://localhost:5173"});
const getLocalClient=()=>localClient.client;


export const GetAboutContent=()=>{
    return getLocalClient().get(urls.about);
}

export const GetMembers=()=>{
    return getLocalClient().get(urls.members);
}

export const Login=(payload:LoginPayload)=>{
    return getClient().post(urls.login, payload);
}

export const RenewLogin=(refreshToken:string)=>{
    return getClient().post(urls.renewLogin, {refreshToken});
}

export const GetDashBoardMenu=(roles:string[])=>{
    return getClient().post(urls.dashMenu, {roles});
}

export const GetAllEvents=()=>{
    return getClient().get(urls.getEvents);
}
export const GetCollections=(eventId: string, pageIndex=0, pageSize=10)=>{
    const url=urls.getCollections+eventId+"&&"+"pageIndex="+pageIndex+"&&"+"pageSize="+pageSize;
    return getClient().get(url);
}
export const CreateUser=()=>{
    
}



