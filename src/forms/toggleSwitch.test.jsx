import React from 'react';
import { shallow, mount } from 'enzyme';

import ToggleSwitch, {
	TOGGLE_SWITCH_ACTIVE_CLASS,
	TOGGLE_SWITCH_DISABLED_CLASS,
	TOGGLE_SWITCH_CLASS,
	// KNOB_CLASS,
	KNOB_ACTIVE_CLASS,
	KNOB_DISABLED_CLASS,
	LABEL_CLASS,
} from './ToggleSwitch';

describe('ToggleSwitch', function() {
	const DEFAULT_PROPS = {
		name: 'testToggle'
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
			expect(shallowWrapper({checked: true})).toMatchSnapshot();
		});

		it('has a label only if one is given', () => {
			const component = mountWrapper({label: 'Turn it on?'});
			expect(component.find(`.${LABEL_CLASS}`)).not.toBe(null);
		});

		it('sets `aria-labelledby` attribute if one is given', () => {
			const CUSTOM_LABELLEDBY = 'test-label';
			const component = mountWrapper({labelledBy: CUSTOM_LABELLEDBY});

			expect(component.find(`.${TOGGLE_SWITCH_CLASS}`).props()['aria-labelledby']).toBe(CUSTOM_LABELLEDBY);
		});

		it('adds a class name to a the label element if one is given', () => {
			const CUSTOM_LABEL_CLASS = 'test-label';
			const component = mountWrapper({labelClass: CUSTOM_LABEL_CLASS});
			expect(component.find(`.${CUSTOM_LABEL_CLASS}`)).not.toBe(null);
		});

		it('calls `toggle()` and updates aria-checked when clicked', function() {
			const component = mountWrapper();
			const btnNode = component.find(`.${TOGGLE_SWITCH_CLASS}`);

			expect(btnNode.props()['aria-checked']).toBe(false);
			btnNode.simulate('click');
			expect(btnNode.props()['aria-checked']).toBe(true);
		});
	});

	describe('disabled', function() {
		it(`should add class ${TOGGLE_SWITCH_DISABLED_CLASS} to switch for disabled switches`, function() {
			const component = mountWrapper({disabled: true});
			expect(component.find(`.${TOGGLE_SWITCH_DISABLED_CLASS}`)).not.toBe(null);
		});

		it(`should add class ${KNOB_DISABLED_CLASS} to knob for disabled switches`, function() {
			const component = mountWrapper({disabled: true});
			expect(component.find(`.${TOGGLE_SWITCH_DISABLED_CLASS}`)).not.toBe(null);
		});

		it('does not update aria-checked when clicked when disabled', function() {
			const component = mountWrapper({disabled: true});
			const btnNode = component.find(`.${TOGGLE_SWITCH_CLASS}`);

			expect(btnNode.props()['aria-checked']).toBe(false);
			btnNode.simulate('click');
			expect(btnNode.props()['aria-checked']).toBe(false);
		});
	});

	describe('active', function() {
		it(`should add class ${TOGGLE_SWITCH_ACTIVE_CLASS} to switch for active switches`, function() {
			const component = mountWrapper({disabled: true});
			expect(component.find(`.${TOGGLE_SWITCH_ACTIVE_CLASS}`)).not.toBe(null);
		});

		it(`should add class ${KNOB_ACTIVE_CLASS} to knob for active switches`, function() {
			const component = mountWrapper({disabled: true});
			expect(component.find(`.${TOGGLE_SWITCH_ACTIVE_CLASS}`)).not.toBe(null);
		});
	});

});
