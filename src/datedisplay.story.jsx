import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Inverted } from './utils/storyComponents';
import { decorateWithLocale } from './utils/decorators';
import DateDisplay from './DateDisplay';


storiesOf('DateDisplay', module)
	.addDecorator(decorateWithLocale)
	.add('Simple', () => <DateDisplay datetime={new Date()} />)
	.add('Inverted', () => <Inverted><DateDisplay datetime={new Date()} /></Inverted>);

