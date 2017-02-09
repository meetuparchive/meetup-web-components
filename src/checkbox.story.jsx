
import React from 'react';

import Checkbox from './Checkbox';
import { storiesOf } from '@kadira/storybook';

storiesOf('Checkbox', module)
	.add('default', () => <Checkbox id='nada' name='no-name' value='nada' />)
	.add('with label', () => <Checkbox label='Ketchup' value='ketchup' name='condiment' />)
	.add('checked', () => <Checkbox label='Mustard' checked value='mustard' name='condiment' />)
	.add('in a set', () => {
		return (<div>
			<Checkbox label='Ketchup' name='condiment' value='ketchup' />
			<Checkbox label='Mustard' checked name='condiment' value='mustard' />
			<Checkbox label='Relish' checked name='relish' value='relish' />
		</div>);
	});
