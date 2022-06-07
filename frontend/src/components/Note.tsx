import * as React from "react";

export default (props: any) => {
    function handleClick() {
        props.deleteNote(props.noteId);
    }

    return(
        <div className="note mb-3 col-lg-4 col-md-6 col-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="title float-left my-1">{props.title}</h5>
                    <button id={props.noteId} onClick={handleClick} className="btn btn-outline-danger float-right m-0"><i className="fa-solid fa-trash-can"></i></button>
                </div>
                <div className="card-body">
                    <p className="card-text">{props.text}</p>
                </div>
            </div>
        </div>
    )
}