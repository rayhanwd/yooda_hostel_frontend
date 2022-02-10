import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPassword] = useState('');
    const data = {
        name:"Zihadul Islam",
        email: email,
        pass: pass,
        role: "admin",
        photo:"https://cdn.discordapp.com/avatars/805828397720010762/61d4842a4cb6809a15ce159eaece7cc3.webp?size=80"
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        localStorage.setItem("userInfo", JSON.stringify(data))
        if (data.email && data.pass) {
            navigate('/dashboard')
        }
        else {
            window.alert('error')
        }
    }
    return (
        <section className="login__container">
            <form onSubmit={handleSubmit} className="flex flex-col pt-3 md:pt-8 w-1/3 mx-auto z-10">
                <div className="relative my-2">
                    <label for="email" className="block text-md py-3 font-medium text-white">
                        Email :
                    </label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-white placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" placeholder="Email address" />
                </div>
                <div className="relative my-2">
                    <label for="password" className="block text-md py-3 font-medium text-white">
                        Password :
                    </label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-white placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" placeholder="Password" />
                </div>
                <button type='submit' className="w-full my-8 px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-green-600 shadow-md hover:bg-green-700 focus:outline-none focus:ring-2">
                    <span className="w-full">
                        Log in
                    </span>
                </button>
            </form>
        </section>
    );
}

export default Login;