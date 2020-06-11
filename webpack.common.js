const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		app: ["./src/index.tsx"],
		vendor: ["react", "react-dom"]
	},
	resolve: {
		extensions: [".ts", ".tsx", '.js']
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			favicon: './src/images/favicon.ico'
		})
	],
	module: {
		rules: [
			{
				test: /.(js|ts|tsx)$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
				options: {
					cache: false
				}
			},
			{
				test: /\.(ttf|png)$/,
				loader: 'file-loader',
			},
			{
				test: /\.svg$/,
				use: ['@svgr/webpack']
			},
			{
				test: /\.ts(x?)$/,
				exclude: /node_modules/,
				use: [{loader: "ts-loader"}]
			},
		]
	}
};
