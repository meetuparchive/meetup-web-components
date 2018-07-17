import React from 'react';
import { shallow } from 'enzyme';
import { SelectInput } from './Select';

const testOptions = (
	<React.Fragment>
		<option value="1">One</option>,
		<option value="2">Two</option>,
		<option value="3">Three</option>,
		<option value="4" disabled>
			Four
		</option>,
	</React.Fragment>
);

const BasicSelect = (
	<SelectInput label="Test select" name="testSelect" required="yo check it">
		{testOptions}
	</SelectInput>
);
describe('SelectInput basic', () => {
	const component = shallow(BasicSelect);

	it('renders into the DOM', () => {
		expect(component).toMatchSnapshot();
	});
});
