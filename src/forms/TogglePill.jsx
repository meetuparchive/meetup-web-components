import React from 'react';
import cx from 'classnames';
import Toggle from './Toggle';
import Icon from '../media/Icon';

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

		this.state = {isChecked: props.isChecked || false};

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
			isChecked,
			onChange,
			...other
		} = this.props;

		let {
			activeIconShape,
			inactiveIconShape
		} = this.props;

		const classNames = cx(
			TOGGLE_PILL_CLASS,
			{
				'toggleButton--topic': topic
			},
			className
		);

		activeIconShape = topic ? 'plus' : activeIconShape;
		inactiveIconShape = topic ? 'minus' : inactiveIconShape;

		// ---
		// Icon variant
		const iconClassName = cx(
			'toggle-icon',
			{
				'toggle-icon--active' : this.state.isChecked,
				'toggle-icon--inactive' : (!this.state.isChecked)
			}
		);

		const iconShape = (this.state.isChecked) ? activeIconShape : inactiveIconShape;

		const iconComponent = (
			<Icon
				className={iconClassName}
				shape={iconShape}
				size='xs'
				label='Active Topic Pill Icon'/>
		);
		// ---

		return (
			<Toggle
				className={classNames}
				id={id}
				name={name}
				value={value}
				isChecked={isChecked}
				onChange={onChange}
				{...other}
				>
				{(inactiveIconShape) ? iconComponent : null}
				{children}
			</Toggle>
		);
	}
}

TogglePill.protoTypes = {
	id: React.PropTypes.string.isRequired,
	name: React.PropTypes.string.isRequired,
	value: React.PropTypes.string.isRequired,
	children: React.PropTypes.node.isRequired,
	isChecked: React.PropTypes.bool,
	onChange: React.PropTypes.func,
	topic: React.PropTypes.bool,
	activeIconShape: React.PropTypes.string,
	inactiveIconShape: React.PropTypes.string
};
TogglePill.defaultProps = {
};

