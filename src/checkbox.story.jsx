
import React from 'react';

import Checkbox from './Checkbox';
import { storiesOf } from '@kadira/storybook';

storiesOf('Checkbox', module)
	.add('default', () => <Checkbox id='nada' name='no-name' checked={false} />)
	.add('with label', () => <Checkbox label='Ketchup' id='ketchup' checked={false} name='condiment' />)
	.add('checked', () => <Checkbox label='Mustard' checked id='mustard' name='condiment' />);
