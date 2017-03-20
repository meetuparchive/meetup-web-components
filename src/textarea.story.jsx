import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { decorateWithLocale } from './utils/decorators';
import { InfoWrapper } from './utils/storyComponents';
import Textarea from './Textarea';

storiesOf('Textarea', module)
	.addDecorator(decorateWithLocale)
	.addWithInfo(
		'default',
		'This is the basic usage with the component.',
		() => (
			<InfoWrapper>
				<Textarea
					label='Your biography'
					id='yourBio'
					name='bio'
					placeholder='Tell me about your life'
				/>
			</InfoWrapper>
		)
	)
	.add('error state', () => <Textarea
		required
		label='Your biography'
		id='yourBio'
		name='bio'
		error='Not so fast. You have an error.'
		placeholder='Tell me about your life' />)
	.add('with character limit', () => <Textarea
		maxLength={140}
		label='Your biography'
		id='yourBio'
		name='bio'
		placeholder='Tell me about your life' />)
	.add('auto resizing', () => <Textarea
		rows='auto'
		label='Your biography'
		id='yourBio'
		name='bio'
		placeholder='Tell me about your life' />)
	.add('auto resizing with min and max height', () => <Textarea
		rows='auto'
		minHeight={100}
		maxHeight={300}
		label='Your biography'
		id='yourBio'
		name='bio'
		placeholder='Tell me about your life' />)
	.add('min and max height', () => <Textarea
		minHeight={100}
		maxHeight={300}
		label='Your biography'
		id='yourBio'
		name='bio'
		placeholder='Tell me about your life' />)
	.add('set rows', () => <Textarea
		rows={3}
		label='Your biography'
		id='yourBio'
		name='bio'
		placeholder='Tell me about your life' />);
