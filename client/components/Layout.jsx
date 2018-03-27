import React from 'react';


const Header = () => {
    return (
        <header className="jumbotron">
            <h1>JSONator</h1>
            <p className="lead">
                Create your JSONs with style. Like a total boss!
            </p>
            <hr className="my-4" />
            <a className="btn btn-primary btn-lg" href="#" role="button">Start now!</a>
        </header>
    );
};


const Footer = () => {
    return (
        <footer>
            <p style={{textAlign: 'center'}}>2018, made with love @ Codevels</p>
        </footer>
    );
}

export { Header, Footer };
