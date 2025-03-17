import React from "react";

const Login = () =>{
    return(
        <body>
            <p>Username</p>
            <input type="text"/>
            <p>Password</p>
            <input type="text"/>
            <br/>
            <button>Login</button>
            <a href = "/register">create an account</a>
        </body>
    )
}

export default Login