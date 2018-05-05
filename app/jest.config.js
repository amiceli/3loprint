module.exports = {
	"collectCoverage": true,
	"collectCoverageFrom": [
		"src/**/*.{js,vue}",
		"!**/node_modules/**"
	],
	moduleFileExtensions: [
		'js',
		'jsx',
		'json',
		'vue'
	],
	coverageReporters : ["json"],
	transform: {
		'^.+\\.vue$': 'vue-jest',
		'.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
		'^.+\\.jsx?$': 'babel-jest'
	},
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1'
	},
	snapshotSerializers: [
		'jest-serializer-vue'
	],
	testMatch: [
		'<rootDir>/(tests/unit/**/*.spec.(ts|tsx|js)|**/__tests__/*.(ts|tsx|js))'
	]
};
