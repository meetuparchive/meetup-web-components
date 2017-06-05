import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { decorateWithLocale } from '../utils/decorators';
import { InfoWrapper } from '../utils/storyComponents';
import Bounds from '../layout/Bounds';
import Section from '../layout/Section';
import Textarea from './Textarea';

storiesOf('Textarea', module)
	.addDecorator(decorateWithLocale)
	.addWithInfo(
		'default',
		'This is the basic usage with the component.',
		() => (
			<InfoWrapper>
				<Bounds><Section>
					<Textarea
						label='Your biography'
						id='yourBio'
						name='bio'
						placeholder='Tell me about your life'
					/>
				</Section></Bounds>
			</InfoWrapper>
		)
	)
	.add('error state', () =>
		(<Bounds><Section>
			<Textarea
				required
				label='Your biography'
				id='yourBio'
				name='bio'
				error='Not so fast. You have an error.'
				placeholder='Tell me about your life' />
		</Section></Bounds>)
	)
	.add('with character limit', () =>
		(<Bounds><Section>
			<Textarea
			maxLength={140}
			label='Your biography'
			id='yourBio'
			name='bio'
			placeholder='Tell me about your life' />
		</Section></Bounds>))
	.addWithInfo(
		'auto resizing',
		'Usage example where the textarea expands depending on the inner content',
		() => (
			<InfoWrapper>
				<Bounds><Section>
					<Textarea
						rows='auto'
						label='Your biography'
						id='yourBio'
						name='bio'
						placeholder='Tell me about your life' />
				</Section></Bounds>
			</InfoWrapper>
		)
	)
	.add('auto resizing with min and max height', () =>
		(<Bounds><Section>
			<Textarea
				rows='auto'
				minHeight={100}
				maxHeight={300}
				label='Your biography'
				id='yourBio'
				name='bio'
				placeholder='Tell me about your life' />
		</Section></Bounds>)
	)
	.addWithInfo(
		'min and max height',
		'Usage example where the textarea has a min and max height',
		() => (
			<InfoWrapper>
				<Bounds><Section>
					<Textarea
						minHeight={100}
						maxHeight={300}
						label='Your biography'
						id='yourBio'
						name='bio'
						placeholder='Tell me about your life' />
				</Section></Bounds>
			</InfoWrapper>
		)
	)
	.addWithInfo(
		'set rows',
		'Usage example where the textarea height is set with the rows attribute',
		() => (
			<InfoWrapper>
				<Bounds><Section>
					<Textarea
					rows={3}
					label='Your biography'
					id='yourBio'
					name='bio'
					placeholder='Tell me about your life' />
				</Section></Bounds>
			</InfoWrapper>
		)
	);
