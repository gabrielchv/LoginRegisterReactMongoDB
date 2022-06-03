import * as React from "react";
import "../style/login.css"

export default () => {
    const [username, setUsername] = React.useState()
    const [password, setPassword] = React.useState()
    const [loginMsg, setLoginMsg] = React.useState()
    
    // get input
    function input(e: any){
        if (e.target.name == "username"){
            setUsername(e.target.value)
        }
        else if (e.target.name == "password"){
            setPassword(e.target.value)
        }
    }

    // login button
    async function login(){
        const response = await fetch('/api/login', {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const data = await response.json()
        console.log(data);
        setLoginMsg(data.msg)
        if (data.status == true){
            await new Promise(r => setTimeout(r, 1000))
            window.location.href = "/"
        }
    }
    async function register(){
        const response = await fetch('/api/register', {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const data = await response.json()
        setLoginMsg(data.msg)
    }
    async function test(){
        fetch('/api/test', {
            method: "POST",
        })
    }
    

    return(
    <>
        <div className="container">
            <div className="row">
                <div className="m-auto login-col col-xl-4 col-lg-6 col-md-8 col-10">
                    <h5 className="text-center">{loginMsg}</h5>
                    <div className="input-group mb-1">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-user"></i></span>
                        </div>
                        <input onChange={input} name="username" className="form-control" type="text" placeholder="Usuário"/>
                    </div>
                    <div className="input-group mb-1">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-key"></i></span>
                        </div>
                        <input onChange={input} name="password" className="form-control" type="password" placeholder="Senha"/>
                    </div>
                    <button onClick={login} className="btn btn-outline-success btn-block">Entrar</button>
                    <button onClick={register} className="mt-1 btn btn-outline-secondary btn-block">Registrar</button>
                    <button onClick={test} className="mt-1 btn btn-outline-danger btn-block">Teste</button>
                </div>
            </div>
        </div>
    </>
  );
}