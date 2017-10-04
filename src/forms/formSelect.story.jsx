import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { decorateWithLocale } from '../utils/decorators';
import { InfoWrapper } from '../utils/storyComponents';
import Bounds from '../layout/Bounds';
import Section from '../layout/Section';
import FormSelect from './FormSelect';

const onChange = e => {
	action(`The value of the option clicked is: ${e.target.value}`)(e);
};

storiesOf('FormSelect', module)
	.addDecorator(decorateWithLocale)
	.addWithInfo(
		'default',
		'This is the basic usage with the component.',
		() => (
			<InfoWrapper>
				<Bounds><Section>
					<FormSelect
						label='Countries'
						id='countriesSelect'
						name='formSelectCountries'
						options={['Serbia', 'S. Korea', 'Johto']}
					/>
				</Section></Bounds>
			</InfoWrapper>
		)
	)
	.add('selected option', () =>
		(<Bounds><Section>
			<FormSelect
				label='Countries'
				id='countriesSelect'
				name='formSelectCountries'
				options={['Serbia', 'S. Korea', 'Johto']}
				selectedOption='Johto'
			/>
		</Section></Bounds>)
	)
	.add('error state', () =>
		(<Bounds><Section>
			<FormSelect
				label='Countries'
				id='countriesSelect'
				name='formSelectCountries'
				options={['Serbia', 'S. Korea', 'Johto']}
				error='Something went wrong.'
			/>
		</Section></Bounds>)
	)
	.add('required state', () =>
		(<Bounds><Section>
			<FormSelect
				label='Countries'
				id='countriesSelect'
				name='formSelectCountries'
				options={['Serbia', 'S. Korea', 'Johto']}
				error='This is required.'
				required
			/>
		</Section></Bounds>)
	)
	.add('disabled state', () =>
		(<Bounds><Section>
			<FormSelect
				label='Countries'
				id='countriesSelect'
				name='formSelectCountries'
				options={['Serbia', 'S. Korea', 'Johto']}
				disabled
			/>
		</Section></Bounds>)
	)
	.add('with onchange', () =>
		(<Bounds><Section>
			<FormSelect
				label='Countries'
				id='countriesSelect'
				name='formSelectCountries'
				options={['Serbia', 'S. Korea', 'Johto']}
				onChange={onChange}
			/>
		</Section></Bounds>)
	);

