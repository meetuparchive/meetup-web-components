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
export const getNewPanelState = (isMultiselect, statesList, clickedPanelData) =>
	statesList.map((panelState, i) => {
		const defaultState = isMultiselect ? panelState : false;

		// not the panel that was clicked
		if (clickedPanelData.panelIndex !== i) {
			return defaultState;
		}

		return clickedPanelData.isDisabledPanelOpen || clickedPanelData.isOpen;
	});

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

	/**
	 * @param {Object} e
	 * @param {Object} panelData
	 * @returns undefined
	 */
	handlePanelClick(e, panelData) {
		const { multiSelectable } = this.props;

		this.setState(prevState => {
			const { panelStatesList } = prevState;
			const newPanelState = getNewPanelState(
				multiSelectable,
				panelStatesList,
				panelData
			);

			return { panelStatesList: newPanelState };
		});
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
			isOpen, // eslint-disable-line no-unused-vars
			...other
		} = this.props;

		const classNames = cx(ACCORDIONPANELGROUP_CLASS, 'list', className);

		return (
			<ul
				// role="tablist"
				aria-multiselectable={multiSelectable}
				className={classNames}
				{...other}
			>
				{accordionPanels.map((panel, i) => (
					<li key={i} className="list-item flush--top" /* role="tab"*/>
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
								isDisabledPanelOpen: this.state.panelStatesList[i],
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
	/** Panels to render in a group */
	accordionPanels: PropTypes.arrayOf(PropTypes.element).isRequired,

	/** Whether more than one panel can be open at a time */
	multiSelectable: PropTypes.bool,

	/** Which side of each panel that the icon or indicator switch renders on */
	indicatorAlign: PropTypes.string,

	/** Shape name of the icon to render as an indicator for closed panels */
	indicatorIcon: PropTypes.string,

	/** Shape name of the icon to render as an indicator for opened panels */
	indicatorIconActive: PropTypes.string,

	/** Size key for the icon rendered for open and closed indicators */
	indicatorIconSize: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),

	/** Whether to use a ToggleSwitch as an indicator instead of an icon */
	indicatorSwitch: PropTypes.bool,
};

export default AccordionPanelGroup;
