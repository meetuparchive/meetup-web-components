export default (name) => {
	const instanceName = name.replace(/^[A-Z]/, (firstLetter) => firstLetter.toLowerCase());
	const instanceNode = `${instanceName}Node`;
	const containerName = `${name}Container`;
	const component =`<${containerName} />`;

	return `import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ${containerName} from './${containerName}';

describe('${containerName}', function() {

	it('exists', function() {
		const ${instanceName} = TestUtils.renderIntoDocument(${component});
		const ${instanceNode} = ReactDOM.findDOMNode(${instanceName});

		expect(${instanceNode}).not.toBeNull();
	});

});
`;
};

