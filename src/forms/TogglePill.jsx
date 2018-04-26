import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import Icon from '../media/Icon';
import ToggleWrapper from '../utils/components/ToggleWrapper';

export const TOGGLE_PILL_CLASS = 'toggleButton';

/**
 * Toggle Pill component
 * @see {@link https://github.com/meetup/sassquatch2/blob/develop/sass/ui-components/_toggle-pill.scss}
 * @see {@link http://meetup.github.io/sassquatch2/ui_components.html#togglePills}
 * @module TogglePill
 */
class TogglePill extends React.PureComponent {
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
			onChange,
			...other
		} = this.props;

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

		const topicChildren = isActive => (
			<Icon
				className={cx(
					'toggleButton-icon',
					{
						'toggleButton-icon--active' : isActive,
						'toggleButton-icon--inactive' : (!isActive)
					}
				)}
				shape={isActive ? 'heart' : 'heart-outline'}
				size='xxs'
				label='Active Topic Icon'/>
		);
		// ---

		return (
			<ToggleWrapper
				type={inputType}
				isActive={isActive}
				onToggle={onChange}
			>
				{({
					tabIndex,
					isActive,
					toggleActive,
					onKeyUp,
				}) => (
					<div className={classNames}>
						<input
							className='toggleButton-input visibility--a11yHide'
							type={inputType}
							id={id}
							name={name}
							value={value}
							checked={isActive}
							onChange={toggleActive}
							onKeyUp={onKeyUp}
							tabIndex={tabIndex}
							{...other} />
						<label
							className={labelClassNames}
							htmlFor={id}>
							{children}
							{(topic) ? topicChildren(isActive) : null}
						</label>
					</div>
				)}
			</ToggleWrapper>
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

export default TogglePill;

