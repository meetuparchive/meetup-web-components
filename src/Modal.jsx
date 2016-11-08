import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router';
import Icon from './Icon';
/**
 * @module Modal
 */
class Modal extends React.Component {

	static get contextTypes() {
		return {
			router: React.PropTypes.object,
		};
	}

	constructor(props){
		super(props);
		this._handleOutClick = this._handleOutClick.bind(this);
	}

	_handleOutClick(event){
		event.stopPropagation();
		// TODO:
		// detect if this should actually jump back in history instead of pushing forward
		// click should drop you to the underlying layer, but that's not always where you came from
		this.context.router.push(this.props.closeUrl);
	}

	render() {
		const {
			children,
			className,
			fullScreen,
			...other
		} = this.props;

		const classNames = cx(
			'modal',
			{'view--modalFull': fullScreen},
			className
		);

		return (
			<div
				className={classNames}
				{...other}>
				<div className='overlayShim' onClick={this._handleOutClick}>
					<div className='overlayShim-content inverted'>
					</div>
				</div>
				<div className='view view--modalSnap' >
					<div className='padding--all'>
						<Link to={this.props.closeUrl}>
							<Icon shape='close' size='s' />
						</Link>
					</div>
					{children}
				</div>
			</div>
		);
	}
}

Modal.propTypes = {
	full: React.PropTypes.bool
};

export default Modal;
