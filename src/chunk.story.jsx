
import React from 'react';

import Chunk from './Chunk';
import { storiesOf } from '@kadira/storybook';

storiesOf('Chunk', module)
	.add('default', () => <Chunk />);
