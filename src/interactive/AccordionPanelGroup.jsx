import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

export const ACCORDIONPANELGROUP_CLASS = 'accordionPanelGroup';

/**
 * @description takes AccordionPanelGroup and AccordionPanel data and returns an array of new panel `isOpen` states
 * @param {Boolean} isMultiselect
 * @param {Array} statesList
 * @param {Object} clickedPanelData
 * @returns {Function} a Promise that maps statesList to an array of each panel's `isOpen` prop value
 */
const getNewPanelState = (isMultiselect, statesList, clickedPanelData) => {
	return new Promise((resolve, reject) => {
		resolve(
			statesList.map((panelState, i) => {
				const defaultState = isMultiselect ? panelState : false;

				// not the panel that was clicked
				if (clickedPanelData.panelIndex !== i) {
					return defaultState;
				}

				return clickedPanelData.isOpen;
			})
		);
	});
};

/**
 * @module AccordionPanelGroup
 */
class AccordionPanelGroup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			panelStatesList: props.accordionPanels.map(
				panel => panel.props.isOpen || false
			),
		};

		this.handlePanelClick = this.handlePanelClick.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		let newPanelState;
		nextProps.accordionPanels.forEach((panel, i) => {
			const nextPanelProps = panel.props;

			// This is done as a Promise because `getNewPanelState`
			// would sometimes take too long to complete, and we would
			// return prevState.panelStatesList, showing no change
			if (nextPanelProps['isOpen'] !== prevState.panelStatesList[i]) {
				getNewPanelState(nextProps.multiSelectable, prevState.panelStatesList, {
					panelIndex: i,
					isOpen: nextPanelProps['isOpen'],
				}).then(panelState => {
					newPanelState = panelState;

					return {
						panelStatesList: panelState,
					};
				});
			}
		});

		return { panelStatesList: newPanelState || prevState.panelStatesList };
	}

	/**
	 * @param {Object} e
	 * @param {Object} panelData
	 * @returns undefined
	 */
	handlePanelClick(e, panelData) {
		const { panelStatesList } = this.state;

		getNewPanelState(this.props.multiSelectable, panelStatesList, panelData).then(
			panelState => {
				this.setState({
					panelStatesList: panelState,
				});
			}
		);
	}

	render() {
		const {
			accordionPanels,
			panelContent, // eslint-disable-line no-unused-vars
			indicatorAlign,
			indicatorIcon,
			indicatorIconActive,
			indicatorIconSize, // eslint-disable-line no-unused-vars
			indicatorSwitch,
			multiSelectable,
			className,
			...other
		} = this.props;

		const classNames = cx(ACCORDIONPANELGROUP_CLASS, 'list', className);

		return (
			<ul
				role="tabList"
				aria-multiselectable={multiSelectable}
				className={classNames}
				{...other}
			>
				{accordionPanels.map((panel, i) => (
					<li key={i} className="list-item flush--top">
						{React.cloneElement(
							panel,
							{
								...panel.props,
								panelIndex: i,
								setClickedPanel: this.handlePanelClick,
								isOpen: this.state.panelStatesList[i],
								indicatorAlign,
								indicatorIcon,
								indicatorIconActive,
								indicatorSwitch,
							},
							panel.props.children
						)}
					</li>
				))}
			</ul>
		);
	}
}

AccordionPanelGroup.defaultProps = {
	indicatorAlign: 'right',
	indicatorIcon: 'chevron-down',
	multiSelectable: true,
	indicatorIconSize: 'xs',
};

AccordionPanelGroup.propTypes = {
	accordionPanels: PropTypes.arrayOf(PropTypes.element).isRequired,
	multiSelectable: PropTypes.bool,
	indicatorAlign: PropTypes.string,
	indicatorIcon: PropTypes.string,
	indicatorIconActive: PropTypes.string,
	indicatorIconSize: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
	indicatorSwitch: PropTypes.bool,
};

export default AccordionPanelGroup;
