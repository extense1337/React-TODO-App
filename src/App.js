import React from "react";
import LoginForm from "./components/LoginForm";
import TodoList from "./components/TodoList";

class App extends React.Component {

  state = {
    isLoggedIn: false,
    userId: null,
  };

  handleLoginClick = param => {
    this.setState({isLoggedIn: param});
  }
  setUserId = userId => {
    this.setState({userId})
  }

  render() {
    return (
        <div className="App">
          {this.state.isLoggedIn? <TodoList handleLoginClick={this.handleLoginClick} userId={this.state.userId} /> :
              <LoginForm handleLoginClick={this.handleLoginClick} setUserId={this.setUserId} />}
        </div>
    );
  }
}

export default App;
