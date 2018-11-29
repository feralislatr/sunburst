import React from "react";
import { VictoryTooltip } from "victory";
import CustomFlyout from "./customFlyout";

class CustomLabel extends React.Component {
  static defaultEvents = CustomFlyout.defaultEvents;

  render() {
    const { datum } = this.props;
    const layer1 = 135;
    const layer2 = layer1 + 45;
    return (
      <g>
        <VictoryTooltip
          {...this.props}
          x={datum.eth ? layer2 : layer1}
          y={datum.eth ? layer2 : layer1}
          dy={30}
          text={""}
          flyoutComponent={<CustomFlyout />}
        />
      </g>
    );
  }
}

export default CustomLabel;
