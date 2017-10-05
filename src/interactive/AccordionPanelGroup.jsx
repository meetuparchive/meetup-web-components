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
			clickedPanel: null
		};

		this.clonePanel = this.clonePanel.bind(this);
		this.setClickedPanel = this.setClickedPanel.bind(this);

		this.accordionPanels = this.props.accordionPanels.map(this.clonePanel);
	}

	/**
	 * @param clickedPanel is the `AccordionPanel` component passed in from `_handleToggle`
	 * @returns {undefined}
	 *
	 * Keeps track of the clicked panel in order to support AccordionPanelGroups that only
	 * have one panel open at a time.
	 */
	setClickedPanel(clickedPanel) {
		if (!this.props.multiSelectable) {
			this.setState({ clickedPanel });
		}
	}

	/**
	 * @param {Object} accordionPanel - `AccordionPanel` components to clone
	 * @param {number} i - index of the `AccordionPanel`
	 * @param {boolean} isOpen - whether the `AccordionPanel` is open or not
	 * @returns {Array} `AccordionPanel` components with props from `AccordionPanelGroup`
	 */
	clonePanel(accordionPanel, key, isOpen) {
		const panelProps = {
			key,
			indicatorAlign: this.props.indicatorAlign,
			indicatorIcon: this.props.indicatorIcon,
			indicatorIconActive: this.props.indicatorIconActive,
			indicatorSwitch: this.props.indicatorSwitch,
			className: accordionPanel.props.className,
			setClickedPanel: this.setClickedPanel,
			isOpen: accordionPanel.props.isOpen
		};
		return React.cloneElement(accordionPanel, panelProps);
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
	indicatorIcon: PropTypes.element,
	indicatorIconActive: PropTypes.element,
	indicatorIconSize: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
	indicatorSwitch: PropTypes.bool
};

export default AccordionPanelGroup;
