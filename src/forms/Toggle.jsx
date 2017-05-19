import React from 'react';
import cx from 'classnames';
import Icon from '../media/Icon';

export const TOGGLE_CLASS = 'toggle';
export const TOGGLE_PILL_CLASS = 'toggleButton';

/**
 * SQ2 Toggle Pill component
 * @see {@link https://github.com/meetup/sassquatch2/blob/develop/sass/ui-components/_toggle-pill.scss}
 * @see {@link http://meetup.github.io/sassquatch2/ui_components.html#togglePills}
 * @module TogglePill
 */
export default class Toggle extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isChecked: props.isChecked || false
		};
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({ isChecked: e.target.checked });

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
			isChecked, // eslint-disable-line no-unused-vars
			onChange, // eslint-disable-line no-unused-vars
			topic,
			reset,
			activeClass,
			inactiveClass,
			...other
		} = this.props;

		delete other.onChange; // onChange is consumed in this.onChange - do not pass it along to children

		let {
			activeIconShape,
			inactiveIconShape
		} = this.props;

		const classNames = cx(
			TOGGLE_CLASS,
			{
				[TOGGLE_PILL_CLASS] : !reset,
				[activeClass] : activeClass && this.state.isChecked,
				[inactiveClass] : inactiveClass && (!this.state.isChecked),
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
			<div className={classNames}>
				<input
					className='toggle-input visibility--a11yHide'
					type='checkbox'
					id={id}
					name={name}
					value={value}
					checked={this.state.isChecked}
					onChange={this.onChange}
					/>
				<label
					className='toggle-label'
					htmlFor={id}>
						{(inactiveIconShape && !reset) ? iconComponent : null}
						{children}
				</label>
			</div>
		);
	}
}

Toggle.protoTypes = {
	id: React.PropTypes.string.isRequired,
	name: React.PropTypes.string.isRequired,
	value: React.PropTypes.string.isRequired,
	children: React.PropTypes.node.isRequired,
	onChange: React.PropTypes.func,
	reset: React.PropTypes.bool,
	activeClass: React.PropTypes.string,
	inactiveClass: React.PropTypes.string,
	activeIconShape: React.PropTypes.string,
	inactiveIconShape: React.PropTypes.string,
	topic: React.PropTypes.bool
};
Toggle.defaultProps = {
	activeClass: 'toggle--active',
	inactiveClass: 'toggle--inactive',
};

