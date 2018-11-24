import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CriticItem from '../critics/criticitem';
import CommentForm from './commentform';

import { getPost } from "../../actions/criticactions";
import CommentFeed from "./commentfeed";

class Critic extends Component{
    componentDidMount() {
        this.props.getPost(this.props.match.params.id);
    }

    render(){
        let postContent;
        const { post, loading } = this.props.critic,
            {auth} = this.props;

        if ( post === null || loading) {
            postContent = <h4>Loading...</h4>;
        } else if (post !== null && !loading) {
            postContent = {
                criticitem: <CriticItem key={post._id} post={post} cssClass={"critic"} withActions={false}/>,
                commentform: <CommentForm postID={post._id}/>,
                commentfeed: <CommentFeed comments={post.comments} postID={post._id}/>
            };
        } else {
            postContent = [
                <CriticItem key={post._id} post={post} cssClass={"critic"} withActions={false}/>,
                <CommentForm postID={post._id}/>
            ];
        }




        return(
            <div className="critic">
                <div className="critic__container">
                    <Link to={"/criticas"} className="button button-small">Volver atras</Link>
                    {postContent.criticitem}
                </div>
                <div className="comment">
                    { auth.isAuthenticated ? postContent.commentform : null }
                    <div className="comment__feed">
                        { post !== null ? postContent.commentfeed : null }
                    </div>
                </div>
            </div>
        );
    }
}

Critic.propTypes = {
    getPost: PropTypes.func,
    critic: PropTypes.object,
    auth: PropTypes.object
};

const mapStateToProps = state => ({
    auth: state.auth,
    critic: state.critic
});

export default connect(mapStateToProps, { getPost }) (Critic);