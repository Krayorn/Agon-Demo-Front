import ArticleList from "./ArticleList";
import React from "react";
import { Link } from "react-router-dom";
import agent from "../agent";
import { connect } from "react-redux";
import {
    FOLLOW_USER,
    UNFOLLOW_USER,
    PROFILE_PAGE_LOADED,
    PROFILE_PAGE_UNLOADED
} from "../constants/actionTypes";
import { AgonLvlProgression } from "react-agon";

const EditProfileSettings = props => {
    if (props.isUser) {
        return (
            <Link
                to="/settings"
                className="btn btn-sm btn-outline-secondary action-btn"
            >
                <i className="ion-gear-a" /> Edit Profile Settings
            </Link>
        );
    }
    return null;
};

const FollowUserButton = props => {
    if (props.isUser) {
        return null;
    }

    let classes = "btn btn-sm action-btn";
    if (props.user.following) {
        classes += " btn-secondary";
    } else {
        classes += " btn-outline-secondary";
    }

    const handleClick = ev => {
        ev.preventDefault();
        if (props.user.following) {
            props.unfollow(props.user.username);
        } else {
            props.follow(props.user.username);
        }
    };

    return (
        <button className={classes} onClick={handleClick}>
            <i className="ion-plus-round" />
            &nbsp;
            {props.user.following ? "Unfollow" : "Follow"} {props.user.username}
        </button>
    );
};

const mapStateToProps = state => ({
    ...state.articleList,
    currentUser: state.common.currentUser,
    profile: state.profile
});

const mapDispatchToProps = dispatch => ({
    onFollow: username =>
        dispatch({
            type: FOLLOW_USER,
            payload: agent.Profile.follow(username)
        }),
    onLoad: payload => dispatch({ type: PROFILE_PAGE_LOADED, payload }),
    onUnfollow: username =>
        dispatch({
            type: UNFOLLOW_USER,
            payload: agent.Profile.unfollow(username)
        }),
    onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED })
});

class Profile extends React.Component {
    componentWillMount() {
        this.props.onLoad(
            Promise.all([
                agent.Profile.get(this.props.match.params.username),
                agent.Articles.byAuthor(this.props.match.params.username)
            ])
        );
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    renderTabs() {
        return (
            <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                    <Link
                        className="nav-link active"
                        to={`/@${this.props.profile.username}`}
                    >
                        My Articles
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        className="nav-link"
                        to={`/@${this.props.profile.username}/favorites`}
                    >
                        Favorited Articles
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        className="nav-link"
                        to={`/@${this.props.profile.username}/achievements`}
                    >
                        Achievements
                    </Link>
                </li>
            </ul>
        );
    }

    render() {
        const profile = this.props.profile;
        if (!profile) {
            return null;
        }

        const isUser =
            this.props.currentUser &&
            this.props.profile.username === this.props.currentUser.username;

        let nextLevel;
        if (profile.gamer) {
            switch (profile.gamer.level) {
                case 1:
                    nextLevel = 50;
                    break;
                case 2:
                    nextLevel = 100;
                    break;
                default:
                    nextLevel = 25;
                    break;
            }
        }

        return (
            <div className="profile-page">
                <div className="user-info">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-md-10 offset-md-1">
                                <img
                                    src={profile.image}
                                    className="user-img"
                                    alt={profile.username}
                                />
                                <h4>{profile.username}</h4>
                                <p>{profile.bio}</p>
                                {profile.gamer && (
                                    <div
                                        style={{
                                            flexDirection: "column",
                                            display: "flex",
                                            width: "fit-content",
                                            alignItems: "center",
                                            margin: "auto"
                                        }}
                                    >
                                        <p>
                                            <b>Current Level => </b>
                                            {profile.gamer.level}
                                        </p>
                                        <AgonLvlProgression
                                            total={nextLevel}
                                            current={profile.gamer.experience}
                                            variant="rounded"
                                        />
                                    </div>
                                )}

                                <EditProfileSettings isUser={isUser} />
                                <FollowUserButton
                                    isUser={isUser}
                                    user={profile}
                                    follow={this.props.onFollow}
                                    unfollow={this.props.onUnfollow}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-10 offset-md-1">
                            <div className="articles-toggle">
                                {this.renderTabs()}
                            </div>

                            {this.props.articles && (
                                <ArticleList
                                    pager={this.props.pager}
                                    articles={this.props.articles}
                                    articlesCount={this.props.articlesCount}
                                    state={this.props.currentPage}
                                />
                            )}
                        </div>
                    </div>
                    {!this.props.articles && profile.gamer && (
                        <div>
                            {profile.gamer.achievements.map(ach => {
                                return (
                                    <div
                                        className="row"
                                        style={{
                                            backgroundColor: "cyan",
                                            marginTop: '15px',
                                            padding: '25px',
                                            display: 'flex',
                                            justifyContent: "space-around",
                                        }}
                                        key={ach._id}
                                    >
                                    <span>
                                        {ach.detail.title} - {ach.detail.condition}
                                    </span>
                                    <span> Obtained at {ach.obtainedAt} </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
export { Profile, mapStateToProps };
