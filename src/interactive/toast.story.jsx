
import React from 'react';
import Toast from './Toast';
import { storiesOf } from '@kadira/storybook';

storiesOf('Toast', module)
	.add('default', () => <Toast />);
