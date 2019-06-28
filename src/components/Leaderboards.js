import React from "react";
import agent from "../agent";
import { connect } from "react-redux";
import {
    LEADERBOARDS_PAGE_UNLOADED,
    LEADERBOARDS_PAGE_LOADED
} from "../constants/actionTypes";
import { Link } from "react-router-dom";

const mapStateToProps = state => ({
    list: state.leaderboard.list
});

const mapDispatchToProps = dispatch => ({
    onLoad: payload => dispatch({ type: LEADERBOARDS_PAGE_LOADED, payload }),
    onUnload: () => dispatch({ type: LEADERBOARDS_PAGE_UNLOADED })
});

class Leaderboards extends React.Component {
    componentWillMount() {
        this.props.onLoad(agent.Leaderboards.xp);
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    render() {
        const { list } = this.props;
        console.log("list", list);
        return (
            <div
                style={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <h2>Leaderboard by Experience points !</h2>
                {list &&
                    list.map(user => {
                        return (
                            <Link
                                to={`/@${user.username}`}
                                key={user._id}
                                className="list__person"
                            >
                                <img
                                    className="person__image"
                                    src={
                                        user.image ||
                                        "https://static.productionready.io/images/smiley-cyrus.jpg"
                                    }
                                />
                                <p className="person__name">{user.username}</p>
                                <p className="person__networth">
                                    {user.gamer.experience}
                                    <span>pts</span>
                                </p>
                            </Link>
                        );
                    })}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Leaderboards);
