export default (name, mainStoryName) => `
	<li
		className='gridList-item padding--none align--center' 
		style={{
			width: '100px',
			height: '90px',
			paddingTop:'16px',
			border:'1px dashed lightgray'
		}}>

		<figure
			className='column'
			style={{cursor: 'pointer'}}
			onClick={linkTo('${mainStoryName}', '${name}')} >

			<div className='colum-item'>
				<Icon
					shape='${name}'
					size='s'/>
			</div>
			<figurecaption
				className='column-item--shrink text--labelSecondary padding--top align--center'
				style={{lineHeight: '1rem'}}>
				${name}
			</figurecaption>

		</figure>

	</li>
`;

