import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Inverted } from './utils/storyComponents';
import { decorateWithLocale } from './utils/decorators';
import { InfoWrapper } from './utils/storyComponents';
import DateDisplay from './DateDisplay';

storiesOf('DateDisplay', module)
	.addDecorator(decorateWithLocale)
	.addWithInfo(
		'default',
		'This is the basic usage with the component.',
		() => (
			<InfoWrapper>
				<DateDisplay datetime={new Date()} />
			</InfoWrapper>
		)
	)
	.add('Inverted', () => <Inverted><DateDisplay datetime={new Date()} /></Inverted>);

