import React from 'react';
import SelectInput from './SelectInput';
import { storiesOf } from '@storybook/react';
import {
	decorateWithLocale,
	decorateWithInfo,
} from '../utils/decorators';
import {
	IntlProvider,
	FormattedMessage,
	defineMessages,
} from 'react-intl';

storiesOf('SelectInput', module)
	.addDecorator(decorateWithLocale)
	.addDecorator(decorateWithInfo)
	.add('default', () =>
		(<SelectInput
			label='Select a name for your horse'
			id='horsename'
			name='horsename'
			options={[
				{ label: 'Geoffrey', value: 'geoffrey' },
				{ label: 'Doctor Horse, MD Junior', value: 'drhorse' },
				{ label: 'Mister Chompy', value: 'chompyhorse' }
			]}
		/>)
	)
	.add('with default selection', () =>
		(<SelectInput
			label='Select a name for your horse'
			id='horsename'
			name='horsename'
			value='drhorse'
			options={[
				{ label: 'Geoffrey', value: 'geoffrey' },
				{ label: 'Doctor Horse, MD Junior', value: 'drhorse' },
				{ label: 'Mister Chompy', value: 'chompyhorse' }
			]}
		/>)
	)
	.add('required', () =>
		(<SelectInput
			label='Select a name for your horse'
			id='horsename'
			name='horsename'
			options={[
				{ label: 'Geoffrey', value: 'geoffrey' },
				{ label: 'Doctor Horse, MD Junior', value: 'drhorse' },
				{ label: 'Mister Chompy', value: 'chompyhorse' }
			]}
			error='You forgot to name your horse!'
			required
			requiredText='(required)'
		/>)
	)
	.add('with disabled options', () =>
		(<SelectInput
			label='Select a name for your horse'
			id='horsename'
			name='horsename'
			required
			options={[
				{ label: 'Geoffrey', value: 'geoffrey', disabled: true },
				{ label: 'Doctor Horse, MD Junior', value: 'drhorse' },
				{ label: 'Mister Chompy', value: 'chompyhorse' }
			]}
		/>)
	)
	.add('error state formatted', () => {
		const trn = defineMessages({
			error: {
				defaultMessage: 'This error is a formatted message.',
				id: 'storybook.anError',
				description: { jira: 'SDS-204' },
			}
		});
		return (
			<IntlProvider defaultLocale='en-US' locale='en-US'>
				<SelectInput
					label='Select a name for your horse'
					id='horsename'
					name='horsename'
					required
					options={[
						{ label: 'Geoffrey', value: 'geoffrey' },
						{ label: 'Doctor Horse, MD Junior', value: 'drhorse' },
						{ label: 'Mister Chompy', value: 'chompyhorse' }
					]}
					errors={[<FormattedMessage {...trn.error} />]}
				/>
			</IntlProvider>
		);
	})
	.add('single error', () =>
		(<SelectInput
			label='Select a name for your horse'
			id='horsename'
			name='horsename'
			required
			options={[
				{ label: 'Geoffrey', value: 'geoffrey' },
				{ label: 'Doctor Horse, MD Junior', value: 'drhorse' },
				{ label: 'Mister Chompy', value: 'chompyhorse' }
			]}
			error={'I\'m a single lady, I\'m a single lady'}
		/>)
	)
	.add('multiple errors', () =>
		(<SelectInput
			label='Select a name for your horse'
			id='horsename'
			name='horsename'
			required
			options={[
				{ label: 'Geoffrey', value: 'geoffrey' },
				{ label: 'Doctor Horse, MD Junior', value: 'drhorse' },
				{ label: 'Mister Chompy', value: 'chompyhorse' }
			]}
			errors={[
				'This is a bad name for a horse',
				'You do not have a horse to name'
			]}
		/>)
	)
	.add('with helper text', () =>
		(<SelectInput
			label='Select a name for your horse'
			helperText='Lorem ipsum is simply dummy text'
			id='horsename'
			name='horsename'
			options={[
				{ label: 'Geoffrey', value: 'geoffrey' },
				{ label: 'Doctor Horse, MD Junior', value: 'drhorse' },
				{ label: 'Mister Chompy', value: 'chompyhorse' }
			]}
		/>)
	);
