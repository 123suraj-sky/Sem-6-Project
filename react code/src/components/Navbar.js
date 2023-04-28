// "rafce" shortcut is used
// import React, { useEffect } from 'react'
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    let location = useLocation();
    // useLocation come from react-router-dom
    // useEffect(() => {
    //     console.log(location.pathname)
    // }, [location]);

    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/scanner" ? "active" : ""}`} to="/scanner">Scanner</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Notes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`} to="/contact">Contact Us</Link>
                        </li>
                    </ul>

                    {/* if user if logged in show them 
                    the logout button instead of login 
                    and signup button */}
                    {!localStorage.getItem('token') ? <form className="d-flex" role="search">
                        <Link className="btn btn-primary mx-2" role="button" to="/login">Log In</Link>
                        <Link className="btn btn-primary mx-2" role="button" to="/signup">Sign Up</Link>
                    </form> : <button onClick={handleLogout} className="btn btn-primary">Log Out</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
