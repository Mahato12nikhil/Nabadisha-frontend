export const baseUrl='https://nabadisha-backend-new.onrender.com' 
//export const baseUrl='http://localhost:5090' 


export const urls={
    sections:'/MockData/sections.json',
    about:'/MockData/about.json',
    members:'/api/v1/user/getAllUsers',
    login:'/api/v1/user/login',
    renewLogin: '/api/v1/user/renewLogin',
    dashMenu:'/api/v1/dashboard/dashmenu',
    getEvents:'/api/v1/event/getAllEvents',
    getCollections:'/api/v1/event/get-collections?eventId=',
    getAllExpenses:'/api/v1/event/getAllExpenses?eventId=',
    addCollection:'/api/v1/event/add-collection',
    addExpense:'/api/v1/event/create-expense',
    getPendingAmounts:'/api/v1/event/approvals/pendingAmounts?',
    approveAmounts:'/api/v1/event/approvals/approveAmounts?',
    createEvent:'/api/v1/event/create-event',
    createUser:'/api/v1/user/createUser',
    createContent:'/api/v1/content/create',
    getContent:'api/v1/content/get',
    updateContent:'api/v1/content/update'
}