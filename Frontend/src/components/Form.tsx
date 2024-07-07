import "../styles/Form.css"
import { useState, FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from "../api";
import "../styles/Form.css"
import axios, { AxiosError } from "axios";


type FormProps = {
    route: string;
    method: string;
};


function Form({route, method}: FormProps) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [error, setError] = useState<string>()
    const errorDiv = useRef<HTMLDivElement>(null)

    const handleError = () => {
        errorDiv.current?.classList.add("show-error")
        errorDiv.current?.classList.remove("hide-error")
        setTimeout(() => {
            errorDiv.current?.classList.add("hide-error")
            errorDiv.current?.classList.remove("show-error")       
        }, 4000);
    }

    const handleSubmit = async (e: FormEvent) => {
        setLoading(true)
        e.preventDefault()
        
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
                    setError("Incorrect Login Credentials!")
                    handleError();
                } else {
                    alert(error);
                }
            } else {
                alert(error);
            }
                  
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="LoginView">
            <form className="login-form" onSubmit={handleSubmit}>
                <div ref={errorDiv} className="error-message hide-error">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                    {error}
                </div>
                <h1>Arena Breakout Bot Panel</h1>
                <input type="text" name="username" id="username" onChange={(event) => setUsername(event.target.value)} placeholder="username" value={username}/>
                <input type="password" name="password" id="password" onChange={(event) => setPassword(event.target.value)} placeholder="password" value={password}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Form;