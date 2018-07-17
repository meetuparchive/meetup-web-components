import React from 'react';
import { storiesOf } from '@storybook/react';
import { decorateWithBasics, decorateWithInfo } from '../utils/decorators';
import Bounds from '../layout/Bounds';
import Section from '../layout/Section';
import { Textarea } from './Textarea';

storiesOf('Textarea', module)
	.addDecorator(decorateWithBasics)
	.addDecorator(decorateWithInfo)
	.addParameters({ info: { propTables: [Textarea], propTablesExclude: [Bounds, Section] } })
	.add('default', () => (
		<Bounds>
			<Section>
				<Textarea
					label="Your biography"
					id="yourBio"
					name="bio"
					placeholder="Tell me about your life"
				/>
			</Section>
		</Bounds>
	))
	.add(
		'auto resizing',
		() => (
			<Bounds>
				<Section>
					<Textarea
						autosize
						label="Your biography"
						id="yourBio"
						name="bio"
						placeholder="Tell me about your life"
					/>
				</Section>
			</Bounds>
		),
		{
			info: {
				text:
					'Usage example where the textarea expands depending on the inner content',
			},
		}
	)
	.add(
		'min and max height',
		() => (
			<Bounds>
				<Section>
					<Textarea
						minHeight={100}
						maxHeight={300}
						label="Your biography"
						id="yourBio"
						name="bio"
						placeholder="Tell me about your life"
					/>
				</Section>
			</Bounds>
		),
		{ info: { text: 'Usage example where the textarea has a min and max height' } }
	)
	.add(
		'set rows',
		() => (
			<Bounds>
				<Section>
					<Textarea
						rows={3}
						label="Your biography"
						id="yourBio"
						name="bio"
						placeholder="Tell me about your life"
					/>
				</Section>
			</Bounds>
		),
		{
			info: {
				text:
					'Usage example where the textarea height is set with the rows attribute',
			},
		}
	)
	.add('error state', () => (
		<Bounds>
			<Section>
				<Textarea
					label="Your biography"
					id="yourBio"
					name="bio"
					error="Not so fast. You have an error."
					placeholder="Tell me about your life"
					required
					requiredText="(required)"
				/>
			</Section>
		</Bounds>
	))
	.add('with helper text', () => (
		<Bounds>
			<Section>
				<Textarea
					label="Your biography"
					helperText="Lorem Ipsum is simply dummy text"
					id="yourBio"
					name="bio"
					placeholder="Tell me about your life"
				/>
			</Section>
		</Bounds>
	))
	.add('with character limit', () => (
		<Bounds>
			<Section>
				<Textarea
					maxLength={140}
					label="Your biography"
					id="yourBio"
					name="bio"
					placeholder="Tell me about your life"
				/>
			</Section>
		</Bounds>
	))
	.add('auto resizing with min and max height', () => (
		<Bounds>
			<Section>
				<Textarea
					autosize
					minHeight={100}
					maxHeight={300}
					label="Your biography"
					id="yourBio"
					name="bio"
					placeholder="Tell me about your life"
				/>
			</Section>
		</Bounds>
	))
	.add('auto resizing with rows set', () => (
		<Bounds>
			<Section>
				<Textarea
					autosize
					rows={4}
					label="Your biography"
					id="yourBio"
					name="bio"
					placeholder="Tell me about your life"
				/>
			</Section>
		</Bounds>
	));
