import { LoginPayload } from "../definitions/user";
import { RestService } from "./rest";
import { baseUrl, urls } from "./url";

const serviceClient=new RestService({baseURL:baseUrl});
const getClient=()=>serviceClient.client;

export const GetAboutContent=()=>{
    return getClient().get(urls.about);
}

export const GetMembers=()=>{
    return getClient().get(urls.members);
}

export const Login=(payload:LoginPayload)=>{
    return getClient().post(urls.login, payload);
}

export const CreateUser=()=>{
    
}



