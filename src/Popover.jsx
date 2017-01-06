import React from 'react';
import cx from 'classnames';
import bindAll from './utils/bindAll';

class Popover extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		<div
			aria-haspopup='true'
			{...other}
		>
			{triggerRender}
			<nav>
				<ul
					role='menu'
					aria-hidden={!isActive}
				>
					{renderOptions}
				</ul>
			</nav>
		</div>
	}
}
Popover.propTypes = {
	trigger: React.PropTypes.element.isRequired,
	options: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
	className: React.PropTypes.string,
}
export default Popover;
