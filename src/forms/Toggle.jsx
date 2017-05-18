import React from 'react';
import cx from 'classnames';

export const TOGGLE_CLASS = 'toggle';

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
			activeClass,
			inactiveClass,
			...other
		} = this.props;

		delete other.onChange; // onChange is consumed in this.onChange - do not pass it along to children

		const classNames = cx(
			TOGGLE_CLASS,
			{
				[activeClass] : activeClass && this.state.isChecked,
				[inactiveClass] : inactiveClass && (!this.state.isChecked),
			},
			className
		);

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
	activeClass: React.PropTypes.string,
	inactiveClass: React.PropTypes.string,
};
Toggle.defaultProps = {
	activeClass: 'toggle--active',
	inactiveClass: 'toggle--inactive',
};

