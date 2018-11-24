import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
    render () {
        return (
            <div className="footer">
                <div className="footer__expression">
                    <h3 className="footer__expression--title">¿Necesitas ayuda? Aqui puedes expresar tu incomodidad libremente</h3>
                    <Link to={"/criticas"} className="button button-big">Quiero contar algo</Link>
                </div>
                <div className="footer__links">
                    <div className="footer__links--collection">
                        <p className="footer__links--title">Soporte</p>
                        <Link to={`/`} className="footer__links--item">Acerca de Nosotros</Link>
                        <Link to={`/`} className="footer__links--item">Contactos</Link>
                        <Link to={`/`} className="footer__links--item">Preguntas Frecuentes</Link>
                    </div>
                    <div className="footer__links--collection">
                        <p className="footer__links--title">Para Desarrolladores</p>
                        <Link to={`/`} className="footer__links--item">Documentos</Link>
                        <Link to={`/`} className="footer__links--item">Referencias Api</Link>
                        <Link to={`/`} className="footer__links--item">Open Source</Link>
                    </div>
                    <div className="footer__links--collection">
                        <p className="footer__links--title">Compañia</p>
                        <Link to={`/`} className="footer__links--item">Nuestras redes</Link>
                        <Link to={`/`} className="footer__links--item">Nuestro equipo</Link>
                        <Link to={`/`} className="footer__links--item">Historia</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;