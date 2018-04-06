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
function FormSection({ withSeparator, className, children }) {
	return (
		<Section hasSeparator={withSeparator} className={cx(className, 'border--none')}>
			<Card initialHeight flushUntil="large">
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
