
import React from 'react';
import { IntlProvider } from 'react-intl'
import Tabs from './Tabs';
import { storiesOf } from '@kadira/storybook';

storiesOf('Tabs', module)
	.addDecorator(story => {
		const locale = 'en-US';
		return (
			<IntlProvider locale={locale}>
				{story()}
			</IntlProvider>
		);
	})
	.add('default', () => <Tabs />)
