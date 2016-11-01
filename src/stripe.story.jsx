
import React from 'react';

import Stripe from './Stripe';
import { storiesOf } from '@kadira/storybook';

storiesOf('Stripe', module)
	.add('default', () => <Stripe />);
