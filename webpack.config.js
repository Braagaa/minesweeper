const {resolve} = require('path');

module.exports = {
	devtool: "source-map",
	entry: {
		app: ["./src/index.tsx"],
		vendor: ["react", "react-dom"]
	},
	output: {
		path: resolve(__dirname, 'public'),
		filename: 'js/[name].bundle.js'
	},
	resolve: {
		extensions: [".ts", ".tsx", '.js']
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
};
