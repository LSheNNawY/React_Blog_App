import React from 'react';
import NavbarComponent from "../components/NavbarComponent";

const NotFound = () => {
    return (
        <div>
            <NavbarComponent/>
            <div className="container mt-3" style={{ height: "25rem"}}>
                <div className="row align-items-center justify-content-center h-100">
                    <h1 className="text-black-50">404 Not found Dude! <span className="text-blue">😏</span></h1>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
