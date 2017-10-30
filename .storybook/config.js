import { configure, setAddon } from '@storybook/react';
import '../assets/scss/storybook.scss';
import infoAddon from '@storybook/addon-info';

const componentStories = require.context('../src', true, /\.story\.jsx$/);

function loadStories() {
	componentStories.keys().forEach(componentStories);
}

setAddon(infoAddon);

configure(loadStories, module);
