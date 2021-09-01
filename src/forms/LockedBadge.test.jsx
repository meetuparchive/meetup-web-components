import React from 'react';
import { shallow } from 'enzyme';
import LockedBadge from './LockedBadge';

describe('LockedBadge', function() {
	const onClickCallbackMock = jest.fn();

	const MOCK_PROPS = {
		label: 'Default label',
		onClick: onClickCallbackMock,
	};

	const render = (props = MOCK_PROPS) => {
		const wrapper = shallow(<LockedBadge {...props} />);

		return wrapper;
	};

	afterEach(() => {
		onClickCallbackMock.mockClear();
	});

	it('renders locked badge with default styles', () => {
		expect(render()).toMatchSnapshot();
	});
	it('calls onClickCallback when user clicks on badge', () => {
		const badge = render();
		expect(onClickCallbackMock).not.toHaveBeenCalled();
		badge.simulate('click');
		expect(onClickCallbackMock).toHaveBeenCalledTimes(1);
	});
});
