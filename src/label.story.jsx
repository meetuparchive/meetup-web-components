
import React from 'react';
import Label from './Label';
import { storiesOf } from '@kadira/storybook';

storiesOf('Label', module)
	.add('default', () => <Label text='Your name' inputId='someInputId' />)
	.add('with for attr', () => <Label text='Your name' inputId='yourNameInput' />)
	.add('required', () => <Label text='Your name' isRequired='true' />);
