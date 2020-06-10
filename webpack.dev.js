const {resolve} = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	output: {
		path: resolve(__dirname, 'public'),
		filename: 'js/[name].bundle.js'
	},
	devServer: {
		contentBase: resolve(__dirname, 'public'),
		hot: true,
		port: 3000,
		open: true,
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /.css$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: true
						}
					}
				]
			}
		]
	}
});
