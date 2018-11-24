import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import setAuthToken from './utils/setauthtoken';
import store from './store';
import {logoutUser, setCurrentUser} from './actions/authactions';
import { clearCurrentProfile } from './actions/profileActions';

import Navbar from './components/layout/navbar';
import Landing from './components/layout/landing';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Dashboard from './components/dashboard/dashboard';
import Critics from './components/critics/critics';
import Critic from './components/critic/critic';
import Places from './components/places/places';
import Place from './components/place/place';

import PrivateRoute from './components/common/privateroute';

//import Facebook from './components/auth/login';

import './styles/css/styles.css';

/*
* Esto es basicamente programacion orientada a objetos.
*
* Este boton solo es para darles una idea de como funciona recordando lo que debieron de haber aprendido con Javascript
*
* Recuerden una cosa, solo trabajamos con este archivo App. El archivo index y app.test NO SE TOCAN.
* Cuando vayamos a crear mas componentes, se hace en la carpeta componentes, la cual se divide por topicos
* */

if (localStorage.jwtToken) {
    //save the token and decode
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));
    //check for expired token
    const currentTime = Date.now()/1000;
    if (decoded.exp < currentTime){
        //eliminar sesion
        store.dispatch(logoutUser());
        store.dispatch(clearCurrentProfile());
        window.location.href = '/';
    }
}

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navbar />
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/criticas" component={Critics}/>
                        <Route exact path="/lugares" component={Places}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/criticas/:id" component={Critic}/>
                        <Route exact path="/lugares/:id" component={Place}/>
                        <Switch>
                            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
