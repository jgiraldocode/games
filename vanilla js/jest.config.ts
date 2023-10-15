module.exports = {
	moduleNameMapper: {
		'\\.css$': 'identity-obj-proxy',
		'^@/(.*)$': '<rootDir>/src/$1'
	},
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	testMatch: ['**/*.test.ts'],
	setupFiles: ['jest-canvas-mock'],
	verbose: true,
	modulePaths: ['<rootDir>/src'],
};
