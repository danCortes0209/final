import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextAreaGroup from '../common/textareagroup';

import { addComment } from "../../actions/criticactions";

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '', errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
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
        const { user } = this.props.auth,
            { postID } = this.props;
        const newComment = {
            text: this.state.text,
            user: user.id,
            nickname: user.nickname
        };
        this.setState({ text: '' });
        this.props.addComment(newComment,postID);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value, errors: {} });
    }

    render () {
        const { text, errors } = this.state;
        return (
            <div className="comment-form">
                <div className="comment-form__container">
                     <span className="comment-form__container--close">
                        <i className="fas fa-times"/>
                    </span>
                    <form onSubmit={this.onSubmit} className="form" noValidate>
                        <TextAreaGroup
                            placeholder = "Haz un comentario"
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

CommentForm.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object,
    postID: PropTypes.string,
    addComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {addComment})(CommentForm);