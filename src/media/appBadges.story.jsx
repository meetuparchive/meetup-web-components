import React from 'react';
import { storiesOf } from '@storybook/react';

import { decorateWithLocale } from '../utils/decorators';
import AppBadges from './AppBadges';

storiesOf('AppBadges', module)
	.addDecorator(decorateWithLocale)
	.add('default', () => <AppBadges language="en" />);
