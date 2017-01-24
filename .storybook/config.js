import { configure, setAddon } from '@kadira/storybook';
import '../assets/scss/storybook.scss';
import infoAddon from '@kadira/react-storybook-addon-info';

const componentStories = require.context('../src', false, /\.story\.jsx$/)

function loadStories() {
	componentStories.keys().forEach(componentStories);
}

setAddon(infoAddon);

configure(loadStories, module);
