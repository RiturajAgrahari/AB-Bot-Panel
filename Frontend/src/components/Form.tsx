import "../styles/Form.css"
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from "../api";
import "../styles/Form.css"


type FormProps = {
    route: string;
    method: string;
};


function Form({route, method}: FormProps) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent) => {
        console.log(6)
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
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="LoginView">
            <form className="login-form" onSubmit={handleSubmit}>
                <h1>Arena Breakout Bot Panel</h1>
                <input type="text" name="username" id="username" onChange={(event) => setUsername(event.target.value)} placeholder="username" value={username}/>
                <input type="password" name="password" id="password" onChange={(event) => setPassword(event.target.value)} placeholder="password" value={password}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Form;