import React from 'react';
import cx from 'classnames';
import Icon from './Icon';

export const TOGGLE_PILL_CLASS = 'toggleButton';

/**
 * SQ2 Toggle Pill component
 * @see {@link https://github.com/meetup/sassquatch2/blob/develop/sass/ui-components/_toggle-pill.scss}
 * @see {@link http://meetup.github.io/sassquatch2/ui_components.html#togglePills}
 * @module TogglePill
 */
export default class TogglePill extends React.Component {
	constructor (props) {
		super(props);

		this.state = {isChecked: props.checked || false};

		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({isChecked: !this.state.isChecked});

		if (this.props.onChange) {
			this.props.onChange(e);
		}
	}

	render() {
		const {
			id,
			name,
			value,
			children,
			className,
			topic,
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
				'toggleButton-icon--active' : this.state.isChecked,
				'toggleButton-icon--inactive' : (!this.state.isChecked)
			}
		);

		const topicShape = (this.state.isChecked) ? 'heart' : 'heart-outline';

		const topicChildren = (
			<Icon
				className={topicClassName}
				shape={topicShape}
				size='xs'
				label='Active Topic Pill Icon'/>
		);
		// ---

		return (
			<div className={classNames}>
				<input
					className='toggleButton-input'
					type='checkbox'
					id={id}
					name={name}
					value={value}
					checked={this.state.isChecked}
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

TogglePill.protoTypes = {
	id: React.PropTypes.string.isRequired,
	name: React.PropTypes.string.isRequired,
	value: React.PropTypes.string.isRequired,
	children: React.PropTypes.node.isRequired,
	checked: React.PropTypes.bool,
	topic: React.PropTypes.bool
};
TogglePill.defaultProps = {
	checked: false
};

