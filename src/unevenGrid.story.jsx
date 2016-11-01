
import React from 'react';
import { IntlProvider } from 'react-intl';
import UnevenGrid from './UnevenGrid';
import { storiesOf } from '@kadira/storybook';

storiesOf('UnevenGrid', module)
	.addDecorator(story => {
		const locale = 'en-US';
		return (
			<IntlProvider locale={locale}>
				{story()}
			</IntlProvider>
		);
	})
	.add('default', () => <UnevenGrid />);
