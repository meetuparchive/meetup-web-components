import React from 'react';
import { shallow } from 'enzyme';

import RadioButton from './RadioButton';

describe('RadioButton', () => {
	it('should match the snapshot', () => {
		const props = {
			label: 'This is a label',
			className: 'some-class',
			checked: true,
			otherProp: 'other',
			value: 'value',
			name: 'name',
		};
		expect(shallow(<RadioButton {...props} />)).toMatchSnapshot();
	});
});
