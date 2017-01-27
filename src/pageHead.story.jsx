import React from 'react';
import { Link } from 'react-router';
import { storiesOf, action } from '@kadira/storybook';
import { InfoWrapper } from './utils/storyComponents';
import { decorateWithLocale } from './utils/decorators';
import PageHead from './PageHead';
import PageActionButton from './PageActionButton';
import Popover from './Popover';
import Tabs from './Tabs';

const logSelection = e => {
	action(`Selected option ${e.target}`);
};

storiesOf('PageHead', module)
	.addDecorator(decorateWithLocale)
	.addWithInfo(
		'default',
		'This is the basic usage with the component.',
		() => (
			<InfoWrapper style={{border:'1px dotted red', justifyContent: 'left', width:'100%'}}>
				<PageHead title='Sirloin short ribs rump ham turducken pork chop drumstick' />
			</InfoWrapper>
		)
	)
	.add('title and subtitle', () => (
		<div style={{border:'1px dotted red', width:'100%'}}>
			<PageHead
				title='Sirloin short ribs rump ham turducken pork chop drumstick'
				subtitle='I am a subtitle'
			/>

			<PageHead
				title='Sirloin short ribs rump ham turducken pork chop drumstick'
				subtitle={<span>I am a subtitle with a <a href='#' className='link'>link</a></span>}
			/>
		</div>
	))
	.add('title and actions', () => {
		const menu = [
			<PageActionButton icon='search' label='Search' />,
			<PageActionButton icon='edit' label='Edit' />,
		];
		return (
			<div style={{border:'1px dotted red', width:'100%'}}>
				<PageHead title='Sirloin short ribs rump ham turducken pork chop drumstick' menuItems={menu} />
			</div>
		);
	})
	.add('title and actions row menu + popover', () => {
		const menu = [
			<PageActionButton icon='search' label='Search' />,
			<PageActionButton icon='edit' label='Edit' />,
			<Popover
				align='left'
				trigger={
					<PageActionButton icon='overflow' label='More' />
				}
				menuItems={[
					<Link to='somepath/' onClick={logSelection}>First option</Link>,
					<Link to='somepath/' onClick={logSelection}>Second option</Link>,
					<Link to='somepath/' onClick={logSelection}>Third option</Link>,
				]}
			/>
		];
		return (
			<div style={{border:'1px dotted red', width:'100%'}}>
				<PageHead title='Sirloin short ribs rump ham turducken pork chop drumstick' menuItems={menu} />
			</div>
		);
	})
	.add('title and actions column menu + popover', () => {
		const menu = [
			<PageActionButton icon='search' label='Search' stackedIcon />,
			<PageActionButton icon='edit' label='Edit' stackedIcon />,
			<PageActionButton icon='location' label='Location' stackedIcon />,
			<Popover
				align='left'
				trigger={
					<PageActionButton icon='overflow' label='More' stackedIcon />
				}
				menuItems={[
					<Link to='somepath/' onClick={logSelection}>First option</Link>,
					<Link to='somepath/' onClick={logSelection}>Second option</Link>,
					<Link to='somepath/' onClick={logSelection}>Third option</Link>,
				]}
			/>
		];
		return (
			<div style={{border:'1px dotted red', width:'100%'}}>
				<PageHead title='Sirloin short ribs rump ham turducken pork chop drumstick' menuItems={menu} />
			</div>
		);
	})
	.add('title and actions column & short menu + popover', () => {
		const menu = [
			<PageActionButton icon='search' label='Search' stackedIcon short />,
			<PageActionButton icon='edit' label='Edit' stackedIcon short />,
		];
		return (
			<div style={{border:'1px dotted red', width:'100%'}}>
				<PageHead title='Sirloin short ribs rump ham turducken pork chop drumstick' menuItems={menu} />
			</div>
		);
	})
	.add('With title, actions + popover and children content', () => {
		const menu = [
			<PageActionButton icon='search' label='Search' />,
			<PageActionButton icon='edit' label='Edit' />,
			<Popover
				align='left'
				trigger={
					<PageActionButton icon='overflow' label='More' stackedIcon />
				}
				menuItems={[
					<Link to='somepath/' onClick={logSelection}>First option</Link>,
					<Link to='somepath/' onClick={logSelection}>Second option</Link>,
					<Link to='somepath/' onClick={logSelection}>Third option</Link>,
				]}
			/>
		];
		return (
			<div style={{border:'1px dotted red', width:'100%'}}>
				<PageHead title='Sirloin short ribs rump ham turducken pork chop drumstick' menuItems={menu}>
					<Tabs
						className='padding--top'
						tabs={[
							<Link>First tab</Link>,
							<Link isSelected>Second tab</Link>,
							<Link>Third tab</Link>,
						]}
					/>
				</PageHead>
			</div>
		);
	});
