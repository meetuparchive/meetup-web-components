import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Popover from './Popover';
import PopoverTrigger from './PopoverTrigger';
import PopoverMenu from './PopoverMenu';
import PopoverMenuItem from './PopoverMenuItem';

describe('Popover', () => {

	describe('is a HTML button element', () => {
		let el;

		beforeEach(() => {
			const popover = TestUtils.renderIntoDocument(
				<div className='hasJS'>
					<Popover>
						<PopoverTrigger>Trigger</PopoverTrigger>
						<PopoverMenu>
							<PopoverMenuItem>One</PopoverMenuItem>
							<PopoverMenuItem>Two</PopoverMenuItem>
							<PopoverMenuItem>Three</PopoverMenuItem>
						</PopoverMenu>
					</Popover>
				</div>
			);
			el = ReactDOM.findDOMNode(popover);
		});

		afterEach(() => {
			el = null;
		});

		it('exists', () => {
			expect(el).not.toBeNull();
		});

	});

});

