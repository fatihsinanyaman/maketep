const path = require('path');

module.exports = {
	baseUrl: '/team/',
	configureWebpack: {
		resolve: {
			alias: {
				"@": path.resolve(__dirname, 'src/')
			}
		}
	}
};