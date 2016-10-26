
import React from 'react';
import EmptyState from './EmptyState';
import { storiesOf } from '@kadira/storybook';

storiesOf('EmptyState', module)
	.add('default', () => <EmptyState />);
