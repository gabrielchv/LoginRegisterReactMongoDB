import * as React from "react";
export default () => {
    const [date, setDate] = React.useState(2022)
    React.useEffect(() => {
        const d = new Date();
        let year = d.getFullYear();
        setDate(year)
    },[]);
    return (
        <footer className="fixed-bottom py-2 w-100 bg-light">
            <div className="container">
                <div className="mx-auto">
                    <div className="text-center">
                        <span><i className="fa-solid fa-user-tie"></i> Autor: Gabriel Chaves &nbsp;</span>
                        <span><i className="fa-solid fa-copyright"></i> Copyright {date}</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

