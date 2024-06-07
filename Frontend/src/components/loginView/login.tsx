import "./login.css"

const Login = () => {
    return (
        <div className="LoginView">
            <div className="login-form">
                <h1>Arena Breakout Bot Panel</h1>
                <input type="text" name="username" id="username" placeholder="username"/>
                <input type="password" name="password" id="password" placeholder="password"/>
                <button type="submit">Submit</button>
            </div>
        </div>
    )
}

export default Login;