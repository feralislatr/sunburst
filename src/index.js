import React from "react";
import { render } from "react-dom";
import { VictoryPie, VictorySharedEvents, VictoryContainer } from "victory";
import CustomLabel from "./customLabel";
import "./style.css";
const style = {
  labels: {
    fill: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
  parent: {
    height: 860,
    overflow: "visible"
  }
};

const config = {
  data: {
    inner: {
      arc: [
        {
          label: "Label 1",
          percentage: 23,
          value: 23000,
          parent: 1,
          color: "48, 35, 174"
        },
        {
          label: "Label 2",
          percentage: 36,
          value: 36000,
          parent: 2,
          color: "83, 160, 253"
        },
        {
          label: "Label 3",
          percentage: 41,
          value: 41000,
          parent: 3,
          color: "180, 236, 81"
        }
      ],
      totalParticipants: 1000001
    },
    outer: {
      arc: [
        {
          label: "Label 1",
          percentage: 23,
          value: 23000,
          parent: 1,
          eth: 1,
          color: "48, 35, 174"
        },
        {
          label: "Label 2",
          percentage: 36,
          value: 36000,
          parent: 2,
          eth: 2,
          color: "83, 160, 253"
        },
        {
          label: "Label 3",
          percentage: 21,
          value: 21000,
          parent: 3,
          eth: 3,
          color: "180, 236, 81"
        },
        {
          label: "Label 4",
          percentage: 6,
          value: 6000,
          parent: 3,
          eth: 4,
          color: "180, 236, 81"
        },
        {
          label: "Label 5",
          percentage: 13,
          value: 13000,
          parent: 3,
          eth: 5,
          color: "180, 236, 81"
        }
      ],
      totalParticipants: 1000001
    }
  }
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      clicked: null,
      hovered: null
    };
  }

  render1() {
    const dataAccessor = d => d.arc;
    const xAccessor = d => d.label;
    const yAccessor = d => d.percentage;
    const data = dataAccessor(config.data.outer);
    const dimension = 470;

    return (
      <g transform={"translate(55, -25)"}>
        <VictoryPie
          name="pie1"
          containerComponent={<VictoryContainer />}
          data={data}
          colorScale={["transparent"]}
          padding={50}
          labelRadius={100}
          style={style}
          padAngle={0.9}
          standalone={false}
          width={dimension}
          height={dimension}
          x={xAccessor}
          y={yAccessor}
          innerRadius={143}
          labelComponent={<CustomLabel />}
        />
      </g>
    );
  }

  render2() {
    const dataAccessor = d => d.arc;
    const xAccessor = d => d.label;
    const yAccessor = d => d.percentage;
    const data = dataAccessor(config.data.inner);
    const dimension = 380;

    return (
      <g transform={"translate(100, 20)"}>
        <VictoryPie
          name="pie2"
          containerComponent={<VictoryContainer />}
          data={data}
          colorScale={["#3023ae", "#53a0fd", "#b4ec51"]}
          labelComponent={<CustomLabel />}
          labelRadius={55}
          style={style}
          padAngle={1}
          standalone={false}
          width={dimension}
          height={dimension}
          x={xAccessor}
          y={yAccessor}
          innerRadius={90}
        />
      </g>
    );
  }
  render() {
    const fade = "0.6";
    return (
      <svg viewBox="0 0 500 500" height={500} width={500}>
        <VictorySharedEvents
          // events for two layers
          events={[
            {
              childName: ["pie1", "pie2"],
              eventHandlers: {
                onMouseOver: (e, hoveredArc) => [
                  {
                    childName: ["pie1", "pie2"],
                    target: "data",
                    eventKey: "all",
                    mutation: props => {
                      // eslint-disable-line consistent-return
                      if (this.state.opened) {
                        if (props.datum.parent === this.state.clicked) {
                          if (!props.datum.eth) {
                            return {
                              style: Object.assign({}, props.style, {
                                fill: `rgba(${props.datum.color}, 1 )`,
                                cursor: "pointer"
                              })
                            };
                          }
                          // lv 2
                          if (hoveredArc.datum.eth) {
                            // also highlight parent
                            if (props.datum.eth === hoveredArc.datum.eth) {
                              return {
                                style: Object.assign({}, props.style, {
                                  fill: `rgba(${props.datum.color}, 1 )`
                                })
                              };
                            }
                            return {
                              style: Object.assign({}, props.style, {
                                fill: `rgba(${props.datum.color}, ${fade})`
                              })
                            };
                          }
                          // lv 1
                          if (!hoveredArc.datum.eth) {
                            if (
                              props.index === hoveredArc.index &&
                              !props.datum.eth
                            ) {
                              return {
                                style: Object.assign({}, props.style, {
                                  fill: `rgba(${props.datum.color}, 1 )`,
                                  cursor: "pointer"
                                })
                              };
                            }
                            return {
                              style: Object.assign({}, props.style, {
                                fill: `rgba(${props.datum.color}, ${fade})`
                              })
                            };
                          }
                        } else {
                          if (props.datum.eth) {
                            return {
                              style: Object.assign({}, props.style, {
                                fill: "transparent"
                              })
                            };
                          }
                          return {
                            style: Object.assign({}, props.style, {
                              fill: `rgba(${props.datum.color},${fade})`
                            })
                          };
                        }
                      }

                      if (!this.state.opened) {
                        if (hoveredArc.datum.eth) {
                          return null;
                        }
                        if (!props.datum.eth) {
                          if (props.index === hoveredArc.index) {
                            return {
                              style: Object.assign({}, props.style, {
                                fill: `rgba(${props.datum.color}, 1 )`,
                                cursor: "pointer"
                              })
                            };
                          }
                          return {
                            style: Object.assign({}, props.style, {
                              fill: `rgba(${props.datum.color}, ${fade})`
                            })
                          };
                        }
                      }
                    }
                  },
                  {
                    target: "labels",
                    mutation: props => {
                      if (!this.state.opened) {
                        if (props.datum.eth) {
                          return null;
                        }
                        return {
                          active: true,
                          style: Object.assign({}, props.style, {
                            cursor: "pointer"
                          })
                        };
                      }
                      if (props.datum.parent === this.state.clicked) {
                        return { active: true };
                      }
                      return { active: false };
                    }
                  }
                ],
                onClick: (e, clickedArc) => {
                  if (clickedArc.datum.eth) {
                    return null;
                  }
                  this.setState({ clicked: clickedArc.datum.parent });
                  return [
                    {
                      childName: "pie1",
                      eventKey: "all",
                      mutation: props => {
                        // eslint-disable-line consistent-return
                        if (
                          this.state.opened &&
                          clickedArc.datum.parent === this.state.clicked
                        ) {
                          this.setState({ opened: !this.state.opened });
                          if (props.datum.parent === clickedArc.datum.parent) {
                            return {
                              style: Object.assign({}, props.style, {
                                fill: this.state.opened
                                  ? "transparent"
                                  : `rgba(${props.datum.color}, 1)`
                              })
                            };
                          }
                        }
                        if (
                          !this.state.opened ||
                          clickedArc.datum.parent !== this.state.clicked
                        ) {
                          if (props.datum.parent === clickedArc.datum.parent) {
                            this.setState({ opened: true });
                            if (!props.orientation) {
                              return {
                                style: Object.assign({}, props.style, {
                                  fill: `rgba(${props.datum.color}, ${fade})`
                                })
                              };
                            }
                          }
                        }
                      }
                    }
                  ];
                },
                onMouseOut: (e, blurredArc) => [
                  {
                    childName: ["pie1", "pie2"],
                    eventKey: "all",
                    mutation: props => {
                      if (this.state.opened) {
                        // for lv 1
                        if (!props.datum.eth) {
                          if (
                            props.datum.parent === blurredArc.datum.parent &&
                            this.state.clicked === blurredArc.datum.parent
                          ) {
                            if (props.orientation) {
                              return {
                                style: Object.assign({}, props.style, style)
                              };
                            }
                            return {
                              style: Object.assign({}, props.style, {
                                fill: `rgba(${props.datum.color}, 1)`
                              })
                            };
                          }
                          if (props.orientation) {
                            return {
                              style: Object.assign({}, props.style, style)
                            };
                          }
                          return {
                            style: Object.assign({}, props.style, {
                              fill: `rgba(${props.datum.color}, ${fade})`
                            }) // was fade
                          };
                        }

                        // for lv 2
                        if (this.state.clicked === props.datum.parent) {
                          if (props.orientation) {
                            return {
                              style: Object.assign({}, props.style, style)
                            };
                          }
                          return {
                            style: Object.assign({}, props.style, {
                              fill: `rgba(${props.datum.color}, ${fade})`
                            })
                          };
                        }
                        return {
                          style: Object.assign({}, props.style, {
                            fill: "#fff"
                          })
                        };
                      } // if not opened
                      return null;
                    }
                  },
                  {
                    target: "labels",
                    mutation: () => ({ active: false })
                  }
                ]
              }
            }
          ]}
        >
          {this.render2()}
          {this.render1()}
        </VictorySharedEvents>
      </svg>
    );
  }
}

render(<App />, document.getElementById("root"));
