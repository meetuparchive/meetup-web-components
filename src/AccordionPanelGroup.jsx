import _ from 'lodash';
import React from 'react';
import cx from 'classnames';

/**
 * @module AccordionPanelGroup
 */
class AccordionPanelGroup extends React.Component {
	constructor(props) {
		super(props);
		const activePanelsArr = [];

		this.accordionPanels = this.props.accordionPanels.map((accordionPanel, i) => {
			if(accordionPanel.props.isOpen) {
				activePanelsArr.push(i);
			}
			return activePanelsArr;
		});

		this.state = {
			activePanels: activePanelsArr || []
		};
		this._onClickTrigger = this._onClickTrigger.bind(this);
	}

	/**
	 * Document this for PR
	 */
	_onClickTrigger(e, i){
		const index = this.state.activePanels.indexOf(i);
		const activePanelArr = this.state.activePanels;
		const filtered = activePanelArr.filter(panel => i !== activePanelArr.indexOf(i));

		if (index > -1){
			activePanelArr.splice(index, 1);
		} else {
			activePanelArr.push(i);
		}

		if (!this.props.multiSelectable) {
			_.pullAll(activePanelArr, filtered);
		}

		this.setState({
			activePanels: activePanelArr
		});

	}

	renderAccordionPanels() {
		const toCamelCase = (str) => str.slice(0,20).replace(/(?:^\w|[A-Z]|\b\w)/g, (ltr, idx) => idx === 0 ? ltr.toLowerCase() : ltr.toUpperCase()).replace(/\s+/g, '');
		this.accordionPanels = this.props.accordionPanels.map((accordionPanel, i) => {

			return (
				<li
					className='list-item'
					key={i}
				>
					{
						React.cloneElement(accordionPanel,
							{
								triggerIconAlign: this.props.triggerIconAlign,
								triggerIconShape: this.props.triggerIconShape,
								triggerIconShapeActive: this.props.triggerIconShapeActive,
								triggerIconSize: this.props.triggerIconSize,
								animated: this.props.animated,
								name: toCamelCase(accordionPanel.props.triggerLabel),
								className: accordionPanel.props.className,
								isOpen: this.state.activePanels.includes(i),
								onTriggerClick: (e) => this._onClickTrigger(e, i),
							}
						)
					}
				</li>
			);
		});

		return this.accordionPanels;
	}

	render() {
		const {
			animated, // eslint-disable-line no-unused-vars
			accordionPanels, // eslint-disable-line no-unused-vars
			triggerIconAlign, // eslint-disable-line no-unused-vars
			triggerIconShape, // eslint-disable-line no-unused-vars
			triggerIconSize, // eslint-disable-line no-unused-vars
			multiSelectable,
			className,
			...other
		} = this.props;

		const classNames = cx(
			'accordionPanelGroup',
			'list',
			className
		);

		return (
			<ul
				role='tabList'
				aria-multiselectable={multiSelectable}
				className={classNames}
				{...other}>
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
	triggerIconShape: React.PropTypes.string,
	triggerIconSize: React.PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
};

export default AccordionPanelGroup;
