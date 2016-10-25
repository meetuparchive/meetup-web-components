
import React from 'react';
import { IntlProvider } from 'react-intl'
import HScroll from './HScroll';
import { storiesOf } from '@kadira/storybook';

storiesOf('HScroll', module)
	.addDecorator(story => {
		const locale = 'en-US';
		return (
			<IntlProvider locale={locale}>
				{story()}
			</IntlProvider>
		);
	})
	.add('default', () => <HScroll />)
