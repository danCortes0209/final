import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextAreaGroup from '../common/textareagroup';
import TextFieldGroup from '../common/textfieldgroup';
import DataListGroup from '../common/datalistgroup';

import { addPost } from "../../actions/criticactions";
import { getPlaces } from "../../actions/placeactions";

class CriticForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '', title:'', place:'', errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getPlaces();
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push("/login");
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
        const newPost = {
            title: this.state.title,
            text: this.state.text,
            user: user.id,
            nickname: user.nickname,
            place: this.state.place
        };
        this.props.addPost(newPost);
        this.setState({ text: '', title: '', place: ''});
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value, errors: {} });
    }

    render () {
        const { text, title, errors, place } = this.state,
            { places } = this.props.place;


        return (
            <div className="post-critic">
                <div className="post-critic__container">
                    <span className="post-critic__container--close">
                        <i className="fas fa-times"/>
                    </span>
                    <form onSubmit={this.onSubmit} className="form" noValidate>
                        <TextFieldGroup
                            placeholder="Describa su experiencia" name="title" value={title}
                            onChange={this.onChange} error={errors.title}
                        />
                        { (places.length > 0) ?
                            (<DataListGroup onChange={this.onChange} value={place} name={"place"}
                                           options={places} list={"lugares"}/>) : null}
                        <TextAreaGroup
                            placeholder = "Comparte tu experiencia"
                            name="text"
                            value={text}
                            onChange={this.onChange}
                            error={errors.text}
                        />
                        <input type="submit" className="button button-submit"/>
                    </form>
                </div>
            </div>
        )
    }
}

CriticForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    getPlaces: PropTypes.func,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object,
    place: PropTypes.object
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    place: state.place
});

export default connect(mapStateToProps, { addPost, getPlaces })(CriticForm);