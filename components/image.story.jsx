
import React from 'react';
import { IntlProvider } from 'react-intl'
import Image from './Image';
import { storiesOf } from '@kadira/storybook';

storiesOf('Image', module)
	.addDecorator(story => {
		const locale = 'en-US';
		return (
			<IntlProvider locale={locale}>
				{story()}
			</IntlProvider>
		);
	})
	.add('default', () => <Image />)
