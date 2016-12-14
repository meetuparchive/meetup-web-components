
import React from 'react';
import { IntlProvider } from 'react-intl';
import Section from './Section';
import { storiesOf } from '@kadira/storybook';

storiesOf('Section', module)
	.addDecorator(story => {
		const locale = 'en-US';
		return (
			<IntlProvider locale={locale}>
				{story()}
			</IntlProvider>
		);
	})
	.add('default', () => <Section />);
