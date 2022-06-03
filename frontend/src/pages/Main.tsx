import * as React from "react";
import Note from "../components/Note";
import "../style/main.css"

export default () => {
    const [notes, setNotes] = React.useState(<p></p>)
    const [title, setTitle] = React.useState("")
    const [text, setText] = React.useState("")
    const [notesArrKeep, setNotesArrKeep] = React.useState([])

    // Manter a variavel apos os renders
    let notesArr : any = notesArrKeep

    function addNotes(){
        return (
            <div className="row">
                {notesArr}
            </div>
        )
    }

    // Renderizar uma vez
    React.useEffect(() => {
        async function getUserData() {
            const response = await fetch('/api/main', {
                method: "POST"
            })
            const data = await response.json()
            return data
        }
        getUserData().then((data) => {
            if (!data.logged){
                window.location.href = "/login"
            }
            else{
                for (let i = 0; i < Object.keys(data.data).length; i++) {
                    notesArr.push(<Note title={data.data[i].title} text={data.data[i].text}></Note>)
                }
                setNotes(addNotes())
            }
        })
    },[]);

    function getText(e:any){
        if (e.target.name == "title"){
            setTitle(e.target.value)
        }
        else if (e.target.name == "text"){
            setText(e.target.value)
        }
    }

    async function addNote(){
        // Add a note
        notesArr.push(<Note title={title} text={text}></Note>)
        setNotes(addNotes())

        // Post com a nova note
        fetch('/api/addNote', {
            method: "POST",
            body: JSON.stringify({
                title: title,
                text: text
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
    }

    return(
        <div className="container">
            <div className="row mt-4">
                <div className="mx-auto col-xl-6 col-md-8 col-12">
                    <div className="input-group mb-1">
                        <div className="input-group-prepend">
                            <span className="caixa-input input-group-text">Título</span>
                        </div>
                        <input onChange={getText} name="title" type="text" className="form-control"/>
                        <div className="input-group-append">
                            <button onClick={addNote} className="caixa-input btn btn-outline-secondary" type="button">Criar</button>
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="caixa-input input-group-text">Texto</span>
                        </div>
                        <input onChange={getText} name="text" type="text" className="form-control"/>
                    </div>
                </div>
            </div>
            {notes}
        </div>
    )
}