import React, {Component} from 'react'
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { addUserFunc } from "../../../actions/userActions";


class RegisterForm extends Component
{
	constructor(props) {
		super(props);
		this.onChangeFirstName = this.onChangeFirstName.bind(this);
		this.onChangeLastName = this.onChangeLastName.bind(this);
		this.onChangeEmailAddress = this.onChangeEmailAddress.bind(this);
		this.onChangeUserName = this.onChangeUserName.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.onChangeRole = this.onChangeRole.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			first_name: '',
			last_name: '',
			email_address: '',
			username: '',
			password: '',
			position: 'None',
			biography: 'None',
			organization: 'None',
			contributions: [],
			role: 'Member'
		}
	}

	onChangeFirstName(e) {
		this.setState({
			first_name: e.target.value
		});
	}

	onChangeLastName(e) {
		this.setState({
			last_name: e.target.value
		});
	}

	onChangeEmailAddress(e) {
		this.setState({
			email_address: e.target.value
		});
	}

	onChangeUserName(e) {
		this.setState({
			username: e.target.value
		});
	}

	onChangePassword(e) {
		this.setState({
			password: e.target.value
		});
	}

	onChangeRole(e) {
		this.setState({
			role: e.target.value
		})
	}

	onSubmit(e) {
		e.preventDefault();
		const apiCall = this.props.addUserFunc(this.state);
		apiCall.then(data => {
			this.props.history.push('/login');
		});
	}

	render() {
		return(
			<div id="register_form" className="form_input">
				<div className="signup-form">
					<form onSubmit={this.onSubmit}>
						<h2>Register</h2>
						<p className="lead">Please fill out this form to create your account.</p>
						<div className="form-group">
							<div className="input-group">
								<span className="input-group-addon">
									<i className="fa fa-user"/>
								</span>
								<input
									type="text"
									className="form-control"
									name="firstname"
									placeholder="First Name"
									required="required"
									onChange={this.onChangeFirstName}
								/>
							</div>
						</div>
						<div className="form-group">
							<div className="input-group">
								<span className="input-group-addon">
									<i className="fa fa-user"/>
								</span>
								<input
									type="text"
									className="form-control"
									name="lastname"
									placeholder="Last Name"
									required="required"
									onChange={this.onChangeLastName}
								/>
							</div>
						</div>
						<div className="form-group">
							<div className="input-group">
								<span className="input-group-addon">
									<i className="fa fa-user"/>
								</span>
								<input
									type="text"
									className="form-control"
									name="username"
									placeholder="Username"
									required="required"
									onChange={this.onChangeUserName}
								/>
							</div>
						</div>
						<div className="form-group">
							<div className="input-group">
								<span className="input-group-addon">
									<i className="fa fa-user"/>
								</span>
								<select onChange={this.onChangeRole} required="required" class="form-control">
									<option value="Member">Member</option>
									<option value="Contributor">Contributor</option>
									<option value="Reviewer">Reviewer</option>
								</select>
							</div>
						</div>
						<div className="form-group">
							<div className="input-group">
								<span className="input-group-addon">
									<i className="fa fa-paper-plane"/>
								</span>
								<input
									type="email"
									className="form-control"
									name="email_address"
									placeholder="Email Address"
									required="required"
									onChange={this.onChangeEmailAddress}
								/>
							</div>
						</div>
						<div className="form-group">
							<div className="input-group">
								<span className="input-group-addon">
									<i className="fa fa-lock"/>
								</span>
								<input
									type="password"
									className="form-control"
									name="password"
									placeholder="Password"
									required="required"
									onChange={this.onChangePassword}
								/>
							</div>
						</div>
						<div className="form-group">
							<div className="input-group">
								<span className="input-group-addon">
									<i className="fa fa-lock"/>
									<i className="fa fa-check"/>
								</span>
								<input
									type="password"
									className="form-control"
									name="confirm_password"
									placeholder="Confirm Password"
									required="required"
								/>
							</div>
						</div>
						<div className="form-group">
							<button
								type="submit"
								className="btn btn-primary btn-block btn-lg">
									Register
							</button>
						</div>
						<p className="small text-center">
							By clicking the Register button, you agree to our
							<a href="terms_of_service"> Terms &amp; Conditions</a>, and <a href="privacy">Privacy Policy</a>.
						</p>
					</form>
					<div className="text-center">
						Already have an account? <a href="/login">Login here</a>.
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
  user: state.user
});

export default withRouter(connect(mapStateToProps, {addUserFunc})(RegisterForm))
