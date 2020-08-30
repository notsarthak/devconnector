import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfiles } from "../../actions/profileActions";
import Spinner from "../common/Spinner"

class Profiles extends Component {
    componentDidMount(){
        this.props.getProfiles();
    }
    render() {
        const { profiles, loading } = this.props.profile;
        let profileItems;
        if(profiles===null || loading)
            profileItems = (<Spinner />);
        else if (profiles.length === 0)
            profileItems = (<h4>No profiles to show...</h4>);
        else
            profileItems = (<h4>Show profiles here</h4>);
        return (
            <div className="profiles">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Developer Profiles</h1>
                            <p className="lead text-center">Browse and connect with developers</p>
                            {profileItems}
                        </div>
                    </div>
                </div> 
            </div>              
        )
    }
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }
}

export default connect(mapStateToProps, { getProfiles })(Profiles);