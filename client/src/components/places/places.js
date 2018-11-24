import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPlaces } from "../../actions/placeactions";

import PlaceForm from './placeform';
import PlaceFeed from './placefeed';

class Places extends Component {

    componentDidMount() {
        this.props.getPlaces();
    }

    render() {
        let placeCotent;
        const { places, loading } = this.props.place,
            { auth } = this.props;

        if (places === null || loading) {
            placeCotent = <h4 className={"feed__loading"}>Loading...</h4>
        } else {
            places.length > 0 ?
                placeCotent = <PlaceFeed places = {places} /> : 
                placeCotent = <h4 className="feed__empty">Aun no hay algún lugar para mostrar...</h4>;
        }
        
        return (
            <div className="feed">
                {auth.isAuthenticated ? <PlaceForm/> : null }
                <div className="feed__container">
                    {placeCotent}
                </div>
            </div>
        )
    }
}

Places.propTypes = {
    auth: PropTypes.object,
    place: PropTypes.object,
    getPlaces: PropTypes.func,
};

const mapStateToProps = state => ({
    place: state.place,
    auth: state.auth
});

export default connect(mapStateToProps,{getPlaces}) (Places);
