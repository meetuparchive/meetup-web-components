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

		this.accordionPanels = this.props.accordionPanels.map(this.initPanel, this);
		this.cloneAccordionPanels = this.cloneAccordionPanels.bind(this);
	}

	/**
	 * @description sets the initial panelStates object based on panel props
	 */
	componentWillMount() {
		// this will be an object in the form [clickId]: isOpen
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
	 * @description inits a panel with props from the group and individual panel,
	 * which is then stored as part of accordionPanels array
	 * @param {Object} accordionPanel - `AccordionPanel` components to clone
	 * @param {number} i - index of the `AccordionPanel` used as the key
	 * @returns {Component} `AccordionPanel` component with props from `AccordionPanelGroup`
	 */
	initPanel(panel, index) {
		const isOpen = panel.props.isOpen || false,
			clickId = index;

		const panelProps = {
			indicatorAlign: this.props.indicatorAlign,
			indicatorIcon: this.props.indicatorIcon,
			indicatorIconActive: this.props.indicatorIconActive,
			indicatorSwitch: this.props.indicatorSwitch,
			isOpen,
			clickId,
			setClickedPanel: this.setPanelStates.bind(this),
		};

		return React.cloneElement(panel, panelProps);
	}

	/**
	 * @returns {Array} `AccordionPanel` components with the correct value for `isOpen` prop
	 */
	cloneAccordionPanels() {
		this.accordionPanels = this.accordionPanels.map((panel, i) =>
			React.cloneElement(panel, { isOpen: this.state.panelStates[panel.props.clickId] })
		);
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

		// gives us the correct isOpen prop from state
		this.cloneAccordionPanels();

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
					this.accordionPanels.map((panel, i) => (
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
