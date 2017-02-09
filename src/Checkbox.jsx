import React from 'react';
import cx from 'classnames';
import Flex from './Flex';
import FlexItem from './FlexItem';

/**
 * @module Checkbox
 */
class Checkbox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: props.checked
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
			label,
			name,
			value,
			...other
		} = this.props;

		const classNames = cx(
			'minTouchHeight',
			className
		);

		const id = `${name}-${value}`;

		return (
			<Flex align='center'
				className={classNames}
				{...other}>
				<FlexItem shrink>
					<input	type='checkbox'
						name={name}
						value={value}
						checked={this.state.checked}
						id={id}
						onChange={this.onChange}
					/>
				</FlexItem>
				<FlexItem>
					<label className='label--minor' htmlFor={id}>{label}</label>
					{children}
				</FlexItem>
			</Flex>
		);
	}
}

Checkbox.propTypes = {
	checked: React.PropTypes.bool,
	id: React.PropTypes.string.isRequired,
	label: React.PropTypes.string,
	name: React.PropTypes.string.isRequired
};

export default Checkbox;
