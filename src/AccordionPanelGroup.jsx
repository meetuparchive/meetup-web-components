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
		this.setState({ clickedPanel });
	}

	/**
	 * @param {Object} accordionPanel - `AccordionPanel` components to clone
	 * @param {number} i - index of the `AccordionPanel`
	 * @param {boolean} isOpen - whether the `AccordionPanel` is open or not
	 * @returns {Array} `AccordionPanel` components with props from `AccordionPanelGroup`
	 */
	clonePanels(accordionPanel, i, isOpen) {
		const toCamelCase = (str) => str.slice(0,20).replace(/-(\w)/g, g => g[1].toUpperCase());

		return (

				React.cloneElement(accordionPanel,
					{
						key: i,
						panelId: i,
						triggerIconAlign: this.props.triggerIconAlign,
						triggerIconShape: this.props.triggerIconShape,
						triggerIconShapeActive: this.props.triggerIconShapeActive,
						triggerIconSize: this.props.triggerIconSize,
						isAnimated: this.props.isAnimated,
						name: toCamelCase(accordionPanel.props.triggerLabel),
						className: accordionPanel.props.className,
						setClickedPanel: this.props.multiSelectable ? false : this.setClickedPanel,
						isOpen: isOpen,
					}
				)

		);
	}

	/**
	 * @returns {Array} `AccordionPanel` components with the correct value for `isOpen` prop
	 */
	renderAccordionPanels() {
		this.accordionPanels = this.accordionPanels.map((accordionPanel, i) => {
			const isOpen = accordionPanel.props.isOpen && this.state.clickedPanel == null;

			return this.clonePanels(accordionPanel, i, isOpen);
		});

		return this.accordionPanels;
	}

	render() {
		const {
			isAnimated, // eslint-disable-line no-unused-vars
			accordionPanels, // eslint-disable-line no-unused-vars
			triggerIconAlign, // eslint-disable-line no-unused-vars
			triggerIconShape, // eslint-disable-line no-unused-vars
			triggerIconShapeActive, // eslint-disable-line no-unused-vars
			triggerIconSize, // eslint-disable-line no-unused-vars
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
					{this.renderAccordionPanels()}
			</ul>
		);
	}
}

AccordionPanelGroup.defaultProps = {
	multiSelectable: true,
	triggerIconAlign: 'right',
	triggerIconShape: 'chevron-down',
	triggerIconSize: 'xs',
};


AccordionPanelGroup.propTypes = {
	accordionPanels: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
	multiSelectable: React.PropTypes.bool,
	triggerIconAlign: React.PropTypes.string,
	triggerIconShapeActive: React.PropTypes.string,
	triggerIconShape: React.PropTypes.string,
	triggerIconSize: React.PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
};

export default AccordionPanelGroup;
