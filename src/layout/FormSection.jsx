// @flow
import React from 'react';
import cx from 'classnames';

import Card from './Card';
import Bounds from './Bounds';
import Section from './Section';

/**
 * Wrapping component to standardize the structure of form sections.
 * @module FormSection
 * @param {object} props React props
 * @return {React.element} Form section wrapping component
 */

type Props = {
	/** Whether the inner `<Section />` has a separator (extra spacing and a border on the bottom) */
	withSeparator?: boolean,

	/** Whether the component is in a loading state */
	isLoading?: boolean,

	/** Props to pass to the `<Loading />` component */
	loadingProps?: {
		color?: string,
		scrimColor?: string,
		size?: MediaSizes,
	},
	/** The child elements of the component */
	children: React$Node,

	/** Nearest DOM element's class name */
	className?: string,
};
function FormSection({
	className,
	children,
	withSeparator,
	loadingProps = {}, // eslint-disable-line no-unused-vars
	isLoading,
}: Props) {
	return (
		<Section hasSeparator={withSeparator} className={cx(className, 'border--none')}>
			<Card
				initialHeight
				flushUntil="large"
				isLoading={isLoading}
				loadingProps={loadingProps}
			>
				<Bounds narrow>
					<Section hasSeparator className="border--none padding--top">
						{children}
					</Section>
				</Bounds>
			</Card>
		</Section>
	);
}

export default FormSection;
