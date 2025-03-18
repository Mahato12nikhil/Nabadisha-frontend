export const UpdateToLocalStorage=(key: string, value: string)=>{
    localStorage.setItem(key,value);
}
export const GetFromLocalStorage=(key: string):string | null=>{
    return localStorage.getItem(key);
}