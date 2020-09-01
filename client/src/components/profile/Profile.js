import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"; 
import { connect } from "react-redux";
import { getProfileByHandle } from "../../actions/profileActions";
import ProfileCreds from "./ProfileCreds";
import ProfileAbout from "./ProfileAbout";
import ProfileGithub from "./ProfileGithub";
import ProfileHeader from "./ProfileHeader";
import Spinner from "../common/Spinner";

class Profile extends Component {
    componentDidUpdate(prevProps){
        if(this.props.profile.profile===null && this.props.profile.profile!==prevProps.profile.profile)
            this.props.getProfileByHandle(this.props.match.params.handle);
        else if(this.props.errors.find(error=>error.param==="account") && this.props.profile.profile===prevProps.profile.profile)
            this.props.history.push("/not-found");
    }
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
            this.props.getProfileByHandle(this.props.match.params.handle);
        }    
    }
    render() {
        const { profile, loading } = this.props.profile;
        let profileContent;
        if(profile===null || loading)
            profileContent = (<Spinner />);
        else
        {
            profileContent = (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/profiles" className="btn btn-light mb-3 float-left">Back To Profiles</Link>
                        </div>
                        <div className="col-md-6">
                        </div>
                    </div>
                <ProfileHeader profile={profile} />
                <ProfileAbout profile={profile} />
                <ProfileCreds education={profile.education} experience={profile.experience} />
                {profile.githubusername ? (<ProfileGithub username={profile.githubusername} />) : "" }
                </div>
            )
        }    
        
        return (
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                        {profileContent}
                        </div>
                    </div>    
                </div>
            </div>    
        ); 
    }
}

Profile.propTypes = {
    getProfileByHandle: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}

//we needed dispatch in this component to dispatch the GET_PROFILE action if the profile to be shown already exists in the state.
//dispatch is automatically made available to the component if the component is connected to the store and no second arguement is passed to connect()
//here we also required getProfileByhandle action creator in the component so we were passing it in an object as the second arguement to connect()
//so dispatch was not avalable to the component. To make dispatch available to component as well as the getProfileByHandle, we use the mapDispatchToProps
//mapDispatch to props gets passed to it the dispatch as the first arg and the prev pros as the second arg
//returning an object from the function.
//here, what we are doing with getProfileByHandle is automatically done when it is passed in an object as second arguement to connect()
const mapDispatchToProps = (dispatch) => {
    return {
        getProfileByHandle: (handle) => dispatch(getProfileByHandle(handle)),
        dispatch
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        errors: state.errors
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);