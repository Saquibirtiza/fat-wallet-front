import React, { Component } from "react";
import Graph from "../Graphs/Graph";
import AddExpense from "../Form/AddExpense";
import EditCategory from "../Form/EditCategory";
//import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenseOrCategory: true,
    };
  }

  expenseCallBack = (dataFromExpense) => {
    this.setState({
      expenseOrCategory: false,
    });
  };

  categoryCallBack = (dataFromCategory) => {
    this.setState({
      expenseOrCategory: true,
    });
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexdirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
          flexShrink: 2,
        }}
      >
        <Graph />
        <Switcher
          eoc={this.state.expenseOrCategory}
          func1={this.expenseCallBack}
          func2={this.categoryCallBack}
        />
        {/* <div style={{ display: "flex", justifyContent: "center" }}> */}

        {/* </div> */}
        {/* <div
          className="px-5"
          style={{ display: "flex", justifyContent: "flex-end" }}
        > */}
        {/* <AddExpense /> */}
        {/* </div> */}
      </div>
    );
  }
}

function Switcher({ eoc, func1, func2 }) {
  console.log("abc");
  if (eoc === true) {
    console.log("cda");
    return <AddExpense callbackFromParent={func1} />;
  } else {
    return <EditCategory callbackFromParent={func2} />;
  }
}

export default Main;
