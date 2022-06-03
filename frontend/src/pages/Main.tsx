import * as React from "react";
import Note from "../components/Note";
import "../style/main.css"

export default () => {

    async function getUserData() {
        const response = await fetch('/api/main', {
            method: "POST"
        })
        const data = await response.json()
        console.log(data)
        
    }
    getUserData()

    return(
        <div className="container">
            <div className="row mt-4">
                <div className="mx-auto col-xl-6 col-md-8 col-12">
                    <div className="input-group mb-1">
                        <div className="input-group-prepend">
                            <span className="caixa-input input-group-text">Título</span>
                        </div>
                        <input type="text" className="form-control"/>
                        <div className="input-group-append">
                            <button className="caixa-input btn btn-outline-secondary" type="button">Criar</button>
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="caixa-input input-group-text">Texto</span>
                        </div>
                        <input type="text" className="form-control"/>
                    </div>
                </div>
            </div>
            <div className="row">
                <Note></Note>
                <Note></Note>
                <Note></Note>
                <Note></Note>
                <Note></Note>
            </div>
        </div>
    )
}