import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileByHandle } from "../../actions/profileActions";
import ProfileCreds from "./ProfileCreds";
import ProfileAbout from "./ProfileAbout";
import ProfileGithub from "./ProfileGithub";
import ProfileHeader from "./ProfileHeader";
import Spinner from "../common/Spinner";
import { GET_PROFILE } from "../../actions/types";

class Profile extends Component {
    //if a user who wants to see the profile comes to the profile page/component from the dashboard, the profile to be shown to the user would already be in the redux store's state
    //as when the dashboard is rendered a request is made to the server for all the profiles, and the profiles property in the redux store's state would not be null. It would be either an empty array or an array with some elements
    //and hence there is no need to send a request to the server (on this page) for the profile to be shown to the user, the profile to be shown can simply be grabbed from the redux store's state and
    //set to the profile property in the profile state of the store. (by dispatching an action)
    //Whereas, if the user comes to the profile page/component by typing in the url in the browser's address bar, the redux store would be empty with the exception of the 
    //redux store becomes empty on each reload and has to be populated again. Therefore we use <Link> component instead of <a> tag as unlike <a> tags they do not reload the page and prevent default behaviour of reloading.
    //currently logged in user's (user data) stored in the user state of the store.
    //everything else would be empty i.e. the profiles would be null, profile would be null in the profile state
    //then we would need to send a request to the server to get the profile of the user to be shown
    componentDidMount() {
        if(this.props.match.params.handle)
        {
            if(this.props.profile.profiles!==null)
            {
                const profile = this.props.profile.profiles.find(profile => profile.handle === this.props.match.params.handle);
                this.props.dispatch({
                    type: GET_PROFILE,
                    payload: profile
                });
            } 
            else
            {
                this.props.getProfileByHandle(this.props.match.params.handle);
            }
        }    
    }
    render() {
        return (
        <div>
            <ProfileHeader />
            <ProfileAbout />
            <ProfileCreds />
            <ProfileGithub />
        </div>
        ); 
    }
}

Profile.propTypes = {
    getProfileByHandle: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProfileByHandle,
        dispatch
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);