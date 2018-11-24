import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


import { deletePlace } from "../../actions/placeactions";


class PlaceItem extends Component {

    onDeleteClick(id){
        this.props.deletePlace(id);
    }

    render() {

        const {cssClass } = this.props,
            {_id, type, name, description, location} = this.props.place;


        return (
            <div className={`${cssClass}__item`}>
                <h2 className={`${cssClass}__item--title`}>
                    { cssClass === "place" ? name : <Link to={`/lugares/${_id}`} className={`feed__item--link`}>{name}</Link> }
                    <span className={`${cssClass}__item--user`}>Tipo:&nbsp;{type}</span>
                </h2>
                <p><b>Descipción: </b></p>  <p className="comment__item--text">{description}</p>
                <p><b>Dirección:  </b></p>  <p className="comment__item--text">{location ? location.direction : null}</p>
            </div>
        )
    }
}

PlaceItem.propTypes = {
    place: PropTypes.object,
    auth: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {deletePlace})(PlaceItem);