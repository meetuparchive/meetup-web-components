import React from 'react';
import { shallow } from 'enzyme';
import { InputTimeComponent } from './InputTime';

describe('InputTime', function() {
	const MOCK_PROPS = {
		name: 'mocktime',
		value: '12:15',
		onChange: jest.fn(),
		required: 'what fools these mortals be',
	};

	const render = (props = MOCK_PROPS) => {
		const wrapper = shallow(<InputTimeComponent {...props} />);
		// shallow rendering doesn't set up `ref`, so force state change
		wrapper.instance().setState({ forceTextInput: false });
		wrapper.update();
		return wrapper;
	};
	describe('InputTime, with input[time] support', () => {
		it('renders a <input type="time" /> with expected props', () => {
			expect(render()).toMatchSnapshot();
		});
		it('renders error state as expected', () => {
			expect(
				render({ ...MOCK_PROPS, error: 'what just happened' })
			).toMatchSnapshot();
		});

		it('calls props.onChange when value is changed', () => {
			MOCK_PROPS.onChange.mockClear();
			const wrapper = render();
			const inputWrap = wrapper.find('input');
			expect(MOCK_PROPS.onChange).not.toHaveBeenCalled();
			inputWrap.simulate('change', { target: { value: '23:00' } });
			expect(MOCK_PROPS.onChange).toHaveBeenCalled();
		});
	});
});
