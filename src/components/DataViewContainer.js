import React from "react";

import _ from "lodash";
import { Radio, Row, Col, Switch } from "antd";

import ShotChart from "./ShotChart";
import CounterSlider from "./CounterSlider";

class DataViewContainer extends React.Component {
    state = {
        minCount: 2,
        chartType: "hexbin",
        displayTooltip: true,
    };
    onCounterSliderChange = (count) => {
        this.setState({ minCount: count });
    };
    onChartTypeChange = (e) => {
        console.log(e.target.value);
        this.setState({
            chartType: e.target.value,
        });
    };
    render() {
        return (
            <div className="data-view">
                <ShotChart
                    playerId={this.props.playerId}
                    minCount={this.state.minCount}
                    chartType={this.state.chartType}
                    displayTooltip={this.state.displayTooltip}
                />
                <div className="filters">
                    {this.state.chartType === "hexbin" ? (
                        <CounterSlider
                            value={this.state.minCount}
                            onCounterSliderChange={_.debounce(
                                this.onCounterSliderChange,
                                500
                            )}
                        />
                    ) : null}
                    <br />
                    <Row>
                        <Col span={9}>
                            <Radio.Group
                                onChange={this.onChartTypeChange}
                                value={this.state.chartType}
                            >
                                <Radio value="hexbin">Hexbin</Radio>
                                <Radio value="scatter">Scatter</Radio>
                            </Radio.Group>
                        </Col>
                        <Col span={4}>
                            <Switch
                                checkedChildren="on"
                                unCheckedChildren="off"
                                defaultChecked
                                onChange={this.onToolTipChange}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

    onToolTipChange = (checked) => {
        console.log(checked);
        this.setState({
            displayTooltip: checked,
        });
    };
}

export default DataViewContainer;
