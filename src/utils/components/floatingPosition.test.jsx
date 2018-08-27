import React from 'react';
import { mount } from 'enzyme';
import { Portal } from 'react-portal';

import FloatingPosition, {
	getAdjustedAlignment,
	calculateContentPosition,
} from './FloatingPosition';

const makeRandomNumber = (min = 0, max = 100) => {
	return Math.floor(Math.random() * parseInt(max + 1)) + min;
};
/**
 * @module TestComponent
 */
class TestComponent extends React.PureComponent {
	render() {
		const getTrigger = () => {
			return this.triggerRef;
		};

		const getContent = () => {
			return this.contentRef;
		};

		const { noPortal } = this.props;

		return (
			<div>
				<div ref={el => (this.triggerRef = el)}>Trigger</div>
				<FloatingPosition
					offset={{ top: 8, left: 16 }}
					getTrigger={getTrigger}
					getContent={getContent}
					noPortal={noPortal}
					align="right"
				>
					{({ top, left }) => (
						<div ref={el => (this.contentRef = el)}>
							<p>top: {top}</p>
							<p>left: {left}</p>
						</div>
					)}
				</FloatingPosition>
			</div>
		);
	}
}

describe('FloatingPosition', () => {
	const renderComponent = props => mount(<TestComponent {...props} />);

	it('should render children with a Portal if noPortal is false', () => {
		const floatingPostion = renderComponent({ noPortal: false });
		expect(floatingPostion.find(Portal).exists()).toBeTruthy();
	});

	it('should render children without a Portal if noPortal is true', () => {
		const floatingPostion = renderComponent({ noPortal: true });
		expect(floatingPostion.find(Portal).exists()).toBeFalsy();
	});

	it('adjusts popup content position if it overflows the viewport', () => {
		const MOCK_POSITION_DATA = { left: 0, width: 70 };
		const expected = 'left';
		const actual = getAdjustedAlignment('right', MOCK_POSITION_DATA, 384, 1000);

		expect(actual).toBe(expected);
	});

	it('does not adjust popup content position if it fits in the viewport', () => {
		const MOCK_POSITION_DATA = { left: 500, width: 70 };
		const expected = 'right';
		const actual = getAdjustedAlignment('right', MOCK_POSITION_DATA, 384, 1000);

		expect(actual).toBe(expected);
	});

	describe('the calculateContentPosition function', () => {
		const randomHeight = makeRandomNumber(0, 300);
		const randomParentHeight = makeRandomNumber(0, 800);
		const mockGetBoundingClientRect = () => ({ height: randomParentHeight });

		const triggerWithoutOffsetParent = () => ({
			getBoundingClientRect: () => ({ height: randomHeight }),
		});

		const triggerWithOffsetParent = () => ({
			offsetParent: {
				getBoundingClientRect: mockGetBoundingClientRect,
			},
		});

		it('should return undefined early if trigger is provided and content is not', () => {
			const params = {
				trigger: triggerWithoutOffsetParent,
				content: null,
			};
			expect(calculateContentPosition(params)).toEqual(undefined);
		});
		it('should return undefined early if content is provided trigger is not', () => {
			const params = {
				trigger: null,
				content: <div />,
			};
			expect(calculateContentPosition(params)).toEqual(undefined);
		});
		it('should return content position if trigger and content are both provided', () => {
			const params = {
				trigger: triggerWithoutOffsetParent,
				content: <div />,
			};
			expect(calculateContentPosition(params)).toEqual({
				left: 0,
				top: 0,
			});
		});
		describe('when not adding a portal', () => {
			it('should return a left position of undefined', () => {
				const params = {
					trigger: triggerWithoutOffsetParent,
					content: <div />,
					addPortal: false,
					contentHeight: 0,
					direction: 'top',
				};

				expect(calculateContentPosition(params)).toEqual({
					left: undefined,
					top: 0,
				});
			});
			describe('when the direction is top', () => {
				it('should return a top position of the negative contentHeight', () => {
					const randomHeight = makeRandomNumber();
					const params = {
						trigger: triggerWithoutOffsetParent,
						content: <div />,
						addPortal: false,
						contentHeight: randomHeight,
						direction: 'top',
					};
					expect(calculateContentPosition(params)).toEqual({
						left: undefined,
						top: -randomHeight,
					});
				});
			});
			describe('when the direction is not top', () => {
				describe('when offset is NOT provided and the trigger DOES NOT have an offset parent', () => {
					it('should return a top position equal to the height of the trigger', () => {
						const params = {
							trigger: triggerWithoutOffsetParent,
							content: <div />,
							addPortal: false,
							contentHeight: 0,
							direction: 'fakeDirection',
						};
						expect(calculateContentPosition(params)).toEqual({
							top: randomHeight,
							left: undefined,
						});
					});
				});
				describe('when offset is provided and the trigger DOES NOT have an offset parent', () => {
					it('should return a top position equal to the height plus the offset from the top of the trigger', () => {
						const params = {
							trigger: triggerWithoutOffsetParent,
							content: <div />,
							addPortal: false,
							contentHeight: 0,
							direction: 'fakeDirection',
							offset: { top: makeRandomNumber(0, 200) },
						};
						expect(calculateContentPosition(params)).toEqual({
							top: randomHeight + params.offset.top,
							left: undefined,
						});
					});
				});
				describe('when offset is provided and the trigger DOES have an offset parent', () => {
					it('should return a top position equal to the height of the content plus the offset of the parent of the trigger', () => {
						const params = {
							trigger: triggerWithOffsetParent,
							content: <div />,
							addPortal: false,
							contentHeight: 0,
							direction: 'fakeDirection',
							offset: { top: makeRandomNumber(0, 150) },
						};
						expect(calculateContentPosition(params)).toEqual({
							top: randomParentHeight + params.offset.top,
							left: undefined,
						});
					});
				});
			});
		});
	});
});
