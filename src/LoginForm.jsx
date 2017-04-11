import React from 'react';
import cx from 'classnames';

import Button from './forms/Button';

/**
 * A simple email+password login form that consumes a loginAction for onClick
 * @module LoginForm
 */
class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			password: '',
			email: props.email || '',
			disabled: props.disabled || false,
		};
		this.login = this.login.bind(this);
		this.onEmailChange = this.onEmailChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);
	}
	/**
	* When the component is re-set with new props passed in by the parent,
	* the disabled state will get removed unless explicitly set
	*/
	componentWillReceiveProps(nextProps) {
		this.setState({ disabled: nextProps.disabled || false });
	}
	onEmailChange(e) {
		this.setState({ email: e.target.value });
	}
	onPasswordChange(e) {
		this.setState({ password: e.target.value });
	}
	/**
	* the login action reads the password and email values _and disables the form_
	* so that you cannot double-submit
	*/
	login(e) {
		e.preventDefault();
		const { password, email } = this.state;
		this.props.loginAction({ password, email });
		this.setState({ disabled: true });  // always disable when submitting
	}
	render() {
		const {
			errors,
			...other
		} = this.props;
		delete other.loginAction;  // used in login handler only, do not forward
		const formClassName = 'loginForm';
		const emailClassName = cx(
			'loginForm-email',
			{
				'field--error': errors
			}
		);
		const passwordClassName = cx(
			'loginForm-password',
			{
				'field--error': errors
			}
		);
		return (
			<form
				className={formClassName}
				{...other}>
				{
					errors && errors.length ?
						<p className='text--error'>{errors.map(({ message }) => message)}</p> :
						null
				}
				<input
					className={emailClassName}
					type='text'
					role='textbox'
					placeholder='email'
					onChange={this.onEmailChange}
					disabled={this.state.disabled}
					aria-readonly={this.state.disabled}
					value={this.state.email}
				/>
				<input
					className={passwordClassName}
					type='password'
					role='textbox'
					placeholder='password'
					onChange={this.onPasswordChange}
					disabled={this.state.disabled}
					aria-readonly={this.state.disabled}
					value={this.state.password}
				/>
				<Button
					className='loginForm-submit'
					contrast
					fullWidth
					disabled={this.state.disabled}
					onClick={this.login}>
					Log in
				</Button>
			</form>
		);
	}
}
LoginForm.propTypes = {
	loginAction: React.PropTypes.func,
	error: React.PropTypes.instanceOf(Error),
	email: React.PropTypes.string,
};

export default LoginForm;
