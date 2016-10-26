
import React from 'react';
import { IntlProvider } from 'react-intl';
import FlexItem from './FlexItem';
import { storiesOf } from '@kadira/storybook';

storiesOf('FlexItem', module)
	.addDecorator(story => {
		const locale = 'en-US';
		return (
			<IntlProvider locale={locale}>
				{story()}
			</IntlProvider>
		);
	})
	.add('default', () => <FlexItem />);
