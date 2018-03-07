import React from 'react';
import { storiesOf } from '@storybook/react';

import { decorateWithBasics } from '../utils/decorators';
import AppBadges from './AppBadges';

storiesOf('AppBadges', module)
	.addDecorator(decorateWithBasics)
	.add('default', () => <AppBadges language="en" />);
