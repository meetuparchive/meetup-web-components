import React from 'react';
import SelectInput from './SelectInput';
import { storiesOf } from '@kadira/storybook';
import {
	IntlProvider,
	FormattedMessage,
	defineMessages,
} from 'react-intl';

storiesOf('SelectInput', module)
	.add('default', () =>
		<SelectInput
			label='Select a name for your horse'
			id='horsename'
			name='horsename'
			options={[
				{ label: 'Geoffrey', value: 'geoffrey' },
				{ label: 'Doctor Horse, MD Junior', value: 'drhorse' },
				{ label: 'Mister Chompy', value: 'chompyhorse' }
			]}
		/>
	)
	.add('with default selection', () =>
		<SelectInput
			label='Select a name for your horse'
			id='horsename'
			name='horsename'
			value='drhorse'
			options={[
				{ label: 'Geoffrey', value: 'geoffrey' },
				{ label: 'Doctor Horse, MD Junior', value: 'drhorse' },
				{ label: 'Mister Chompy', value: 'chompyhorse' }
			]}
		/>
	)
	.add('error state', () =>
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
			error='You forgot to name your horse!'
		/>
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
	.add('required', () =>
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
			errors={['You forgot to name your horse!']}
		/>
	);
