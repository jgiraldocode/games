module.exports = {
	moduleNameMapper: {
		'\\.css$': 'identity-obj-proxy',
	},
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	testMatch: ['**/*.test.ts'],
	setupFiles: ['jest-canvas-mock'],
	verbose: true
};
