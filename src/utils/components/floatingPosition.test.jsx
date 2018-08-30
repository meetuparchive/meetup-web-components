import React from 'react';
import { mount } from 'enzyme';
import { Portal } from 'react-portal';

import FloatingPosition, {
	getAdjustedAlignment,
	calculateContentPosition,
	calcCenterAlignment,
	calcRightAlignment,
	calcLeftAlignment,
	calcDefaultAlignment,
	ARROW_WIDTH,
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

	describe('the calculateContentPosition function', () => {
		const randomHeight = makeRandomNumber(0, 300);
		const randomLeft = makeRandomNumber(0, 300);
		const randomWidth = makeRandomNumber(0, 300);
		const randomTop = makeRandomNumber(0, 500);

		const randomParentHeight = makeRandomNumber(0, 800);
		const randomParentLeft = makeRandomNumber(0, 800);
		const randomParentWidth = makeRandomNumber(0, 800);
		const randomParentTop = makeRandomNumber(0, 800);

		const randomContentHeight = makeRandomNumber(0, 800);

		const mockGetBoundingClientRect = () => ({
			height: randomParentHeight,
			left: randomParentLeft,
			width: randomParentWidth,
			top: randomParentTop,
		});

		const triggerWithoutOffsetParent = () => ({
			getBoundingClientRect: () => ({
				height: randomHeight,
				left: randomLeft,
				width: randomWidth,
				top: randomTop,
			}),
		});

		const mockContent = () => ({
			getBoundingClientRect: () => ({
				height: randomContentHeight,
			}),
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
				content: mockContent,
			};
			expect(calculateContentPosition(params)).toEqual(undefined);
		});
		it('should return content position if trigger and content are both provided', () => {
			const params = {
				trigger: triggerWithoutOffsetParent,
				content: mockContent,
				addPortal: false,
			};
			expect(calculateContentPosition(params)).toEqual({
				left: undefined,
				top: randomHeight,
			});
		});
		describe('when NOT adding a portal', () => {
			it('should return a left position of undefined', () => {
				const params = {
					trigger: triggerWithoutOffsetParent,
					content: mockContent,
					addPortal: false,
					direction: 'top',
				};

				expect(calculateContentPosition(params).left).toEqual(undefined);
			});
			describe('when the direction is top', () => {
				it('should return a top position of the negative contentHeight', () => {
					const params = {
						trigger: triggerWithoutOffsetParent,
						content: mockContent,
						addPortal: false,
						direction: 'top',
					};
					expect(calculateContentPosition(params)).toEqual({
						left: undefined,
						top: -randomContentHeight,
					});
				});
			});
			describe('when the direction is not top', () => {
				describe('when offset is NOT provided and the trigger DOES NOT have an offset parent', () => {
					it('should return a top position equal to the height of the trigger', () => {
						const params = {
							trigger: triggerWithoutOffsetParent,
							content: mockContent,
							addPortal: false,
							direction: 'fakeDirection',
						};
						expect(calculateContentPosition(params).top).toEqual(
							randomHeight
						);
					});
				});
				describe('when offset is provided and the trigger DOES NOT have an offset parent', () => {
					it('should return a top position equal to the height of the trigger plus the offset from the top of the trigger', () => {
						const params = {
							trigger: triggerWithoutOffsetParent,
							content: mockContent,
							addPortal: false,
							direction: 'fakeDirection',
							offset: { top: makeRandomNumber(0, 200) },
						};
						expect(calculateContentPosition(params).top).toEqual(
							randomHeight + params.offset.top
						);
					});
				});
				describe('when offset is provided and the trigger DOES have an offset parent', () => {
					it('should return a top position equal to the height of the content plus the offset of the parent of the trigger', () => {
						const params = {
							trigger: triggerWithOffsetParent,
							content: mockContent,
							addPortal: false,
							direction: 'fakeDirection',
							offset: { top: makeRandomNumber(0, 150) },
						};
						expect(calculateContentPosition(params).top).toEqual(
							randomParentHeight + params.offset.top
						);
					});
				});
			});
		});
		describe('when adding a portal', () => {
			describe('when calculating alignment using getAdjustedAlignment', () => {
				it('adjusts popup content position if it overflows the left side viewport', () => {
					const MOCK_POSITION_DATA = { left: 0, width: 70 };
					const expected = 'left';
					const alignment = getAdjustedAlignment(
						'center',
						MOCK_POSITION_DATA,
						384,
						1000
					);

					expect(alignment).toEqual(expected);
				});

				it('adjusts popup content position if it overflows the right side viewport', () => {
					const MOCK_POSITION_DATA = { left: 500, width: 70 };
					const expected = 'right';
					const alignment = getAdjustedAlignment(
						'center',
						MOCK_POSITION_DATA,
						501,
						1000
					);

					expect(alignment).toEqual(expected);
				});

				it('does not adjust popup content position if it fits in the viewport', () => {
					const MOCK_POSITION_DATA = { left: 500, width: 70 };
					const expected = 'right';
					const actual = getAdjustedAlignment(
						'right',
						MOCK_POSITION_DATA,
						384,
						1000
					);

					expect(actual).toEqual(expected);
				});
			});
			describe('returns a left position based on alignment', () => {
				describe('when the alignment is CENTER', () => {
					it('should return a left alignment equal to the return value of calcCenterAlignment AND offset is provided', () => {
						const params = {
							trigger: triggerWithoutOffsetParent,
							content: mockContent,
							addPortal: true,
							direction: 'top',
							align: 'center',
							scrollLeft: makeRandomNumber(),
							offset: { left: makeRandomNumber(0, 350) },
						};
						expect(calculateContentPosition(params).left).toEqual(
							calcCenterAlignment(
								randomLeft,
								randomWidth,
								params.scrollLeft,
								params.offset.left
							)
						);
					});
					it('should return a left alignment equal to the return value of calcCenterAlignment AND offset is NOT provided', () => {
						const params = {
							trigger: triggerWithoutOffsetParent,
							content: mockContent,
							addPortal: true,
							direction: 'top',
							align: 'center',
							scrollLeft: makeRandomNumber(),
						};
						expect(calculateContentPosition(params).left).toEqual(
							calcCenterAlignment(
								randomLeft,
								randomWidth,
								params.scrollLeft,
								0
							)
						);
					});
				});
				describe('when the alignment is RIGHT', () => {
					it('should return a left alignment equal to the return value of calcRightAlignment AND offset is provided', () => {
						const params = {
							trigger: triggerWithoutOffsetParent,
							content: mockContent,
							addPortal: true,
							direction: 'top',
							align: 'right',
							scrollLeft: makeRandomNumber(),
							offset: { left: makeRandomNumber(0, 350) },
						};
						expect(calculateContentPosition(params).left).toEqual(
							calcRightAlignment(
								randomLeft,
								randomWidth,
								ARROW_WIDTH,
								params.scrollLeft,
								params.offset.left
							)
						);
					});
					it('should return a left alignment equal to the return value of calcRightAlignment AND offset is NOT provided', () => {
						const params = {
							trigger: triggerWithoutOffsetParent,
							content: mockContent,
							addPortal: true,
							direction: 'top',
							align: 'right',
							scrollLeft: makeRandomNumber(),
						};
						expect(calculateContentPosition(params).left).toEqual(
							calcCenterAlignment(
								randomLeft,
								randomWidth,
								ARROW_WIDTH,
								params.scrollLeft,
								0
							)
						);
					});
				});
				describe('when the alignment is LEFT', () => {
					it('should return a left alignment equal to the return value of calcLeftAlignment AND offset is provided', () => {
						const params = {
							trigger: triggerWithoutOffsetParent,
							content: mockContent,
							addPortal: true,
							direction: 'top',
							align: 'left',
							scrollLeft: makeRandomNumber(),
							offset: { left: makeRandomNumber(0, 350) },
						};
						expect(calculateContentPosition(params).left).toEqual(
							calcLeftAlignment(
								randomLeft,
								randomWidth,
								ARROW_WIDTH,
								params.scrollLeft,
								params.offset.left
							)
						);
					});
					it('should return a left alignment equal to the return value of calcLeftAlignment AND offset is NOT provided', () => {
						const params = {
							trigger: triggerWithoutOffsetParent,
							content: mockContent,
							addPortal: true,
							direction: 'top',
							align: 'left',
							scrollLeft: makeRandomNumber(),
						};
						expect(calculateContentPosition(params).left).toEqual(
							calcLeftAlignment(
								randomLeft,
								randomWidth,
								ARROW_WIDTH,
								params.scrollLeft,
								0
							)
						);
					});
				});
				describe('when the alignment is NOT PROVIDED/BAD VALUE', () => {
					it('should return the default left alignment value equal to the return value of calcLeftAlignment AND offset is provided', () => {
						const params = {
							trigger: triggerWithoutOffsetParent,
							content: mockContent,
							addPortal: true,
							direction: 'top',
							scrollLeft: makeRandomNumber(),
							offset: { left: makeRandomNumber(0, 350) },
						};
						expect(calculateContentPosition(params).left).toEqual(
							calcDefaultAlignment(
								randomLeft,
								randomWidth,
								ARROW_WIDTH,
								params.scrollLeft,
								params.offset.left
							)
						);
					});
					it('should return a left alignment equal to the return value of calcLeftAlignment AND offset is NOT provided', () => {
						const params = {
							trigger: triggerWithoutOffsetParent,
							content: mockContent,
							addPortal: true,
							direction: 'top',
							scrollLeft: makeRandomNumber(),
						};
						expect(calculateContentPosition(params).left).toEqual(
							calcDefaultAlignment(
								randomLeft,
								randomWidth,
								ARROW_WIDTH,
								params.scrollLeft,
								0
							)
						);
					});
				});
			});
			describe('returns a top position', () => {
				describe('when the direction is top', () => {
					describe('when offset is NOT provided and the trigger DOES NOT have an offset parent', () => {
						it('should still return a top position equal to the top position of the trigger minus the content height minus the height of the target', () => {
							const randomScrollTop = makeRandomNumber();
							const params = {
								trigger: triggerWithoutOffsetParent,
								content: mockContent,
								addPortal: true,
								direction: 'top',
								scrollTop: randomScrollTop,
							};
							const triggerTopPosition =
								params.scrollTop + randomTop + randomHeight;
							expect(calculateContentPosition(params).top).toEqual(
								triggerTopPosition - randomContentHeight - randomHeight
							);
						});
					});
					describe('when offset is provided and the trigger DOES NOT have an offset parent', () => {
						it('should return a top position equal to the top position of the trigger minus the content height minus the height of the target', () => {
							const randomScrollTop = makeRandomNumber();
							const params = {
								trigger: triggerWithoutOffsetParent,
								content: mockContent,
								addPortal: true,
								direction: 'top',
								scrollTop: randomScrollTop,
								offset: { top: makeRandomNumber() },
							};
							const triggerTopPosition =
								params.scrollTop +
								randomTop +
								randomHeight +
								params.offset.top;
							expect(calculateContentPosition(params).top).toEqual(
								triggerTopPosition - randomContentHeight - randomHeight
							);
						});
					});
					describe('when offset is NOT provided and the trigger DOES have an offset parent', () => {
						it('should still return a top position equal to the top position of the parent of the trigger minus the content height minus the height of the parent', () => {
							const randomScrollTop = makeRandomNumber();
							const params = {
								trigger: triggerWithOffsetParent,
								content: mockContent,
								addPortal: true,
								direction: 'top',
								scrollTop: randomScrollTop,
							};
							const triggerTopPosition =
								params.scrollTop + randomParentTop + randomParentHeight;
							expect(calculateContentPosition(params).top).toEqual(
								triggerTopPosition -
									randomContentHeight -
									randomParentHeight
							);
						});
					});
					describe('when offset is provided and the trigger DOES have an offset parent', () => {
						it('should return a top position equal to the top position of the parent of the trigger minus the content height minus the height of the parent', () => {
							const randomScrollTop = makeRandomNumber();
							const params = {
								trigger: triggerWithOffsetParent,
								content: mockContent,
								addPortal: true,
								direction: 'top',
								scrollTop: randomScrollTop,
								offset: { top: makeRandomNumber() },
							};
							const triggerTopPosition =
								params.scrollTop +
								randomParentTop +
								randomParentHeight +
								params.offset.top;
							expect(calculateContentPosition(params).top).toEqual(
								triggerTopPosition -
									randomContentHeight -
									randomParentHeight
							);
						});
					});
				});

				describe('when the direction is NOT top', () => {
					describe('when offset is NOT provided and the trigger DOES NOT have an offset parent', () => {
						it('should still return a top position equal to the top position of the trigger', () => {
							const randomScrollTop = makeRandomNumber();
							const params = {
								trigger: triggerWithoutOffsetParent,
								content: mockContent,
								addPortal: true,
								direction: 'fakeDirection',
								scrollTop: randomScrollTop,
							};
							const triggerTopPosition =
								params.scrollTop + randomTop + randomHeight;
							expect(calculateContentPosition(params).top).toEqual(
								triggerTopPosition
							);
						});
					});
					describe('when offset is provided and the trigger DOES NOT have an offset parent', () => {
						it('should return a top position equal to the top position of the trigger', () => {
							const randomScrollTop = makeRandomNumber();
							const params = {
								trigger: triggerWithoutOffsetParent,
								content: mockContent,
								addPortal: true,
								direction: 'fakeDirection',
								scrollTop: randomScrollTop,
								offset: { top: makeRandomNumber() },
							};
							const triggerTopPosition =
								params.scrollTop +
								randomTop +
								randomHeight +
								params.offset.top;
							expect(calculateContentPosition(params).top).toEqual(
								triggerTopPosition
							);
						});
					});
					describe('when offset is NOT provided and the trigger DOES have an offset parent', () => {
						it('should still return a top position equal to the top position of the parent of the trigger', () => {
							const randomScrollTop = makeRandomNumber();
							const params = {
								trigger: triggerWithOffsetParent,
								content: mockContent,
								addPortal: true,
								direction: 'fakeDirection',
								scrollTop: randomScrollTop,
							};
							const triggerTopPosition =
								params.scrollTop + randomParentTop + randomParentHeight;
							expect(calculateContentPosition(params).top).toEqual(
								triggerTopPosition
							);
						});
					});
					describe('when offset is provided and the trigger DOES have an offset parent', () => {
						it('should return a top position equal to the top position of the parent of the trigger', () => {
							const randomScrollTop = makeRandomNumber();
							const params = {
								trigger: triggerWithOffsetParent,
								content: mockContent,
								addPortal: true,
								direction: 'fakeDirection',
								scrollTop: randomScrollTop,
								offset: { top: makeRandomNumber() },
							};
							const triggerTopPosition =
								params.scrollTop +
								randomParentTop +
								randomParentHeight +
								params.offset.top;
							expect(calculateContentPosition(params).top).toEqual(
								triggerTopPosition
							);
						});
					});
				});
			});
		});
	});
});
