import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

export const ACCORDIONPANELGROUP_CLASS = 'accordionPanelGroup';

/**
 * Determines if the passed in value is a primitive type
 * @param {any} value
 * @return {boolean} True if value is a primitive type
 */
export const isPrimitive = value =>
	['object', 'function'].indexOf(typeof value) === -1;

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
		const panelStates = this.getPanelStates();
		this.setState({ panelStates });
	}

	/**
	 * React lifecyle method which provides an opportunity to compare current props
	 * with incoming props.
	 * @param {Object} nextProps the next form values the ui will receive
	 * @return {undefined}
	 */
	componentWillReceiveProps(nextProps) {
		const { accordionPanels: currentPanels } = this.props;
		const { accordionPanels: nextPanels } = nextProps;
		let panelPropsHaveChanged = false;

		nextPanels.forEach((panel, index) => {
			const nextPanelProps = panel.props;
			const currentPanelProps = currentPanels[index].props;

			Object.keys(nextPanelProps).forEach(key => {
				// Don't waste time if we already know at least one prop
				// on any panel has changed
				if (panelPropsHaveChanged) {
					return;
				}

				if (
					isPrimitive(nextPanelProps[key]) &&
					nextPanelProps[key] !== currentPanelProps[key]
				) {
					panelPropsHaveChanged = true;
				}
			});
		});

		if (panelPropsHaveChanged) {
			this.accordionPanels = nextProps.accordionPanels.map(
				this.initPanel,
				this
			);
			const panelStates = this.getPanelStates();
			this.setState({ panelStates });
		}
	}

	/**
	 * Get a mapping of panels and their open/closed state
	 * @return {object} Panel open state keyed by panel id
	 */
	getPanelStates() {
		return this.accordionPanels.reduce(function(stateObj, panel) {
			stateObj[panel.props.clickId] = panel.props.isOpen;
			return stateObj;
		}, {});
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
		const panelStates =
			!this.props.multiSelectable && isOpen
				? Object.keys(this.state.panelStates).reduce((stateObj, clickId) => {
						stateObj[clickId] = parseInt(clickId) === clickedPanelId;
						return stateObj;
					}, {})
				: {
						...this.state.panelStates,
						[clickedPanelId]: isOpen,
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

		return React.cloneElement(panel, panelProps, panel.props.children);
	}

	/**
	 * @description clones the panels with the appropriate isOpen state, panel props (clickId etc), and
	 * the props of the updatedPanel that have come in from parent
	 * @param {Array} updatedPanels - the accordionPanels prop received
	 * @returns {Array} `AccordionPanel` components with the correct value for `isOpen` prop
	 */
	cloneAccordionPanels(updatedPanels) {
		this.accordionPanels = this.accordionPanels.map((panel, i) => {
			// do not overwrite new panelContent
			const {
				panelContent, // eslint-disable-line no-unused-vars
				...other
			} = panel.props;
			return React.cloneElement(updatedPanels[i], {
				...other,
				isOpen: this.state.panelStates[panel.props.clickId],
			});
		});
	}

	render() {
		const {
			accordionPanels,
			panelContent, // eslint-disable-line no-unused-vars
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
		// passing accordionPanels to pass on any updated props
		this.cloneAccordionPanels(accordionPanels);

		const classNames = cx(ACCORDIONPANELGROUP_CLASS, 'list', className);

		return (
			<ul
				role="tabList"
				aria-multiselectable={multiSelectable}
				className={classNames}
				{...other}
			>
				{this.accordionPanels.map((panel, i) => (
					<li key={i} className="list-item flush--top">
						{panel}
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
