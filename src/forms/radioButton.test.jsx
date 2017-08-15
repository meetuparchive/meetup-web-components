import React from 'react';
import { shallow } from 'enzyme';

import RadioButton from './RadioButton';

describe('RadioButton', () => {
	const DEFAULT_PROPS = {
		label: 'This is a label',
		className: 'some-class',
		otherProp: 'other',
		value: 'value',
		name: 'name',
	};

	const getWrapper = (props = {}) =>
		shallow(<RadioButton {...DEFAULT_PROPS} {...props} />);

	describe('checked', () => {
		it('should render an enabled radio button', () => {
			expect(getWrapper({ disabled: true, checked: true })).toMatchSnapshot();
		});

		it('should render an disabled radio button', () => {
			expect(getWrapper({ disabled: false, checked: true })).toMatchSnapshot();
		});
	});

	describe('unchecked', () => {
		it('should render an enabled radio button', () => {
			expect(getWrapper({ disabled: true, checked: false })).toMatchSnapshot();
		});

		it('should render an disabled radio button', () => {
			expect(getWrapper({ disabled: false, checked: false })).toMatchSnapshot();
		});
	});
});
