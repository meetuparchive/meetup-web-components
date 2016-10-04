import React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@kadira/storybook';
import { Inverted } from './util/storyComponents';
import TearSheet from './TearSheet';


storiesOf('TearSheet', module)
	.addDecorator(story => {
		return (
			<IntlProvider locale='en'>
				{story()}
			</IntlProvider>
		);
	})
	.add('Simple', () => <TearSheet datetime={new Date()} />)
	.add('Inverted', () => <Inverted><TearSheet datetime={new Date()} /></Inverted>);

