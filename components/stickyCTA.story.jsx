
import React from 'react';
import { IntlProvider } from 'react-intl'
import StickyCTA from './StickyCTA';
import { storiesOf } from '@kadira/storybook';

storiesOf('StickyCTA', module)
	.addDecorator(story => {
		const locale = 'en-US';
		return (
			<IntlProvider locale={locale}>
				{story()}
			</IntlProvider>
		);
	})
	.add('default', () => <StickyCTA />)
