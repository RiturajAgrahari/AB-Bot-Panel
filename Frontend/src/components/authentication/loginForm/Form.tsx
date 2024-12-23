import "./Form.css"
import { useState, FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../constants";
import api from "../../../api";
import { AxiosError } from "axios";


type FormProps = {
    route: string;
    method: string;
};


function Form({route, method}: FormProps) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [error, setError] = useState<string>()
    const errorMessage = useRef<HTMLDivElement>(null)
    const progressBar = useRef<HTMLDivElement>(null)
    const loginButton = useRef<HTMLButtonElement>(null)

    const handleError = (error: string) => {
        setError(error)
        errorMessage.current?.classList.add("active")
        progressBar.current?.classList.add("active")
        setTimeout(() => {
            errorMessage.current?.classList.remove("active")
            progressBar.current?.classList.remove("active")
        }, 5000)
    }


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        try {
            const res = await api.post(route, {username, password})
            if (method == "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch(error) {
            if (error instanceof AxiosError){
                if (error.response?.status == 401) {
                    handleError("Invalid Login Credentials!");
                } else {
                    handleError(error.message);
                }
            } else {
                console.error("Error Fetching!",error);
            }
                  
        } finally {

           }
        }

    const handleGuestLogin = async () => {
        // e.preventDefault()
        
        try {
            const res = await api.post(route, {username:"Guest", password:"guest12345"})
            if (method == "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch(error) {
            if (error instanceof AxiosError){
                if (error.response?.status == 401) {
                    handleError("Guests are not allowed anymore!");
                } else {
                    handleError(error.message);
                }
            } else {
                alert(error);
            }
                  
        } finally {
        }
    }


    return (
        <div className="LoginView">
            <div ref={errorMessage} className="toast">
                <div className="toast-content">
                    <svg xmlns="http://www.w3.org/2000/svg" className="check" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-400v-360h80v360h-80Zm0 200v-80h80v80h-80Z"/></svg>
                    <div className="message">
                        <span className="text text-1">Error</span>
                        <span className="text text-2">{error}</span>
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => errorMessage.current?.classList.remove("active")} className="close" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                <div ref={progressBar} className="progress"></div>
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
                <h1>Bot Panel</h1>
                <input type="text" name="username" id="username" onChange={(event) => setUsername(event.target.value)} placeholder="username" value={username} required/>
                <input type="password" name="password" id="password" onChange={(event) => setPassword(event.target.value)} placeholder="password" value={password} required/>
                <button ref={loginButton} type="submit" className="login-button">Login</button>
                <a href="#" onClick={handleGuestLogin}>are you a guest? Click here</a>
            </form>
        </div>
    )
}

export default Form;