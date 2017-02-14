import React from 'react';
import cx from 'classnames';

import Chunk from './Chunk';
import Flex from './Flex';
import FlexItem from './FlexItem';
import Icon from './Icon';

/**
 * @module AccordionPanel
 */
class AccordionPanel extends React.Component {
	/**
	 * Document this for PR
	 */
	constructor(props){
		super(props);
		this.state = {
			open: this.props.isOpen
		};

		this._handleToggle = this._handleToggle.bind(this);
		this._getContentHeight = this._getContentHeight.bind(this);
	}

	/**
	 * Document this for PR
	 */
	_handleToggle(event){
		this.setState({
			open: !this.state.open
		});
	}

	_getContentHeight() {
		return `${this.props.isOpen * this.content.getBoundingClientRect().height}px`;
	}

	componentDidMount() {
		this.setState({
			height: this._getContentHeight()
		});
	}

	componentWillUpdate(nextProps, nextState) {
		if (nextProps.isOpen !== this.state.open) {
			this.setState({
				open: nextProps.isOpen,
				height: this._getContentHeight()
			});
		}
	}

	render() {
		const {
			isOpen, // eslint-disable-line no-unused-vars
			name,
			onTriggerClick,
			panelContent,
			triggerIconShape,
			triggerIconShapeActive,
			triggerIconSize,
			triggerIconAlign,
			triggerLabel,
			isAnimated,
			classNamesActive,
			className,
			...other
		} = this.props;

		const classNames = {
			accordionPanel: cx(
				'accordionPanel',
				{
					'accordionPanel--active': this.state.open,
					[classNamesActive]: this.state.open && classNamesActive
				},
				className
			),
			content: cx(
				{
					'accordionPanel-animator': isAnimated,
					'accordionPanel-animator--collapse': !this.state.open,
					'visibility--a11yHide': !isAnimated && !this.state.open
				}
			)
		};

		const iconShape = this.state.open && triggerIconShapeActive ? triggerIconShapeActive : triggerIconShape;

		return(
			<Flex
				className={classNames.accordionPanel}
				rowReverse={triggerIconAlign === 'left' && 'atAll'}
				{...other}
				>

				<FlexItem>
					<Chunk>
						<button
							role='tab'
							id={`label-${name}`}
							aria-controls={`panel-${name}`}
							aria-expanded={this.state.open}
							aria-selected={this.state.open}
							className='accordionPanel-label display--block span--100'
							onClick={onTriggerClick || this._handleToggle}>
								{triggerLabel}
						</button>
					</Chunk>

					<Chunk
						role='tabpanel'
						aria-labelledby={`label-${name}`}
						aria-hidden={!this.state.open}
						className={classNames.content}
						style={{height: this.state.height}}>
						<div
							className='accordionPanel-content'
							ref={(div) => { this.content = div; }}>
							{panelContent}
						</div>
					</Chunk>
				</FlexItem>

				<FlexItem
					className='accordionPanel-icon'
					onClick={onTriggerClick || this._handleToggle}
					shrink
					>
					<Icon
						shape={iconShape}
						size={triggerIconSize} />
				</FlexItem>

			</Flex>
		);
	}
}

AccordionPanel.defaultProps = {
	triggerIconAlign: 'right',
	triggerIconShape: 'chevron-down',
	triggerIconSize: 'xs',
	isOpen: false
};

AccordionPanel.propTypes = {
	classNamesActive: React.PropTypes.string,
	isOpen: React.PropTypes.bool,
	isAnimated: React.PropTypes.bool,
	name: React.PropTypes.string,
	onTriggerClick: React.PropTypes.func,
	panelContent: React.PropTypes.element,
	triggerIconAlign: React.PropTypes.string,
	triggerIconShape: React.PropTypes.string,
	triggerIconShapeActive: React.PropTypes.string,
	triggerIconSize: React.PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
	triggerLabel: React.PropTypes.string
};

export default AccordionPanel;
