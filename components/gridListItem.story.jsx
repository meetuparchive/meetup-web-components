
import React from 'react';
import { IntlProvider } from 'react-intl'
import GridListItem from './GridListItem';
import { storiesOf } from '@kadira/storybook';

storiesOf('GridListItem', module)
	.addDecorator(story => {
		const locale = 'en-US';
		return (
			<IntlProvider locale={locale}>
				{story()}
			</IntlProvider>
		);
	})
	.add('default', () => <GridListItem />)
