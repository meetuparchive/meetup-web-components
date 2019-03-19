import PropTypes from 'prop-types';
import React from 'react';

import { TogglePill as SwarmUITogglePill } from '@meetup/swarm-components';

// import Icon from '../media/Icon';

export const TOGGLE_PILL_CLASS = 'toggleButton';

/**
 * Toggle Pill component
 * @see {@link https://github.com/meetup/sassquatch2/blob/develop/sass/ui-components/_toggle-pill.scss}
 * @see {@link http://meetup.github.io/sassquatch2/ui_components.html#togglePills}
 * @module TogglePill
 */
export class TogglePill extends React.PureComponent {
	render() {
		const { isActive, useRadio, onChange, ...other } = this.props;

		const inputType = useRadio ? 'radio' : 'checkbox';

		console.log(isActive, onChange, inputType, other);

		return (
			<SwarmUITogglePill checked={isActive} onChange={onChange}>
				{this.props.children}
			</SwarmUITogglePill>
		);
	}
}

// const topicChildren = isActive => (
// 	<Icon
// 		className={cx('toggleButton-icon', {
// 			'toggleButton-icon--active': isActive,
// 			'toggleButton-icon--inactive': !isActive,
// 		})}
// 		shape={isActive ? 'heart' : 'heart-outline'}
// 		size="xxs"
// 		label="Active Topic Icon"
// 	/>
// );
// // ---

/* <input
	className="toggleButton-input visibility--a11yHide"
	type={inputType}
	id={id}
	name={name}
	value={value}
	checked={isActive}
	onChange={toggleActive}
	onKeyUp={onKeyUp}
	tabIndex={tabIndex}
	{...other}
/>
<label className={labelClassNames} htmlFor={id}>
	{children}
	{topic ? topicChildren(isActive) : null}
</label> */

TogglePill.propTypes = {
	/** Adds an `id` attribute to the input, and associates it with the `<label />` */
	id: PropTypes.string.isRequired,

	/** The `name` attribute for the input */
	name: PropTypes.string.isRequired,

	/** The `value` attribute for the input */
	value: PropTypes.string.isRequired,

	children: PropTypes.node.isRequired,

	/** Whether the pill is toggled on/selected */
	isActive: PropTypes.bool,

	/** Whether to use input[type="radio"] to limit the selection to one toggle pill in a group */
	useRadio: PropTypes.bool,

	/** Whether the pill should be rendered in a way that visually indicates it's a topic */
	topic: PropTypes.bool,
};

TogglePill.defaultProps = {
	isActive: false,
};

export default TogglePill;
