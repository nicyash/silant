import React from "react";
import { Link, Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

function Group({ token, role, firstName, handleLogout }) {
    return (
        <>
            <Header
                token={token}
                role={role}
                firstName={firstName}
                handleLogout={handleLogout}
            />
            {token &&
                <div className="linkss">
                    <Link className="btn-primary" to="/">Общая информация</Link>
                    <Link className="btn-primary" to="/maintenances">ТО</Link>
                    <Link className="btn-primary" to="/complaints">Рекламации</Link>
                </div>
            }
            <Outlet/>
            <Footer/>
        </>
    );
}

export default Group;
