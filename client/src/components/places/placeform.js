import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextAreaGroup from '../common/textareagroup';
import TextFieldGroup from '../common/textfieldgroup';

import { addPlace } from '../../actions/placeactions';

class PlaceForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '', 
            type: '', 
            location: {direction: ''}, 
            description: '', 
            registedBy: '',  
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    componentWillReceiveProps(nextProps){
        if (!nextProps.auth.isAuthenticated) {
            this.props.history.push("/login");
        }

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const { user } = this.props.auth;
        const newPlace = {
            name: this.state.name,
            type: this.state.type,
            description: this.state.description,
            direction: this.state.direction,
            registedBy: user.id
        };
        this.props.addPlace(newPlace);
        this.setState({ name: '', 
                        type: '', 
                        description: '', 
                        direction: '' 
                    });
        
    }

    onChange(e) {
        this.setState( { [e.target.name]: e.target.value, errors: {} } );
    }

    render () {
        const { name, description, type, direction, errors } = this.state;
        return (
            <div className="post-critic">
                <div className="post-critic__container">
                    <span className="post-critic__container--close">
                        <i className="fas fa-times"/>
                    </span>
                    <form onSubmit={this.onSubmit} className="form">
                        <TextFieldGroup
                            placeholder = "Ingresa el nombre del establecimiento."
                            name = "name"
                            value = {name}
                            onChange = {this.onChange}
                            error = {errors.name}
                        />

                        <TextFieldGroup
                            placeholder = "Ingrese un tipo"
                            name = "type"
                            value = {type}
                            onChange = {this.onChange}
                            error = {errors.name}
                        />
                
                        <TextAreaGroup
                            placeholder = "Describe el lugar..."
                            name="description"
                            value={description}
                            onChange={this.onChange}
                            error={errors.description}
                        />

                        <TextAreaGroup
                            placeholder = "¿Cuál es la dirección del lugar?"
                            name="direction"
                            value={direction}
                            onChange={this.onChange}
                            error={errors.direction}
                        />

                        <input type="submit" className="button button-submit"/>
                    </form>
                </div>
            </div>
        )
    }
}

PlaceForm.propTypes = {
    addPlace: PropTypes.func,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object  
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { addPlace })(PlaceForm);
