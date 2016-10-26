
import React from 'react';
import { IntlProvider } from 'react-intl';
import GridList from './GridList';
import { storiesOf } from '@kadira/storybook';

storiesOf('GridList', module)
	.addDecorator(story => {
		const locale = 'en-US';
		return (
			<IntlProvider locale={locale}>
				{story()}
			</IntlProvider>
		);
	})
	.add('default', () => <GridList />);
