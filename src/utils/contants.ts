import Treasurer from "../Pages/dashboard/Treasurer";

export const LANGUAGE_KEY='language';
export enum LANGUAGE{
    en="en",bn="bn"
}
export const DashMenu={
    Profile: 'profile',
    Event: 'event',
    Treasurer: 'treasurer',
    Admin: 'admin'
}
export const Persmissions={
    PROFILE_EDIT: 'profile_edit',
    EVENT_CREATE: 'event_create',
    EVENT_MONEY_COLLECTION: 'event_money_collection',
    ADMIN_ACCESS: 'admin_access',
    TREASURER_MONEY_COLLECTION_APPROVAL:'treasurer_event_money_collection_approval'
}
export const REFRESH_TOKEN='refreshtoken';