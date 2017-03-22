import React from 'react';
import cx from 'classnames';

export const ACCORDIONPANELGROUP_CLASS = 'accordionPanelGroup';
/**
 * @module AccordionPanelGroup
 */
class AccordionPanelGroup extends React.Component {
	constructor(props) {
		super(props);
		this.accordionPanels = this.props.accordionPanels.map((accordionPanel, i) => {
			return this.clonePanels(accordionPanel, i, accordionPanel.props.isOpen);
		});

		this.state = {
			clickedPanel: null
		};

		this.clonePanels = this.clonePanels.bind(this);
		this.setClickedPanel = this.setClickedPanel.bind(this);
	}

	/**
	 * @param clickedPanel is the `AccordionPanel` component passed in from `_handleToggle`
	 * @returns {undefined}
	 *
	 * Keeps track of the clicked panel in order to support AccordionPanelGroups that only
	 * have one panel open at a time.
	 */
	setClickedPanel(clickedPanel) {
		console.warn(this);
		this.setState({ clickedPanel });
	}

	/**
	 * @param {Object} accordionPanel - `AccordionPanel` components to clone
	 * @param {number} i - index of the `AccordionPanel`
	 * @param {boolean} isOpen - whether the `AccordionPanel` is open or not
	 * @returns {Array} `AccordionPanel` components with props from `AccordionPanelGroup`
	 */
	clonePanels(accordionPanel, i, isOpen) {
		const panelProps = {
			key: i,
			iconAlign: this.props.iconAlign,
			iconSize: this.props.iconSize,
			iconShape: this.props.iconShape,
			iconShapeActive: this.props.iconShapeActive,
			isAnimated: this.props.isAnimated,
			className: accordionPanel.props.className,
			setClickedPanel: this.props.multiSelectable ? false : this.setClickedPanel,
			isOpen: isOpen
		};
		return React.cloneElement(accordionPanel, panelProps);
	}

	/**
	 * @returns {Array} `AccordionPanel` components with the correct value for `isOpen` prop
	 */
	renderAccordionPanels() {
		this.accordionPanels = this.accordionPanels.map((accordionPanel, i) => {
			const isOpen = accordionPanel.props.isOpen;

			/*
			 *if ( !this.props.multiSelectable && this.state.clickedPanel === accordionPanel ) {
			 *   isOpen = false;
			 *}
			 */

			return this.clonePanels(accordionPanel, i, isOpen);
		});

		return this.accordionPanels;
	}

	render() {
		const {
			isAnimated, // eslint-disable-line no-unused-vars
			accordionPanels, // eslint-disable-line no-unused-vars
			iconAlign, // eslint-disable-line no-unused-vars
			iconShape, // eslint-disable-line no-unused-vars
			iconSize,  // eslint-disable-line no-unused-vars
			iconShapeActive, // eslint-disable-line no-unused-vars
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
					this.renderAccordionPanels().map(
						(panel, i) => (
						<li
							key={i}
							className='list-item'>
							{panel}
						</li>
						)
					)
				}
			</ul>
		);
	}
}

AccordionPanelGroup.defaultProps = {
	multiSelectable: true,
	iconAlign: 'right',
	iconShape: 'chevron-down',
	iconSize: 'xs'
};

AccordionPanelGroup.propTypes = {
	accordionPanels: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
	multiSelectable: React.PropTypes.bool,
	iconAlign: React.PropTypes.string,
	iconShape: React.PropTypes.string,
	iconShapeActive: React.PropTypes.string,
	iconSize: React.PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl'])
};

export default AccordionPanelGroup;
