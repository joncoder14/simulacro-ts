import React, { useState } from "react"
import { post } from "../../services/post"
import { useAuth } from "../../context/AuthContext"
import type { UserResponse } from "../../types/user"
import { useNavigate } from "react-router-dom"
import type { User } from "../../types/user"



function Login (){
    const {login} = useAuth()
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const navigate = useNavigate()
    

    function handleEmail(event:React.ChangeEvent<HTMLInputElement>){
        setEmail(event.target.value)
    }

    function handlePassword (event:React.ChangeEvent<HTMLInputElement>){
        setPassword(event.target.value)
    }
        
    async function handleSubmit (event: React.SubmitEvent<HTMLFormElement>){
        event.preventDefault();
        try{

            const res = await post<UserResponse,{email:string; password:string;}>("auth/login",{email,password})
            const token = res.accessToken;
            const user = res.user
            
            login(token,user)
            if(token){
                navigate("/mainDashboard")
            }
            
        } catch{
            console.log("incorrecto");
            
        };
        
       
    }

  return (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl p-7 shadow-sm"
  >
    <div className="mb-7">
      <h1 className="text-3xl font-semibold text-slate-800">
        Welcome back
      </h1>
      <p className="text-sm text-slate-500 mt-1">
        Sign in to your account
      </p>
    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Email
      </label>

      <input
        onChange={handleEmail}
        type="email"
        placeholder="you@example.com"
        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
      />
    </div>

    <div className="mb-6">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Password
      </label>

      <input
        onChange={handlePassword}
        type="password"
        placeholder="••••••••"
        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
      />
    </div>

    <button
      type="submit"
      className="w-full py-2.5 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition"
    >
      Sign in
    </button>
  </form>
</div>
);
}

export default Login