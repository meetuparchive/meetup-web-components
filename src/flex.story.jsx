
import React from 'react';
import { IntlProvider } from 'react-intl';
import Flex from './Flex';
import { storiesOf } from '@kadira/storybook';

storiesOf('Flex', module)
	.addDecorator(story => {
		const locale = 'en-US';
		return (
			<IntlProvider locale={locale}>
				{story()}
			</IntlProvider>
		);
	})
	.add('default', () => <Flex />);
