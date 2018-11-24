import React, {Component} from 'react'
import PropTypes from 'prop-types';

import CriticItem from './criticitem';

class CriticFeed extends Component{
    render() {
        const { posts } = this.props;
        return posts.map(post => <CriticItem key={post._id} post={post} cssClass={"feed"}/>);
    }
}

CriticFeed.propTypes = {
    posts: PropTypes.array
};

export default CriticFeed;