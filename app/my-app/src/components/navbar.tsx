import * as React from "react";
import {Link} from "react-router-dom";
import {ShoppingCart} from "phosphor-react";
import "./navbar.css";

export const Navbar = () => {
    return (
        <div className="navbar">
            <div className="links">
                <Link to={"/"}>Strona głowna</Link>
                <Link to={"/menu"}>Menu</Link>
                <Link to={"/koszyk"}>
                    <ShoppingCart size={32}/>
                </Link>
            </div>
        </div>
    );
};
