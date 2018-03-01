import React from 'react';
import { storiesOf } from '@storybook/react';
import { decorateWithBasics } from '../decorators';

import withToggleControl from './WithToggleControl';
import Icon from '../../media/Icon';

/**
 * @class TestComponent
 */
class TestComponent extends React.Component {
	render() {
		const {
			isActive,
			toggleActive
		} = this.props;

		const iconShape = isActive ? 'check' : 'cross';
		const toggleText = isActive ? 'The toggle is on' : 'The toggle is off';

		return (
			<div
				className='display--block align--center'
				onClick={toggleActive}
			>
				<Icon shape={iconShape} size='m' />
				<p>{toggleText}</p>
			</div>
		);
	}
}
const TestComponentWithToggleControl = withToggleControl(TestComponent);

storiesOf('withToggleControl', module)
	.addDecorator(decorateWithBasics)
	.addWithInfo('default', () =>
		<TestComponentWithToggleControl />
	);
