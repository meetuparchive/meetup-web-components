import React from 'react';
import cx from 'classnames';
import Icon from '../media/Icon';
import { withToggleControl } from '../utils/WithToggleControl';

export const TOGGLE_PILL_CLASS = 'toggleButton';

/**
 * SQ2 Toggle Pill component
 * @see {@link https://github.com/meetup/sassquatch2/blob/develop/sass/ui-components/_toggle-pill.scss}
 * @see {@link http://meetup.github.io/sassquatch2/ui_components.html#togglePills}
 * @module TogglePillBase
 */
class TogglePillBase extends React.Component {
	constructor (props) {
		super(props);

		// this.state = {isChecked: props.checked || false};

		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		// this.setState({isChecked: !this.state.isChecked});

		if (this.props.onChange) {
			this.props.onChange(e);
		}
	}

	render() {
		const {
			checked,
			children,
			className,
			topic,
			...other
		} = this.props;

		let {isChecked} = this.props;

		isChecked = checked;

		delete other.onChange; // onChange is consumed in this.onChange - do not pass it along to children

		const classNames = cx(
			TOGGLE_PILL_CLASS,
			{
				'toggleButton--topic': topic,
				'toggleButton--active': isChecked,
				'toggleButton--inactive': (!isChecked)
			},
			className
		);

		// ---
		// Topic variant
		const topicClassName = cx(
			'toggleButton-icon',
			{
				'toggleButton-icon--active' : isChecked,
				'toggleButton-icon--inactive' : (!isChecked)
			}
		);

		const iconShape = isChecked ? 'heart' : 'heart-outline';

		const topicChildren = (
			<Icon
				className={topicClassName}
				shape={iconShape}
				size='xs'
				label='Active Topic Pill Icon'/>
		);
		// ---

		return (
			<div className={classNames}>
				{children}
				{ (topic) ? topicChildren : null }
			</div>
		);
	}
}

TogglePillBase.protoTypes = {
	id: React.PropTypes.string.isRequired,
	name: React.PropTypes.string.isRequired,
	value: React.PropTypes.string.isRequired,
	children: React.PropTypes.node.isRequired,
	checked: React.PropTypes.bool,
	isChecked: React.PropTypes.bool,
	topic: React.PropTypes.bool
};
TogglePillBase.defaultProps = {
	isChecked: false
};

const TogglePill = withToggleControl(TogglePillBase);
export default TogglePill;

