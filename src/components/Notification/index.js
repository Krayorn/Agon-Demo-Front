import React, { Component } from "react";
import { AgonLvlUp } from "react-agon"

// Redux
import { connect } from "react-redux";
import { CLEAN_ACHIEVEMENT } from "../../constants/actionTypes";

class Notification extends Component {
    componentDidMount() {
        const { cleanAchievement } = this.props;

        setTimeout(cleanAchievement, 5000);
    }

    componentDidUpdate() {
        const { cleanAchievement } = this.props;

        setTimeout(cleanAchievement, 5000);
    }

    render() {
        const { achievement, cleanAchievement } = this.props;
        if (!achievement) return false;

        return (
            <div style={{ zIndex: 5, position: 'absolute', left: 0, width: '300px' }}>
                <div style={{ position: 'absolute', cursor: 'pointer', zIndex: '2', color: 'white', right: '10px',
            }} onClick={cleanAchievement} >&#10005;</div>
                <AgonLvlUp
                    title={achievement.title}
                    text={achievement.condition}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    achievement: state.notification.achievement
});

const mapDispatchToProps = dispatch => ({
    cleanAchievement: () => dispatch({ type: CLEAN_ACHIEVEMENT })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notification);

        // <div
            //     style={{
            //         position: "absolute",
            //         top: 0,
            //         background: "red",
            //         width: "250px",
            //         left: 0
            //     }}
            // >
            //     Achievement unlocked !{achievement.title} -{" "}
            //     {achievement.condition}
            //     rewards :{" "}
            //     {(achievement.rewards || []).map((reward, i) => {
            //         return (
            //             <div key={i}>
            //                 {reward.kind} = {reward.value}
            //             </div>
            //         );
            //     })}
            // </div>
