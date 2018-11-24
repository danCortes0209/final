import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deletePost, likePost } from "../../actions/criticactions";

class CriticItem extends Component{

    onDeleteClick(id){
        this.props.deletePost(id);
    }

    onLikeClick(id) {
        this.props.likePost(id);
    }

    findUserLike(likes) {
        const { auth } = this.props;
        return likes.filter(like => like.user === auth.user.id).length > 0;
    }

    render() {
        const { post, auth, cssClass, withActions } = this.props;

        let LikeAction = () => {
            let liked = this.findUserLike(post.likes);
            return (
                <button className={liked ? "button button-like liked" : "button button-like"} onClick={this.onLikeClick.bind(this, post._id)}>
                    <i className={ liked ? "fas fa-heart icon-liked" : "fas fa-heart"}/>
                </button>
            )
        };

        let deleteButton = auth.user.id === post.user ? (
            <button className="button button-delete" onClick={this.onDeleteClick.bind(this,post._id)}>
                <i className="fas fa-times"/>
            </button>
        ) : null ;

        let ItemActions = () => {
            if (auth.isAuthenticated) {
                return(
                    <div className={`${cssClass}__item--actions`}>
                        <LikeAction/>
                        { deleteButton }
                    </div>
                )
            } else {
                return null;
            }
        };

        return (
            <div className={`${cssClass}__item`}>
                <h2 className={`${cssClass}__item--title`}>
                    { cssClass === "critic" ? post.title : <Link to={`/criticas/${post._id}`} className={`feed__item--link`}>{post.title}</Link> }
                    &nbsp;<span className={`${cssClass}__item--user`}>Por:&nbsp;{post.nickname}</span>
                    &nbsp;<span className={`${cssClass}__item--class`}>{post.classification}</span>
                </h2>
                <p className={`${cssClass}__item--text`}>{post.text}</p>
                { withActions ? <ItemActions/>  : null }
            </div>
        );
    }
}

CriticItem.propTypes = {
    post: PropTypes.object,
    auth: PropTypes.object.isRequired,
    deletePost: PropTypes.func,
    likePost: PropTypes.func
};

CriticItem.defaultProps = {
    withActions: true
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deletePost, likePost })(CriticItem);