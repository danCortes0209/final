import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PlaceItem from '../places/placeitem';
import CriticFeed from "../critics/criticfeed";

import { getPlace, getCriticsByPlace } from "../../actions/placeactions";



class Place extends Component{
    componentDidMount(){
        this.props.getPlace(this.props.match.params.id);
        this.props.getCriticsByPlace(this.props.match.params.id);
    }

    render(){
        let placeContent, postContent;
        const { posts } = this.props.critic,
            { place, loading } = this.props.place;

        if ( place === null || loading ) {
            placeContent = <h4>Loading...</h4>;
        } else if (place !== null && !loading) {
            placeContent = {
                placeitem: <PlaceItem key={place._id} place = {place} cssClass={"place"} withActions={false}/>,
            };
        } else {
            placeContent = (
                <PlaceItem key={place._id} place={place} cssClass={"place"} withActions={false}/>
            );
        }


        if (posts === null || loading) {
            postContent = <h4 className={"feed__loading"}>Loading...</h4>
        } else {
            posts.length > 0 ?
                postContent = [
                    <h2 className="comment__title">Criticas hechas a este lugar</h2>,
                    <CriticFeed posts={posts}/>
                ] :
                postContent = <h4 className="feed__empty">Aun no hay nada para mostrar. Comparte alguna de tus experiencias!</h4>;
        }

        return(
            <div className="place">
                <div className="place__container">
                    <Link to={"/lugares"} className="button button-small">Volver atras</Link>
                    {placeContent.placeitem}
                </div>
                <div className="comment">
                    <div className="comment__feed">{ postContent }</div>
                </div>
            </div>
        )
    }
}

Place.propTypes = {
    getPlace: PropTypes.func,
    getCriticsByPlace: PropTypes.func,
    place: PropTypes.object,
    auth: PropTypes.object,
    critic: PropTypes.object
};

const mapStateToProps = state => ({
    auth: state.auth,
    place: state.place,
    critic: state.critic,
});

export default connect(mapStateToProps, { getPlace, getCriticsByPlace }) (Place);