import * as React from "react";
import Note from "../components/Note";
import "../style/main.css"

export default () => {
    const [note, setNote] = React.useState<any>([])
    const [title, setTitle] = React.useState("")
    const [text, setText] = React.useState("")
    const [deleteNoteId, setDeleteNoteId] = React.useState("")
    const [notesArrKeep, setNotesArrKeep] = React.useState(<p></p>)

    // Add note na arr
    function addNoteArr(newNote: Object){
        let tempNote = note
        tempNote.push(newNote)
        setNote(tempNote)
    }

    // Mudar usestate
    function addNotes(){   
          
        let reactArr = []
        for (let i = 0; i <= Object.keys(note).length; i++){
            if (note[i] != null) {
                reactArr.push(<Note title={note[i].title} text={note[i].text} noteId={note[i].noteId} deleteNote={deleteNote}></Note>)
            }
        }
        
        return (
            <div className="row">
                {reactArr}
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
                    addNoteArr({title: data.data[i].title, text: data.data[i].text, noteId: data.data[i].noteId})
                }
                setNotesArrKeep(addNotes())
            }
        })
    },[]);

    // Pegar valores dos inputs
    function getText(e:any){
        if (e.target.name == "title"){
            setTitle(e.target.value)
        }
        else if (e.target.name == "text"){
            setText(e.target.value)
        }
    }
    function enter(e: any){
        if (e.key === "Enter") {
            addNote()
        }
    }


    // Deletar Nota
    async function deleteNote(noteId: string){
        setDeleteNoteId(noteId)
        let tempNotes = note.filter((value : any) => { 
            return value.noteId != noteId
        })
        setNote(tempNotes)
    }
    React.useEffect(() => {
        console.log(deleteNoteId)
        setNotesArrKeep(addNotes())
        
        // Post com a note deletada
        fetch('/api/deleteNote', {
            method: "POST",
            body: JSON.stringify({
                noteId: deleteNoteId.toString(),
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
      }, [note, deleteNoteId])


    // add nota e adicionar na db
    async function addNote(){
        // Garantir que tem texto
        if (text.length == 0 || title.length == 0){
            console.log("erro de tamanho")
            return 0
        }
        
        let noteId = 0
        if(Object.keys(note).length == 0){
            noteId = 0
        }
        else{
            noteId = parseInt(note.at(-1).noteId) + 1
        }

        // Add a note
        addNoteArr({title: title, text: text, noteId: noteId.toString()})
        setNotesArrKeep(addNotes())

        // Post com a nova note
        fetch('/api/addNote', {
            method: "POST",
            body: JSON.stringify({
                title: title,
                text: text,
                noteId: noteId.toString(),
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })

        // Remover texto
        setTitle("")
        setText("")
    }

    return(
        <div>
            <div className="navb">
                <div className="container">
                    <nav className="navbar navbar-light">
                        <span className="navbar-brand">Notes</span>
                    </nav>
                </div>
            </div>
            <div className="notes container">
                <div className="row mt-4">
                    <div className="mx-auto col-xl-6 col-md-8 col-12">
                        <div className="input-group mb-1">
                            <div className="input-group-prepend">
                                <span className="caixa-input input-group-text">Título</span>
                            </div>
                            <input onKeyDown={enter} onChange={getText} value={title} name="title" type="text" className="form-control"/>
                            <div className="input-group-append">
                                <button onClick={addNote} className="caixa-input btn btn-outline-secondary" tabIndex="-1" type="button">Criar</button>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="caixa-input input-group-text">Texto</span>
                            </div>
                            <input onKeyDown={enter} onChange={getText} value={text} name="text" type="text" className="form-control"/>
                        </div>
                    </div>
                </div>
                
                {notesArrKeep}
            </div>
            <footer className="fixed-bottom py-2 w-100">
                <div className="container">
                    <div className="mx-auto">
                        <div className="text-center">
                            <span><i className="fa-solid fa-user-tie"></i> Autor: Gabriel Chaves &nbsp;</span>
                            <span><i className="fa-solid fa-copyright"></i> Copyright 2022</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}