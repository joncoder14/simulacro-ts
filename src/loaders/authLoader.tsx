import { redirect } from "react-router-dom";

export function requirsAuth (){
    const accessToken = localStorage.getItem("access token")
    if(!accessToken){
        throw redirect("/")
    }
    return accessToken
}