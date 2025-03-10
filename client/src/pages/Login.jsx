import React from "react";

const Login = () =>{
    return(
        <div>
            <p>Username</p>
            <input type="text"/>
            <p>Password</p>
            <input type="text"/>
            <br/>
            <button>Login</button>
            <a href = "/register">create an account</a>
        </div>
    )
}

export default Login