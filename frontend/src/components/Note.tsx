import * as React from "react";

export default (props: any) => {
    return(
        <div className="note mb-3 col-lg-4 col-md-6 col-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="mt-1 mb-1">{props.title}</h5>
                </div>
                <div className="card-body">
                    <p>{props.text}</p>
                </div>
            </div>
        </div>
    )
}