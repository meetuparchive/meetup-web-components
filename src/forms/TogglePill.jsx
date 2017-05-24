import React from 'react';
import cx from 'classnames';
import Icon from '../media/Icon';
import withToggleControl from '../utils/WithToggleControl';

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

		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.props.toggle();

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
			id,
			name,
			value,
			toggle, // eslint-disable-line no-unused-vars
			...other
		} = this.props;

		delete other.onChange; // onChange is consumed in this.onChange - do not pass it along to children

		const classNames = cx(
			TOGGLE_PILL_CLASS,
			{
				'toggleButton--topic': topic
			},
			className
		);

		// ---
		// Topic variant
		const topicClassName = cx(
			'toggleButton-icon',
			{
				'toggleButton-icon--active' : checked,
				'toggleButton-icon--inactive' : (!checked)
			}
		);

		const iconShape = checked ? 'heart' : 'heart-outline';

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
				<input
					className='toggleButton-input visibility--a11yHide'
					type='checkbox'
					id={id}
					name={name}
					value={value}
					checked={checked}
					onChange={this.onChange}
					{...other} />
				<label
					className='toggleButton-label'
					htmlFor={id}>
						{children}
						{(topic) ? topicChildren : null}
				</label>
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
	topic: React.PropTypes.bool
};
TogglePillBase.defaultProps = {
	checked: false
};

const TogglePill = withToggleControl(TogglePillBase, 'checked');
export default TogglePill;

