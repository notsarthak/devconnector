import React from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({ profile }) => {
  //extracting user's first name
  const firstName = profile.user.name.trim().split(" ")[0];
  const skills = profile.skills.map( (skill,index) => (
    <div className="p-3" key={index}>
        <i className="fa fa-check"></i> {skill}
    </div>
  ));
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-light mb-3">
          <h3 className="text-center text-info">{firstName}'s Bio</h3>
          <p className="lead">
            { profile.bio ? (<span>{profile.bio}</span>) : (<span>{firstName} doesn't have a bio yet!</span>) }
          </p>
          <hr />
          <h3 className="text-center text-info">Skill Set</h3>
          <div className="row">
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {skills}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
