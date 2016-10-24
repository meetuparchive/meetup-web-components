import React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@kadira/storybook';
import { Inverted } from '../utils/storyComponents';
import DateDisplay from './DateDisplay';


storiesOf('DateDisplay', module)
	.addDecorator(story => {
		return (
			<IntlProvider locale='en'>
				{story()}
			</IntlProvider>
		);
	})
	.add('Simple', () => <DateDisplay datetime={new Date()} />)
	.add('Inverted', () => <Inverted><DateDisplay datetime={new Date()} /></Inverted>);

