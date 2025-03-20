export interface IEvent{
    _id:string,
    name: string;
    description:string,
    eventImages:string[],
    startDate: number;
    endDate:number,
    eventManagement: IEventManagement,
    createdAt:number,
    updatedAt:number,
    createdBy:string,
    updatedBy:string,
}
export interface IEventManagement{
    president:string,
    treasurer:string,
    secretary:string,
    vice_president:string,
    vice_secretary:string
}
export interface GetAllEventsResponse{
    success:boolean,
    data?:IEvent[],
    message?:string
}
export interface ICollection{
    _id:string,
    eventId:string,
    contributor:string,
    amount:number,
    treasurer:string,
    approved:boolean,
    createdAt:number,
    createdBy:string
}
export interface GetEventCollectionResponse{
    success:boolean,
    data?:ICollection[],
    totalCount?:number,
    message?:string,
}
