import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import TextFieldGroup from '../common/textfieldgroup';
import { loginUser } from "../../actions/authactions";
import { connectUserFb } from "../../actions/authactions";

class Login extends Component {

    constructor () {
        super();
        this.state = {
            email: '', password: '', errors: {}, isLoggedIn: false, userID: '', name: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentClicked = () => console.log("Clicked");

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            //this.props.history.push("/dashboard");
            this.props.history.push("/criticas");
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.auth.isAuthenticated) {
            //this.props.history.push("/dashboard");
            this.props.history.push("/criticas");
        }

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password,
        };
       this.props.loginUser(userData);
    }

    responseFacebook = response =>{
        this.setState({
            isLoggedIn: true,
            facebook_id: response.userID,
            name: response.name,
            email: response.email,
        });
        if (this.state.isLoggedIn){
            const fbUser = {
                name: this.state.name,
                email: this.state.email,
                facebook_id: this.state.facebook_id
            };
            this.props.connectUserFb(fbUser);
        }
    };


    render() {
        //Login with Facebook
        let fbContent = <FacebookLogin
            appId="275945779853061"
            autoLoad={true}
            fields="name,email,picture"
            onClick={this.componentClicked.bind(this)}
            callback={this.responseFacebook}/>;

        const { errors } = this.state;
        return (
            <div className="login">
                <div className="login__container">
                    <span className="login__container--close">
                        <i className="fas fa-times"/>
                    </span>
                    <form onSubmit={this.onSubmit} className="form" noValidate>
                        <TextFieldGroup
                            type="email" placeholder="Ingrese su correo electronico" name="email" value={this.state.email}
                            onChange={this.onChange} autoComplete="email" error={errors.email}
                        />
                        <TextFieldGroup
                            type="password" placeholder="Ingrese su contraseña" name="password" value={this.state.password}
                            onChange={this.onChange} autoComplete="current-password" error={errors.password}
                        />
                        <input type="submit" className="button button-submit"/>
                        <span className="form__redirect">¿No tienes cuenta?&nbsp;
                            <Link to="/register" className="form__redirect--link">Registrate</Link>
                        </span>
                    </form>
                    <div className="login__facebook">{fbContent}</div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    connectUserFb: PropTypes.func,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { loginUser, connectUserFb} )(Login);