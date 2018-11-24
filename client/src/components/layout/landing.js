import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from './footer';

class Landing extends Component {
    render () {

        function HeroSearch () {
            return (
                <div className="hero__search">
                    <span className="hero__search-icon"><i className="fas fa-search" /></span>
                    <input className="hero__search-bar" type="text" placeholder="Intenta con 'La Cabba'"/>
                </div>
            );
        }

        return (
            <div className={"landing"}>
                <div className="hero">
                    <h1 className="hero__title">Empieza buscando tu lugar favorito para beber</h1>
                    <HeroSearch/>
                    <Link to={""} className="button button-small hero__button">Mas sobre nosotros</Link>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Landing;