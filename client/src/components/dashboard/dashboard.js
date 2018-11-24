import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';

class Dashboard extends Component {
    componentDidMount(){
        this.props.getCurrentProfile();
    }

    render () {
        const { user } = this.props.auth,
            { profileInfo, loading } = this.props.profile;
        let dashboardContent;

        if (profileInfo == null || loading ) {
            dashboardContent = <h4>Loading...</h4>
        } else {
            if (Object.keys(profileInfo).length > 0) {
                dashboardContent = <h4>TODO: Mostrar el perfil de {user.nickname}</h4>
            } else {
                dashboardContent = <h4>Loading...</h4>;
                console.dir(profileInfo);
            }
        }

        return (
            <div className="dashboard">
                {dashboardContent}
            </div>
        );
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);