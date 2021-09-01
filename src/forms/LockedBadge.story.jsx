import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { decorateWithBasics, decorateWithInfo } from '../utils/decorators';

import LockedBadge from './LockedBadge';

const callbackAction = () => action('Click event');

storiesOf('Forms/LockedBadge', module)
	.addDecorator(decorateWithBasics)
	.addDecorator(decorateWithInfo)
	.add('Default', () => <LockedBadge label="My badge" onClick={callbackAction()} />)
	.add('Neutral', () => (
		<LockedBadge variant="neutral" label="My badge" onClick={callbackAction()} />
	));
