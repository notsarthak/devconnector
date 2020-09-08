import React, { Component } from "react";
import PropTypes from "prop-types";

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
    };
    this.myRef = React.createRef();
  }
  componentDidMount() {
    fetch(`/api/profile/github/${this.props.username}`)
      .then((res) => res.json())
      .then((data) => {
        if (this.myRef.current) {
          this.setState({ repos: data });
        }
      })
      .catch((e) => console.log(e));
  }
  render() {
    const repoItems = this.state.repos.map((repo) => (
        <div key={repo.id} className="card card-body mb-2">
          <div className="row">
            <div className="col-md-6">
              <h4>
                <a href={repo.html_url} className="text-info" target="_blank" rel="noopener noreferrer" >
                  {" "}
                  {repo.name}
                </a>
              </h4>
              <p>
                {repo.description ? <span>{repo.description}</span> : null}
              </p>
            </div>
            <div className="col-md-6">
              <span className="badge badge-info mr-1">
                Stars: {repo.stargazers_count}
              </span>
              <span className="badge badge-secondary mr-1">
                Watchers: {repo.watchers}
              </span>
              <span className="badge badge-success">Forks: {repo.forks}</span>
            </div>
          </div>
        </div>
      ));
    return (
      <div ref={this.myRef}>
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
};

export default ProfileGithub;
