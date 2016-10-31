const fs = require('fs');
const path = require('path');
require('babel-register');  // process all further imports through babel

const ICONS_PATH = path.resolve(__dirname, '../icons');
const FOUNDATION_PATH = path.resolve(__dirname, '../src');

function generateIconStory() {
	'use strict';

	const storyName = 'Icon Library';

	const iconRefTpl = require('./templates/icon-library/iconRef.jsx').default;
	const iconStoryTpl = require('./templates/icon-library/iconStory.jsx').default;

	// ------
	console.log('Building icon stories...');

	// generate list of SVG Icon Shapes based on SVG only files in asset directory
	const svgTest = /^.+?\.svg/;
	const { iconRefs, iconStories } = fs.readdirSync(ICONS_PATH)
		.filter(filename => svgTest.test(filename))
		.map(filename => filename.replace('.svg', ''))
		.reduce((acc, iconName) => {
			acc.iconRefs.push(iconRefTpl(iconName, storyName));
			acc.iconStories.push(iconStoryTpl(iconName));

			return acc;
		}, {
			iconRefs: [],
			iconStories: []
		});


	// ------
	// write generated stories to icon library file
	const filepath = path.resolve(FOUNDATION_PATH, 'iconLibrary.story.jsx');
	console.log('Writing component story', filepath);

	fs.writeFileSync(
		filepath,
		require('./templates/icon-library/story.jsx').default(storyName, iconRefs.join(''), iconStories.join(''))
	);
}

generateIconStory();
