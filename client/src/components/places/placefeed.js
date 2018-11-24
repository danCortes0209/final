import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PlaceItem from "./placeitem";

class PlaceFeed extends Component {
    render() {
        const { places } = this.props;
        if (places) {
            return places.map(place => <PlaceItem key={place._id} place={place} cssClass={"feed"} /> )
        } else {
            return <div className="hola">hola</div>            
        }
    }
}

PlaceFeed.propTypes = {
    places: PropTypes.array,
};

export default PlaceFeed;