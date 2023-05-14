import { FcGoogle } from 'react-icons/fc';
import {useState, ChangeEvent, useContext} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface Values {
    username: string,
    email: string,
    password: string,
    confirmedPassword: string,
}

interface ToastOptions {
    position: "top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center";
    autoClose?: number;
    pauseOnHover?: boolean;
    draggable?: boolean;
    theme?: "light" | "dark";
  }


const Register = () => {

    const url = "http://localhost:5052/api/auth/register"
    const navigate = useNavigate()

    const [values, setValues] = useState<Values>({
        username: "",
        email: "",
        password: "",
        confirmedPassword: ""
    })
    const toastOptions:ToastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };

      const handleValidation = () => {
        const { password, confirmedPassword, username, email } = values;
        if (password !== confirmedPassword) {
          toast.error(
            "Password and confirm password should be same.",
            toastOptions
          );
          return false;
        } else if (username.length < 3) {
          toast.error(
            "Username should be greater than 3 characters.",
            toastOptions
          );
          return false;
        } else if (password.length < 8) {
          toast.error(
            "Password should be equal or greater than 8 characters.",
            toastOptions
          );
          return false;
        } else if (email === "") {
          toast.error("Email is required.", toastOptions);
          return false;
        }
    
        return true;
      };

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>)  => {


        e.preventDefault()
        if (handleValidation()) {
            console.log("hit");
            const { username, email, password } = values
            const {data} = await axios.post(
            url, 
            {username, email, password})
            console.log(data);
            localStorage.setItem("chat-app-user", JSON.stringify(data.user))
            navigate("/")
        }
    }

    const handleChange = (e:ChangeEvent<HTMLFormElement>) => {
        setValues({...values, 
        [e.target.name]: e.target.value
        })
    }
    
        
        return (
    <>

<div className="relative flex text-gray-700 antialiased justify-center overflow-hidden bg-gray-50 py-5 sm:py-10">
                <form
                    className="w-full max-w-sm"
                    onSubmit={handleSubmit}
                >
                    <div className="relative py-3 sm:w-96 text-center">
                        <span className="text-2xl font-semibold gray-700">Register an account</span>
                        <div className="mt-4 bg-white shadow-md rounded-lg text-left">
                            <div className="h-2 bg-yellow-400 rounded-t-md"></div>
                            <div className="px-8 py-6 ">

                                <label className="gray-700 font-semibold"> Username </label>
                                <input
                                    id="username"
                                    type="text"
                                    placeholder="username"
                                    onChange = {handleChange}
                                    name="username"
                                    className="border w-full h-3 px-3 py-4 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                                <label className="gray-700 font-semibold"> Email </label>
                                <input
                                    id="email"
                                    type="text"
                                    placeholder="email"
                                    onChange = {handleChange}
                                    name="email"
                                    className="border w-full h-3 px-3 py-4 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                                <label className="block gray-700 mt-3 font-semibold"> Password </label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="password"
                                    onChange = {handleChange}
                                    name="password"
                                    className="border w-full h-3 px-3 py-4 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                                <label className="block gray-700 mt-3 font-semibold"> Confirmed Password </label>
                                <input
                                    id="confirmedPassword"
                                    type="password"
                                    placeholder="confirmed password"
                                    onChange = {handleChange}
                                    name="confirmedPassword"
                                    className="border w-full h-3 px-3 py-4 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />

                                <div className="flex flex-col gap-4">
                                    <button type="submit" className="mt-4 bg-yellow-400 text-gray-700  py-2 px-6 rounded-md font-medium hover:bg-yellow-400 ">
                                        Register
                                    </button>

                                    <button className=" bg-gray-700 py-2 px-6 w-full  rounded-lg flex align-middle gap-5">
                                        <FcGoogle className="text-3xl" />
                                        <a href="" className="no-underline font-medium text-white ">Sign in with Google</a>
                                    </button>
                                    <span className="text-1xl font-semibold gray-700 text-center"> Already have an account? <Link to={"/login"}>Login</Link></span>
                                </div>

                            </div>
                        </div>
                    </div>

                </form>
                <ToastContainer />
            </div>
    </>
        )
        
}

export default Register