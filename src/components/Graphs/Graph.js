import React from "react";
import { Dropdown } from "react-bootstrap";
import Bar from "./Bar";
import Pie from "./Pie";

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choice: "Expenses by Month",
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(eventKey) {
    this.setState({
      choice: eventKey,
    });
    console.log(eventKey);
  }

  render() {
    return (
      <div>
        <Dropdown
          name="category"
          value={this.choice}
          onSelect={this.handleSelect}
          style={{
            flex: 10,
          }}
        >
          <Dropdown.Toggle
            style={{
              width: "100%",
              color: "black",
              backgroundColor: "transparent",
              outline: "none",
              border: "none",
              outline: "none !important",
              boxshadow: "none",
            }}
            variant="primary"
            id="dropdown-basic"
          >
            {this.state.choice}
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ width: "100%", justifyContent: "center" }}>
            <Dropdown.Item eventKey="Expenses by Month">
              Expenses by Month
            </Dropdown.Item>
            <Dropdown.Item eventKey="Expenses by Category">
              Expenses by Category
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <ShowGraph choice={this.state.choice}></ShowGraph>
      </div>
    );
  }
}

function ShowGraph({ choice }) {
  if (choice === "Expenses by Month") {
    return <Bar />;
  } else {
    return <Pie />;
  }
}

export default Graph;