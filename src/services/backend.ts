import { ICreateEvent } from "../definitions/event";
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
export const GetEventExpenses=(eventId: string)=>{
    const url=urls.getAllExpenses+eventId;
    return getClient().get(url);
}
export const AddCollection=(payload:{eventId:string, contributor:string, amount:number})=>{
    return getClient().post(urls.addCollection,payload);
}
export const AddExpense=(payload:{eventId:string, name:string, description:string, amount:number})=>{
    return getClient().post(urls.addExpense,payload);
}

export const GetAllPendingAmounts=(queries:{eventId:string})=>{
    const url=urls.getPendingAmounts+"eventId="+queries.eventId;
    return getClient().get(url);
}

export const ApprovePendingAmount=(queries:{id:string, amountType:string})=>{
    const url=urls.approveAmounts+"id="+queries.id+"&&"+"amountType="+queries.amountType;
    return getClient().get(url);
}
export const CreateEvent=(payload:ICreateEvent )=>{
    return getClient().post(urls.createEvent,payload);
}

