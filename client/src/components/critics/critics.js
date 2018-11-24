import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPosts } from '../../actions/criticactions';

import CriticForm from './criticform';
import CriticFeed from './criticfeed';

class Critics extends Component {

    componentDidMount() {
        this.props.getPosts();
    }

    render () {
        let postContent;
        const { posts, loading } = this.props.critic,
            { auth } = this.props;

        if (posts === null || loading) {
            postContent = <h4 className={"feed__loading"}>Loading...</h4>;
        } else {
            posts.length > 0 ?
                postContent = <CriticFeed posts={posts}/> :
                postContent = <h4 className="feed__empty">Aun no hay nada para mostrar. Comparte alguna de tus experiencias!</h4>;
        }

        return (
            <div className="feed">
                { auth.isAuthenticated ? <CriticForm/> : null }
                <div className="feed__container">
                    { postContent }
                </div>
            </div>
        );
    }
}

Critics.propTypes = {
    getPosts: PropTypes.func.isRequired,
    critic: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    critic: state.critic,
    auth: state.auth,
});

export default connect(mapStateToProps, {getPosts}) (Critics);