import React from 'react';
import { storiesOf } from '@storybook/react';

import { decorateWithBasics, decorateWithInfo } from '../utils/decorators';
import AppBadges from './AppBadges';

storiesOf('AppBadges', module)
	.addDecorator(decorateWithBasics)
	.addDecorator(decorateWithInfo)
	.add('default', () => <AppBadges language="en" />);
