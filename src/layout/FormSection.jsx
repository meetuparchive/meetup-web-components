import PropTypes from 'prop-types';
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
function FormSection({
	className,
	children,
	withSeparator,
	loadingProps = {}, // eslint-disable-line no-unused-vars
	isLoading,
}) {
	return (
		<Section
			hasSeparator={withSeparator}
			className={cx(className, 'border--none')}
		>
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

FormSection.propTypes = {
	/** Whether the inner `<Section />` has a separator (extra spacing and a border on the bottom) */
	withSeparator: PropTypes.bool,

	/** Whether the component is in a loading state */
	isLoading: PropTypes.bool,

	/** Props to pass to the `<Loading />` component */
	loadingProps: PropTypes.shape({
		color: PropTypes.string,
		scrimColor: PropTypes.string,
		size: PropTypes.string,
	}),
};

export default FormSection;
