import React from 'react';
import { storiesOf } from '@storybook/react';

import { decorateWithBasics, decorateWithInfo } from '../utils/decorators';
import AppBadges from './AppBadges';
import withMatchMedia from '../utils/components/withMatchMedia';

const TestAppBadges = withMatchMedia(AppBadges);

storiesOf('Media/AppBadges', module)
	.addDecorator(decorateWithBasics)
	.addDecorator(decorateWithInfo)
	.add('default', () => <TestAppBadges language="en" />);
