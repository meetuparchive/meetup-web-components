export default (name) => `
	.add('${name}', () => (
		<Annotate notes='To use this icon set the shape attribute to "${name}".'>
			<div className="margin--top" style={{width:'180px'}}>
				<h2>Default</h2>
				<figure 
					className='column align--center padding--all'
					style={{border: '1px dashed lightgray'}} >
					<div className='column-item'>
						<Icon
							shape='${name}'
							size='xl' />
					</div>
				</figure>
			</div>

			<div className="margin--top" style={{width:'180px'}}>
				<h2>Inverted</h2>
				<figure 
					className='column align--center' 
					style={{
						border: '1px dashed lightgray'
					}}>
					<div className='column-item'>
						<Inverted>
							<Icon
								shape='${name}'
								size='xl'
								className='padding--all' />
						</Inverted>
					</div>
				</figure>
			</div>
		</Annotate>
	))
`;

