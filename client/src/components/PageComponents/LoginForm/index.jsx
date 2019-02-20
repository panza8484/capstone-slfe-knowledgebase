import React, {Component} from 'react'

class LoginForm extends Component
{
	render() {
		return(
			<div id="login_container" className="navbar">
				<form>
					<label htmlFor="user">User:</label>
					<input type="text" id="user" name="user"/>
					<label htmlFor="password">Password:</label>
					<input type="text" id="password" name="password"/>
					<div id="login_bottom">
						<input type="submit" value="Login"/>
						<a href="#">Register</a>
					</div>
				</form>
			</div>
			
		);
	}
}

export default LoginForm
