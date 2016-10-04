const config = {
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": 6,
		"ecmaFeatures": {
			"jsx": true,
			"experimentalObjectRestSpread": true
		},
		"sourceType": "module"
	},
	"env": {
		"browser": true,
		"node": true,
		"jest": true,
		"jasmine": true,
		"es6": true
	},
	"plugins": [
		"react"
	],
	"rules": {
		"array-callback-return": 2,
		"comma-dangle": 0,
		"eol-last": 2,
		"indent": [2, "tab"],
		"jsx-quotes": [1, "prefer-single"],
		"no-console": 0,
		"no-empty-pattern": 2,
		"no-lone-blocks": 2,
		"no-lonely-if": 2,
		"no-multi-spaces": 2,
		"no-negated-condition": 2,
		"no-trailing-spaces": 2,
		"no-unused-vars": [2, { "args": "none" }],
		"no-use-before-define": 2,
		"no-useless-call": 2,
		"no-useless-concat": 2,
		"no-useless-escape": 2,
		"no-var": 2,
		"no-whitespace-before-property": 2,
		"prefer-const": 2,
		"prefer-template": 2,
		"quotes": [2, "single"],
		"quote-props": [2, "as-needed"],
		"require-jsdoc": [2, {
			"require": {
				"FunctionDeclaration":false,
				"ClassDeclaration": true
			}
		}],
		"react/jsx-no-undef": 0,
		"react/jsx-uses-react": 1,
		"react/jsx-uses-vars": 1,
		"react/no-deprecated": 2,
		"react/no-string-refs": 1,
		"react/react-in-jsx-scope": 2,
		"react/jsx-wrap-multilines": 2,
		"react/jsx-boolean-value": 2,
		"react/jsx-equals-spacing": [2, "never"],
		"react/jsx-no-duplicate-props": 2,
		"react/jsx-pascal-case": 2,
		"react/jsx-uses-react": 2,
		"semi": 2,
		"space-in-parens": [2, "never"],
		"spaced-comment": [2, "always"],
		"strict": 0,
	}
};

module.exports = config;

