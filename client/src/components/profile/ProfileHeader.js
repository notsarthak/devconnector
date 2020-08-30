import React from "react";
import PropTypes from "prop-types";

const ProfileHeader = ({ profile }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-info text-white mb-3">
          <div className="row">
            <div className="col-4 col-md-3 m-auto">
              <img
                className="rounded-circle"
                src={profile.user.avatar}
                alt=""
              />
            </div>
          </div>
          <div className="text-center">
            <h1 className="display-4 text-center">{profile.user.name}</h1>
            <p className="lead text-center">
              {profile.status}{" "}
              {profile.company ? <span>at {profile.company}</span> : null}
            </p>
            <p>{profile.location ? <span>{profile.location}</span> : null}</p>
            <p>
              {profile.website ? (
                <a
                  className="text-white p-2"
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-globe fa-2x"></i>
                </a>
              ) : null}
              {profile.social && profile.social.twitter ? (
                <a
                  className="text-white p-2"
                  href={profile.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-twitter fa-2x"></i>
                </a>
              ) : null}
              {profile.social && profile.social.facebook ? (
                <a
                  className="text-white p-2"
                  href={profile.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook fa-2x"></i>
                </a>
              ) : null}
              {profile.social && profile.social.linkedin ? (
                <a
                  className="text-white p-2"
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin fa-2x"></i>
                </a>
              ) : null}
              {profile.social && profile.social.instagram ? (
                <a
                  className="text-white p-2"
                  href={profile.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram fa-2x"></i>
                </a>
              ) : null}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileHeader.propTypes = {
  profile: PropTypes.object.isRequired,
};
//target="_blank" in a tags to open the links in new tabs
//rel="noopener noreferrer" to get rid of react warning that having target="_blank" without this is a security risk

export default ProfileHeader;
