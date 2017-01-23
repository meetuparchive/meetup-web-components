
import React from 'react';
import TextField from './TextField';
import Button from './Button';
import { storiesOf } from '@kadira/storybook';


storiesOf('TextField', module)
	.add('default', () => <TextField
		label='Your name'
		elId='fullname'
		name='name'
		value=''
		placeholder='Not your email...' />)
	.add('has a value', () => <TextField
		label='Your name'
		elId='fullname'
		name='name'
		value='Phife Dawg'
		placeholder='Not your email...' />)
	.add('has a maxLength value', () => {
		const rules = {
			maxLength: 10,
			pattern:'.{5,10}'
		};
		return (<TextField
			label='Your name'
			elId='fullname'
			name='name'
			value='Thisisover10charslong'
			formAttrs={rules}
			placeholder='Not your email...' />);
	}).add('has a pattern for min length', () => {
		const rules = {
			pattern:'.{5,10}'
		};
		return (<form>
			<TextField
				label='Your name'
				elId='fullname'
				name='name'
				value='>5'
				formAttrs={rules}
				placeholder='Not your email...' />
			<Button
				contrast
				fullWidth>
				Submit
			</Button>
		</form>);
	}).add('is required', () => {
		const rules = {
			required: 'required'
		};
		return (<form>
			<TextField
				label='Your name'
				elId='fullname'
				name='name'
				value=''
				formAttrs={rules}
				placeholder='Not your email...' />
			<Button
				contrast
				fullWidth>
				Submit
			</Button>
		</form>);

	});

