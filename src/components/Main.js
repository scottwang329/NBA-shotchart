import React from "react";
import Profile from "./Profile";

import nba from "../nba-client";
import DataViewContainer from "./DataViewContainer";

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
            .playerInfo({ PlayerID: nba.findPlayer("Stephen Curry").playerId })
            .then((info) => {
                console.log(info);
                const playInfo = Object.assign(
                    info.commonPlayerInfo[0],
                    info.playerHeadlineStats[0]
                );
                this.setState({ playerInfo: playInfo });
            });
    }

    render() {
        return (
            <div className="main">
                <Profile playerInfo={this.state.playerInfo} />
                <DataViewContainer playerId={this.state.playerId} />
            </div>
        );
    }
}

export default Main;
