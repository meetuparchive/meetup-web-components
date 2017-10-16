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

		this.state = { panelStates: {} }; // this will be an object in the form [clickId]: isOpen

		this.clonePanel = this.clonePanel.bind(this);
		this.setPanelStates = this.setPanelStates.bind(this);
		this.accordionPanels = this.props.accordionPanels.map(this.clonePanel);
	}

	/**
	 * @description sets the initial panelStates object based on panel props
	 */
	componentWillMount() {
		const panelStates = this.accordionPanels.reduce(function(stateObj, panel) {
			stateObj[panel.props.clickId] = panel.props.isOpen;
			return stateObj;
		}, {});

		this.setState({ panelStates });
	}

	/**
	 * @description callback called when individual panel is clicked
	 * and keeps track of open states in order to support AccordionPanelGroups that only
	 * have one panel open at a time.
	 * @param {Integer} clickedPanelId the clickId prop of the `AccordionPanel` component
	 * @param {Boolean} isOpen whether to open the panel or not (!props.isOpen of the panel)
	 * @returns {undefined}
	 */
	setPanelStates(clickedPanelId, isOpen) {
		const panelStates = (!this.props.multiSelectable && isOpen) ?
			Object.keys(this.state.panelStates).reduce(
				(stateObj, clickId) => {
					stateObj[clickId] = (parseInt(clickId) === clickedPanelId);
					return stateObj;
				}, {}
			) :
			{
				...this.state.panelStates,
				[clickedPanelId]: isOpen
			};
		this.setState({ panelStates });
	}

	/**
	 * @description inits/clones a panel with props from the group and individual panel,
	 * whhich is then stored as part of accordionPanels array
	 * @param {Object} accordionPanel - `AccordionPanel` components to clone
	 * @param {number} i - index of the `AccordionPanel` used as the key
	 * @returns {Component} `AccordionPanel` component with props from `AccordionPanelGroup`
	 */
	clonePanel(panel, index) {
		// if we've already initialized state for the accordion panels,
		// use the state we've stored, else use original prop
		const panelState = this.state.panelStates && this.state.panelStates[panel.props.clickId];
		const isOpen = (typeof(panelState) === 'undefined') ?
			panel.props.isOpen : panelState;

		const panelProps = {
			key: index,
			indicatorAlign: this.props.indicatorAlign,
			indicatorIcon: this.props.indicatorIcon,
			indicatorIconActive: this.props.indicatorIconActive,
			indicatorSwitch: this.props.indicatorSwitch,
			className: panel.props.className,
			isOpen,
			clickId: panel.props.clickId || index,
			setClickedPanel: this.setPanelStates,
		};

		return React.cloneElement(panel, panelProps);
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
						<li key={i} className='list-item'>
							{panel}
						</li>
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
