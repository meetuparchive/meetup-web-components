import React from 'react';
import cx from 'classnames';

import Chunk from './Chunk';
import Flex from './Flex';
import FlexItem from './FlexItem';
import Icon from './Icon';

export const PANEL_CLASS = 'accordionPanel';
export const ACTIVEPANEL_CLASS = 'accordionPanel--active';

/**
 * @module AccordionPanel
 */
class AccordionPanel extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			open: this.props.isOpen
		};

		this._handleToggle = this._handleToggle.bind(this);
	}

	/**
	 * @returns {undefined}
	 *
	 * Updates state to toggle `AccordionPanel` open and closed
	 */
	_handleToggle(){
		const newState = !this.state.open;
		const { setClickedPanel } = this.props;

		if (setClickedPanel) {
			setClickedPanel(this);
		}

		this.setState({
			height: `${newState * this.content.getBoundingClientRect().height}px`,
			open: newState
		});

	}

	/**
	 * @returns {undefined}
	 *
	 * Sets height of `AccordionPanel` to be appear open or closed when mounting
	 */
	componentDidMount() {
		this.setState({
			height: `${this.state.open * this.content.getBoundingClientRect().height}px`
		});
	}

	/**
	 * @returns {undefined}
	 *
	 * Updates state to toggle `AccordionPanel` open and closed
	 */
	componentWillUpdate(nextProps, nextState) {
		if (nextProps.isOpen !== this.state.open) {
			this.setState({
				open: nextProps.isOpen,
				height: `${nextProps.isOpen * this.content.getBoundingClientRect().height}px`
			});
		}
	}

	render() {
		const {
			isOpen, // eslint-disable-line no-unused-vars
			name,
			panelContent,
			panelId, // eslint-disable-line no-unused-vars
			setClickedPanel, // eslint-disable-line no-unused-vars
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
				PANEL_CLASS,
				{
					[ACTIVEPANEL_CLASS]: this.state.open,
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
			<li
				className='list-item'
				key={panelId}
				>
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
								onClick={this._handleToggle}>
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
						onClick={this._handleToggle}
						shrink
						>
						<Icon
							shape={iconShape}
							size={triggerIconSize} />
					</FlexItem>

				</Flex>
			</li>
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
	panelContent: React.PropTypes.element,
	panelId: React.PropTypes.number,
	triggerIconAlign: React.PropTypes.string,
	triggerIconShape: React.PropTypes.string,
	triggerIconShapeActive: React.PropTypes.string,
	triggerIconSize: React.PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
	triggerLabel: React.PropTypes.string
};

export default AccordionPanel;
