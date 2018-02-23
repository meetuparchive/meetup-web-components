import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import Icon from '../media/Icon';
import withToggleControl from '../utils/components/WithToggleControl';

export const TOGGLE_PILL_CLASS = 'toggleButton';

/**
 * Toggle Pill component
 * @see {@link https://github.com/meetup/sassquatch2/blob/develop/sass/ui-components/_toggle-pill.scss}
 * @see {@link http://meetup.github.io/sassquatch2/ui_components.html#togglePills}
 * @module TogglePill
 */
class TogglePill extends React.Component {
	constructor (props) {
		super(props);

		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.props.toggleActive();

		if (this.props.onChange) {
			this.props.onChange(e);
		}
	}

	render() {
		const {
			isActive,
			children,
			className,
			labelClassName,
			topic,
			id,
			large,
			name,
			useRadio,
			value,
			toggleActive, // eslint-disable-line no-unused-vars
			...other
		} = this.props;

		delete other.onChange; // onChange is consumed in this.onChange - do not pass it along to children

		const inputType = useRadio ? 'radio' : 'checkbox';

		const classNames = cx(
			TOGGLE_PILL_CLASS,
			{
				'toggleButton--topic': topic,
				'toggleButton--radio': useRadio
			},
			className
		);

		const labelClassNames = cx(
			'toggleButton-label',
			{
				'toggleButton-label--large': large
			},
			labelClassName
		);

		// ---
		// Topic variant
		const topicClassName = cx(
			'toggleButton-icon',
			{
				'toggleButton-icon--active' : isActive,
				'toggleButton-icon--inactive' : (!isActive)
			}
		);

		const iconShape = isActive ? 'heart' : 'heart-outline';

		const topicChildren = (
			<Icon
				className={topicClassName}
				shape={iconShape}
				size='xxs'
				label='Active Topic Icon'/>
		);
		// ---

		return (
			<div className={classNames}>
				<input
					className='toggleButton-input visibility--a11yHide'
					type={inputType}
					id={id}
					name={name}
					value={value}
					checked={isActive}
					onChange={this.onChange}
					tabIndex={-1}
					{...other} />
				<label
					className={labelClassNames}
					htmlFor={id}>
					{children}
					{(topic) ? topicChildren : null}
				</label>
			</div>
		);
	}
}

TogglePill.protoTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	isActive: PropTypes.bool,
	useRadio: PropTypes.bool,
	topic: PropTypes.bool,
	labelClassName: PropTypes.string,
};

TogglePill.defaultProps = {
	isActive: false
};

export default withToggleControl(TogglePill);

