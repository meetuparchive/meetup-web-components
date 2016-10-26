
import React from 'react';
import { IntlProvider } from 'react-intl';
import AlbumGrid from './AlbumGrid';
import { storiesOf } from '@kadira/storybook';

storiesOf('AlbumGrid', module)
	.addDecorator(story => {
		const locale = 'en-US';
		return (
			<IntlProvider locale={locale}>
				{story()}
			</IntlProvider>
		);
	})
	.add('default', () => <AlbumGrid />);
