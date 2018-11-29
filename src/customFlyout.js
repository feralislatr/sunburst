import React from "react";
import { Portal } from "react-portal";

const theme = {
  flyoutStyle: {
    fill: "#fff"
  }
};

class CustomFlyout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { position: true };
    this.toolTip = React.createRef();
  }

  componentDidMount() {
    this.calcTooltipPosition();
  }

  calcTooltipPosition() {
    const position = this.toolTip.current.getBoundingClientRect();
    if (this.state.x !== position.x && this.state.y !== position.y) {
      this.setState({
        x: position.x + window.scrollX,
        y: position.y + window.scrollY,
        position
      });
      console.log(position);
    }
  }

  render() {
    const { dy, datum } = this.props;
    const text = datum.value === 1 ? "participant" : "participants";
    const { position, x, y } = this.state;
    return (
      <g>
        <circle
          cx={this.props.x + 55}
          cy={this.props.y + 65}
          r={dy}
          fill={theme.flyoutStyle.fill}
          ref={this.toolTip}
        />
        <Portal>
          <div>
            <div
              className="percentLabelContainer labelContainer"
              style={{
                top: `${y + position.height / 2 - 60}px`,
                left: `${x + position.width / 2 - 60}px`
              }}
            >
              <h2 className="percentLabel">{`${datum.y}%`}</h2>
            </div>
            <div
              className="subtextLabelContainer labelContainer"
              style={{
                top: `${y + position.height / 2 - 13}px`,
                left: `${x + position.width / 2 - 70}px`
              }}
            >
              <p className="participantsLabel">{`${datum.value.toLocaleString(
                "en-US"
              )} core ${text}`}</p>
            </div>
          </div>
        </Portal>
      </g>
    );
  }
}

export default CustomFlyout;
