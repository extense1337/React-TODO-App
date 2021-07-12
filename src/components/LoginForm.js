import React from "react";
import "../style/loginForm.css";

class LoginForm extends React.Component {

    state = {
        username: '',
        password: '',
        isFailedLogIn: false
    }

    handleLoginClick = async (e) => {
        e.preventDefault();

        const username = this.state.username;
        const password = this.state.password;

        const requestUrl = `https://jsonplaceholder.typicode.com/users?username=${username}&website=${password}`;

        const responseResult = await fetch(requestUrl);
        const userJson = await responseResult.json();

        const {handleLoginClick} = this.props;
        const {setUserId} = this.props;
        if(userJson[0] !== undefined) {
            setUserId(userJson[0].id);
            handleLoginClick(true);
        }
        else {
            this.setState({ isFailedLogIn: true })
        }
    }

    handleUsernameChange = event => {
        this.setState({username: event.target.value});
    }
    handlePasswordChange = event => {
        this.setState({password: event.target.value});
    }

    render() {
        return (
            <div className="login">
                {this.state.isFailedLogIn? <div id="errorAuth">Invalid username or password</div> : null}
                <h1>Login</h1>
                <form method="post">
                    <input type="text" placeholder="Username" name="username" onChange={this.handleUsernameChange}/>
                    <input type="password" placeholder="Password" name="password" onChange={this.handlePasswordChange}/>
                    <button type="submit" className="btn btn-primary btn-block btn-large" onClick={this.handleLoginClick}>Let me in.</button>
                </form>
            </div>
        );
    }
}

export default LoginForm;
