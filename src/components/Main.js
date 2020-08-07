import React from "react";
import Profile from "./Profile";

import nba from "../nba-client";
import DataViewContainer from "./DataViewContainer";
import SearchBar from "./SearchBar";
import { DEFAULT_PLAYER_INFO } from "../constants";

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            playerInfo: DEFAULT_PLAYER_INFO,
        };
    }

    componentDidMount() {
        window.nba = nba;
        this.loadPlayerInfo(DEFAULT_PLAYER_INFO.fullName);
    }

    render() {
        return (
            <div className="main">
                <SearchBar handleSelectPlayer={this.handleSelectPlayer} />
                <div className="player">
                    <Profile playerInfo={this.state.playerInfo} />
                    <DataViewContainer
                        playerId={this.state.playerInfo.playerId}
                    />
                </div>
            </div>
        );
    }

    loadPlayerInfo = (playerName) => {
        nba.stats
            .playerInfo({ PlayerID: nba.findPlayer(playerName).playerId })
            .then((info) => {
                console.log(info);
                const playInfo = Object.assign(
                    info.commonPlayerInfo[0],
                    info.playerHeadlineStats[0]
                );
                this.setState({ playerInfo: playInfo });
            });
    };

    handleSelectPlayer = (playerName) => {
        this.loadPlayerInfo(playerName);
    };
}

export default Main;
