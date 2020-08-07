import React from "react";

import { Input, Icon, AutoComplete } from "antd";
import nba from "../nba-client";

import { PROFILE_PIC_URL_PREFIX } from "../constants";

const { Option } = AutoComplete;

class SearchBar extends React.Component {
    state = {
        dataSource: [],
    };
    render() {
        const { dataSource } = this.state;

        const options = dataSource.map((player) => {
            return (
                <Option
                    key={player.playerId}
                    value={player.fullName}
                    className="player-option"
                >
                    <img
                        src={`${PROFILE_PIC_URL_PREFIX}/${player.playerId}.png`}
                        alt={player.fullName}
                        className="player-option-image"
                    />
                    <span className="player-option-label">
                        {player.fullName}
                    </span>
                </Option>
            );
        });

        return (
            <AutoComplete
                className="search-bar"
                size="large"
                placeholder="Search NBA Player"
                optionLabelProp="value"
                onSearch={this.handleSearch}
                dataSource={options}
                onSelect={this.onSelect}
            >
                <Input
                    suffix={
                        <Icon type="search" className="certain-category-icon" />
                    }
                />
            </AutoComplete>
        );
    }

    handleSearch = (value) => {
        this.setState({
            dataSource: !value
                ? []
                : nba.searchPlayers(value).map((player) => ({
                      playerId: player.playerId,
                      fullName: player.fullName,
                  })),
        });
    };

    onSelect = (name) => {
        this.props.handleSelectPlayer(name);
    };
}

export default SearchBar;
