import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { decorateWithLocale } from '../utils/decorators';

import withToggleControl from './WithToggleControl';
import Icon from '../media/Icon';

/**
 * @class TestComponent
 */
class TestComponent extends React.Component {
	render() {
		const {
			isChecked,
			toggle
		} = this.props;

		const iconShape = isChecked ? 'check' : 'cross';
		const toggleText = isChecked ? 'The toggle is on' : 'The toggle is off';

		return (
			<div
				className='display--block align--center'
				onClick={toggle}
			>
				<Icon
					shape={iconShape}
					size='m' />
				<p>{toggleText}</p>
			</div>
		);
	}
}
const TestComponentWithToggleControl = withToggleControl(TestComponent);

storiesOf('withToggleControl', module)
	.addDecorator(decorateWithLocale)
	.addWithInfo('Test component using provided media props', () =>
		<TestComponentWithToggleControl />
	);
