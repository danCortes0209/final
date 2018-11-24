import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CommentItem extends Component {
    render() {
        const { comment } = this.props;
        return (
            <div className="comment__item">
                <h4 className="comment__item--user">{comment.nickname}</h4>
                <p className="comment__item--text">{comment.text}</p>
            </div>
        )
    }
}

CommentItem.propTypes = {
    comment: PropTypes.object.isRequired
};

export default CommentItem;