import React from "react";
import Profile from "./Profile";

import nba from "../nba-client";
import ShotShort from "./ShotChart";

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            playerInfo: {},
            playerId: 201939,
        };
    }

    componentDidMount() {
        window.nba = nba;
        console.log(nba.findPlayer("Stephen Curry"));
        nba.stats
            .playerInfo({ PlayerID: nba.findPlayer("Lebron James").playerId })
            .then((info) => {
                console.log(info);
                const playerInfo = Object.assign(
                    info.commonPlayerInfo[0],
                    info.playerHeadlineStats[0]
                );
                this.setState({ playerInfo });
            });
    }

    render() {
        return (
            <div className="main">
                <Profile playerInfo={this.state.playerInfo} />
                <ShotShort />
            </div>
        );
    }
}

export default Main;
