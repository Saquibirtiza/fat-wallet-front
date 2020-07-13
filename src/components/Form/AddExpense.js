import React from "react";
import { Dropdown } from "react-bootstrap";
import "./AddExpense.css";
import { InputGroupAppend } from "react-bootstrap/InputGroup";
import Stats from "./Stats";

class AddExpense extends React.Component {
  constructor(props) {
    super(props);
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let separator = "-";

    let newstring = `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`;
    console.log(newstring);
    this.state = {
      name: "",
      amount: 0,
      category: "",
      date: newstring,
      description: "",
      user: props.username,
      allcategories: [],
      displayText: "",
    };
    this.selectedCat = "Choose an Option";
    this.categories = ["Food", "Utilites", "Commute", "Entertainment"];

    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentWillMount() {
    fetch("http://127.0.0.1:8000/category_data", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        username: this.state.user,
      }),
    })
      .then((response) => response.json())
      .then((resData) => {
        let tableContents = [];
        var i;
        for (i = 0; i < resData.length; i++) {
          tableContents.push(resData[i].category);
        }
        this.setState({ allcategories: tableContents });
        console.log(this.state.allcategories);
      });
  }

  handleClick(event) {
    this.props.callbackFromParent(true);
  }

  conditionalCSS() {
    var index = 0;
    Object.keys(this.state).map((i) => {
      if (index <= 3) {
        if (this.state[i] === "" || this.state[i] === 0.0) {
          document.getElementById(i).style.color = "red";
        }
      }
      index = index + 1;
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (
      this.state.name === "" ||
      this.state.amount === 0.0 ||
      this.state.category === ""
    ) {
      this.setState({ displayText: "Empty Fields" }, () => {
        this.conditionalCSS();
      });

      return;
    }

    event.preventDefault();
    // fetch('http://friendly-eds-52406.herokuapp.com/add_user',{
    fetch("http://127.0.0.1:8000/expense_submit", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: this.state.name,
        amount: this.state.amount,
        date_of_expense: this.state.date,
        category: this.state.category,
        description: this.state.description,
        user: this.state.user,
      }),
    })
      .then((response) => response.text())
      .then((responseText) => {
        console.log(responseText);
        this.refs.stat.refresh(this.state.amount);
        this.props.informUpdate(
          this.state.amount,
          this.state.date,
          this.state.category
        );
      });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState(
      {
        [name]: value,
      },
      () => (document.getElementById(name).style.color = "black")
    );
  }

  handleSelect(eventKey) {
    this.setState(
      {
        category: eventKey,
      },
      () => (document.getElementById("category").style.color = "black")
    );
    this.selectedCat = eventKey;
  }

  render() {
    return (
      <div>
        <form
          style={{
            width: "80vw",
            maxWidth: "700px",
            //border: "1px solid black",
          }}
          onSubmit={this.handleSubmit}
        >
          <Stats ref="stat" user={this.state.user} />
          <h3 style={{ display: "flex", justifyContent: "center" }}>
            Key in your new expense
          </h3>
          <label
            className="lh-copy white f5 center"
            style={{
              display: "flex",
              justifyContent: "center",
              textTransform: "uppercase",
            }}
          >
            {this.state.displayText}
          </label>
          <div className="form-group">
            <label id="name">Name</label>
            <input
              type="text"
              name="name"
              className="form-control form-rounded"
              placeholder="Enter Expense"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label id="amount">Amount</label>
            <input
              type="number"
              step="0.01"
              name="amount"
              className="form-control form-rounded"
              placeholder="Enter amount"
              value={this.state.amount}
              onChange={this.handleChange}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexdirection: "row",
              justifyContent: "space-around",
            }}
          >
            <div className="form-group" style={{ width: "100%" }}>
              <label id="date" for="date">
                Date of Expenditure:{" "}
              </label>
              <br />
              <input
                type="date"
                id="date"
                className="form-control form-rounded"
                name="date"
                value={this.state.date}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group" style={{ width: "100%" }}>
              <label id="category">Purchase Category</label>
              <div
                style={{
                  display: "flex",
                  flexdirection: "row",
                }}
              >
                <Dropdown
                  name="category"
                  value={this.state.category}
                  onSelect={this.handleSelect}
                  style={{
                    flex: 10,
                  }}
                >
                  <Dropdown.Toggle
                    style={{
                      width: "100%",
                      color: "black",
                      background: "#fcda4f",
                      border: "#fcda4f",
                    }}
                    variant="primary"
                    id="dropdown-basic"
                    className="form-rounded"
                  >
                    {this.selectedCat}
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ width: "100%" }}>
                    {this.state.allcategories.map((cat) => (
                      <Dropdown.Item eventKey={cat}>{cat}</Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <button
                  type="button"
                  class="btn btn-warning form-rounded"
                  onClick={this.handleClick}
                  style={{
                    background: "#fcda4f",
                    border: "#fcda4f",
                    display: "flex",
                    width: "100%",
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label id="description">Description</label>
            <textarea
              type="text"
              name="description"
              className="form-control form-rounded"
              placeholder="Enter description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>

          <button
            style={{ background: "#fcda4f", color: "black", border: "#fcda4f" }}
            type="submit"
            className="btn btn-primary btn-block form-rounded"
            onSubmit={this.handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default AddExpense;
