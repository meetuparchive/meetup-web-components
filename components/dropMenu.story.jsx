
import React from 'react';
import { IntlProvider } from 'react-intl';
import DropMenu from './DropMenu';
import { storiesOf } from '@kadira/storybook';

storiesOf('DropMenu', module)
	.addDecorator(story => {
		const locale = 'en-US';
		return (
			<IntlProvider locale={locale}>
				{story()}
			</IntlProvider>
		);
	})
	.add('default', () => <DropMenu />);
