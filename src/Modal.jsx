import React from 'react';
import cx from 'classnames';

/**
 * @module Modal
 */
class Modal extends React.Component {
	render() {
		const {
			children,
			className,
			...other
		} = this.props;

		const classNames = cx(
			'modal',
			className
		);

		return (
			<div
				className={classNames}
				{...other}>
				<div className='overlayShim'>
					<div className='overlayShim-content inverted'>
					</div>
				</div>
				<div className='view view--modalSnap' >
					{children}
				</div>
			</div>
		);
	}
}

Modal.propTypes = {
};

export default Modal;
