import React from 'react';
import cx from 'classnames';

import {
	// Bounds,
	// Chunk,
	Flex,
	FlexItem,
	// PageHead,
	// PageTitle,
	// PageActions,
	// PageAction,
	// PageActionButton,
	// / Section,
	// SectionTitle,
	// / Stripe
} from './layoutUtils';

/**
 * @module Checkbox
 */
class Checkbox extends React.Component {
	render() {
		const {
			checked,
			children,
			className,
			label,
			name,
			value,
			...other
		} = this.props;

		const classNames = cx(
			'checkboxComponent',
			className
		);

		const id = `${name}-${value}`;

		return (
			<Flex
				className={classNames}
				{...other}>
				<FlexItem shrink>
					<input type='checkbox' name={name} value={value} checked={checked} id={id} />
				</FlexItem>
				<FlexItem>
					<label className='label--minor' for={id}>{label}</label>
					{children}
				</FlexItem>
			</Flex>
		);
	}
}

Checkbox.propTypes = {
};

export default Checkbox;
