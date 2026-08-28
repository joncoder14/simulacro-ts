import { useState } from "react";
import { post } from "../../services/post";
import type { User } from "../../types/user";
import type { UserRegister } from "../../types/user";
import { useNavigate } from "react-router-dom";

function Register (){

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate()

    async function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

         try {
                    const userCreated = await post<User, UserRegister>("auth/register", formData)
        
                    alert("registerd")
                    setFormData({
                        name: "",
                        email: "",
                        password:""
                    });
                    
                    if(userCreated){
                        navigate("/")
                    }
                    
                } catch (error) {
                    console.log(error)
                    alert("error")
                } 
        
    };
    
    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">

                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Create account
                </h1>

                <form onSubmit={handleSubmit}>

                    {/* Name */}
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            placeholder="example@email.com"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            required
                            minLength={6}
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-slate-700 text-white py-2.5 rounded-lg font-medium hover:bg-slate-800 transition"
                    >
                        Register
                    </button>

                </form>
            </div>
        </div>
    );
    
}
export default Register