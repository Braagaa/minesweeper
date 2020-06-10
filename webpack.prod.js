const merge = require('webpack-merge');
const {resolve} = require('path');
const common = require('./webpack.common.js');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
	mode: 'production',
	devtool: 'source-map',
	output: {
		path: resolve(__dirname, 'public'),
		filename: 'js/[name].[contentHash].bundle.js'
	},
	optimization: {
		minimizer: [
			new OptimizeCssAssetsPlugin(),
			new TerserPlugin(),
		],
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'initial'
				}
			}
		}
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[contentHash].css'
		}),
		new CleanWebpackPlugin(),
	],
	module: {
		rules: [
			{
				test: /.css$/i,
				use: [
					MiniCssExtractPlugin.loader,
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
