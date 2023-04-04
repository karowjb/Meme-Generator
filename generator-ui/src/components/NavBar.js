import React from "react";
import { Nav, NavLink, NavMenu } from "./NavBarElements";
const NavBar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/AllMemes">All Memes</NavLink>
                    <NavLink to="/AllQuotes">All Quotes</NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default NavBar;
