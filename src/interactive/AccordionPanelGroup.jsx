import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

export const ACCORDIONPANELGROUP_CLASS = 'accordionPanelGroup';

/**
 * @module AccordionPanelGroup
 */
class AccordionPanelGroup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			openPanels: []
		};

		this.clonePanel = this.clonePanel.bind(this);
		this.setOpenPanels = this.setOpenPanels.bind(this);
		this.isPanelInState = this.isPanelInState.bind(this);

		this.accordionPanels = this.props.accordionPanels.map((panel, i, arr) => this.clonePanel(panel, i, arr, true));

	}

	/**
	 * @param clickedPanel is the `AccordionPanel` component passed in from `_handleToggle`
	 * @returns {undefined}
	 *
	 * Keeps track of the clicked panel in order to support AccordionPanelGroups that only
	 * have one panel open at a time.
	 */
	setOpenPanels(clickedPanel, isOpen) {

		const isSaved = this.isPanelInState(clickedPanel);

		// tell parent to store it
		let panelsToSave;

		if (isOpen && !isSaved) {
			if (this.props.multiSelectable) {
				const openPanels = [...this.state.openPanels];
				openPanels.push(clickedPanel);
				panelsToSave = openPanels;
			} else {
				panelsToSave = [clickedPanel];
			}
		} else if (!isOpen && isSaved) {
			const openPanels = [...this.state.openPanels];
			const filteredPanels = openPanels.filter((panel) => panel.props.clickId !== clickedPanel.props.clickId);
			panelsToSave = filteredPanels;
		}
		this.setState({ openPanels: panelsToSave });
	}

	isPanelInState(panel) {
		return this.state.openPanels.filter((openPanel) => openPanel.props.clickId === panel.props.clickId).length > 0;
	}

	/**
	 * @param {Object} accordionPanel - `AccordionPanel` components to clone
	 * @param {number} i - index of the `AccordionPanel` used as the key
	 * @returns {Array} `AccordionPanel` components with props from `AccordionPanelGroup`
	 */
	clonePanel(accordionPanel, i, arr, initialize) {
		const isOpen = (initialize) ? accordionPanel.props.isOpen : this.isPanelInState(accordionPanel);

		let panelProps = {
			key: i,
			indicatorAlign: this.props.indicatorAlign,
			indicatorIcon: this.props.indicatorIcon,
			indicatorIconActive: this.props.indicatorIconActive,
			indicatorSwitch: this.props.indicatorSwitch,
			className: accordionPanel.props.className,
			setClickedPanel: this.setOpenPanels,
			isOpen
		};
		if (initialize) {
			panelProps = {
				...panelProps,
				clickId: i
			};
		}
		const panel = React.cloneElement(accordionPanel, panelProps);
		if (initialize && panel.props.isOpen) {
			this.setOpenPanels(panel, panel.props.isOpen);
		}
		return panel;
	}

	/**
	 * @returns {Array} `AccordionPanel` components with the correct value for `isOpen` prop
	 */
	renderAccordionPanels() {
		this.accordionPanels = this.accordionPanels.map(this.clonePanel);
		return this.accordionPanels;
	}

	render() {
		const {
			accordionPanels, // eslint-disable-line no-unused-vars
			indicatorAlign, // eslint-disable-line no-unused-vars
			indicatorIcon, // eslint-disable-line no-unused-vars
			indicatorIconActive, // eslint-disable-line no-unused-vars
			indicatorIconSize, // eslint-disable-line no-unused-vars
			indicatorSwitch, // eslint-disable-line no-unused-vars
			multiSelectable,
			className,
			...other
		} = this.props;

		const classNames = cx(
			ACCORDIONPANELGROUP_CLASS,
			'list',
			className
		);

		return (
			<ul
				role='tabList'
				aria-multiselectable={multiSelectable}
				className={classNames}
				{...other}
			>
				{
					this.renderAccordionPanels().map((panel, i) => (
						<li key={i} className='list-item'> {panel} </li>
					))
				}
			</ul>
		);
	}
}

AccordionPanelGroup.defaultProps = {
	indicatorAlign: 'right',
	indicatorIcon: 'chevron-down',
	multiSelectable: true,
	indicatorIconSize: 'xs'
};

AccordionPanelGroup.propTypes = {
	accordionPanels: PropTypes.arrayOf(PropTypes.element).isRequired,
	multiSelectable: PropTypes.bool,
	indicatorAlign: PropTypes.string,
	indicatorIcon: PropTypes.string,
	indicatorIconActive: PropTypes.string,
	indicatorIconSize: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
	indicatorSwitch: PropTypes.bool
};

export default AccordionPanelGroup;
