import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CommentItem from "./commentitem";

class CommentFeed extends Component {
    render() {
        const { comments, postID } = this.props;
        if (comments) {
            return comments.map(comment => <CommentItem comment={comment} postID={postID} key={comment._id} /> )
        } else {
            return <div className="hola">hola</div>
        }
    }
}

CommentFeed.propTypes = {
    comments: PropTypes.array,
    postID: PropTypes.string
};

export default CommentFeed;