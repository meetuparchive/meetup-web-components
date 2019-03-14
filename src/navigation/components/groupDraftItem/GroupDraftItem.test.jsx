import React from 'react';
import { shallow } from 'enzyme';

import GroupDraftItem from './GroupDraftItem';

const MOCK_PROPS = {
	groupHome: jest.fn(),
	groupDraft: {
		editLink: 'create',
		name: 'Name of the group',
		status: 'In progress',
		actionTitle: 'Finish group',
	},
};

describe('Profile Dropdown', () => {
	const wrapper = shallow(<GroupDraftItem {...MOCK_PROPS} />);
	it('should match snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should show the draft group at the top ProfileDropdown for authenticated screens', () => {
		const wrapperWithDrafts = shallow(<GroupDraftItem {...MOCK_PROPS} />);

		expect(wrapperWithDrafts.find('.profileDropdown-draft-group').length).toBe(1);
	});

	it('should has the class for the tracking integration', () => {
		const wrapperWithDrafts = shallow(<GroupDraftItem {...MOCK_PROPS} />);

		expect(wrapperWithDrafts.find('.draftprofiledropdown').length).toBe(1);
	});
});
