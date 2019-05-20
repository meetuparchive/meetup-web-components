import React from 'react';
import { shallow, mount } from 'enzyme';

import ToggleSwitch from './ToggleSwitch';

describe('ToggleSwitch', function() {
	const DEFAULT_PROPS = {
		name: 'testToggle',
	};

	const shallowWrapper = (props = {}) =>
		shallow(<ToggleSwitch {...DEFAULT_PROPS} {...props} />);
	const mountWrapper = (props = {}) =>
		mount(<ToggleSwitch {...DEFAULT_PROPS} {...props} />);

	describe('basic', function() {
		it('renders inactive toggle switch', function() {
			expect(shallowWrapper()).toMatchSnapshot();
		});

		it('renders checked toggle switch', function() {
			expect(shallowWrapper({ checked: true })).toMatchSnapshot();
		});

		it('has a label only if one is given', () => {
			const component = mountWrapper({ label: 'Turn it on?' });
			expect(component.find('label')).not.toBe(null);
		});

		it('sets `aria-labelledby` attribute if one is given', () => {
			const CUSTOM_LABELLEDBY = 'test-label';
			const component = mountWrapper({ labelledBy: CUSTOM_LABELLEDBY });

			expect(component.find(`button`).prop('aria-labelledby')).toBe(
				CUSTOM_LABELLEDBY
			);
		});
	});

	describe('disabled', function() {
		it('sets aria-readonly attribute', function() {
			const component = mountWrapper({ disabled: true });
			expect(component.find(`button`).props()['aria-readonly']).toBe(true);
		});

		it('does not update aria-checked when clicked when disabled', function() {
			const component = mountWrapper({ disabled: true });
			const btnNode = component.find(`button`);

			expect(btnNode.props()['aria-checked']).not.toBe(true);
			btnNode.simulate('click');
			expect(btnNode.props()['aria-checked']).not.toBe(true);
		});
	});
});
