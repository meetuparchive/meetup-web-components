import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';

/**
 * @module Checkbox
 */
class Checkbox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: props.checked || false
		};
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({ checked: e.target.checked });
	}

	render() {
		const {
			checked, // eslint-disable-line no-unused-vars
			children,
			className,
			labelClassName,
			id,
			label,
			name,
			value,
			...other
		} = this.props;

		const classNames = cx(
			'minTouchHeight',
			className
		);

		const labelClassNames = cx(
			'label--minor',
			labelClassName
		);

		const elId = id || `${name}-${value}`;

		return (
			<Flex align='center'
				className={classNames}
				{...other}>
				<FlexItem shrink>
					<input	type='checkbox'
						name={name}
						value={value}
						checked={this.state.checked}
						id={elId}
						onChange={this.onChange}
					/>
				</FlexItem>
				<FlexItem>
					<label className={labelClassNames} htmlFor={elId}>{label}</label>
					{children}
				</FlexItem>
			</Flex>
		);
	}
}

Checkbox.propTypes = {
	checked: PropTypes.bool,
	label: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	labelClassName: PropTypes.string,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired
};

export default Checkbox;
