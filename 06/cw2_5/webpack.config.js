var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "public/index.html"),
			filename: path.resolve(__dirname, "dist/index.html")
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "public/subpage.html"),
			filename: path.resolve(__dirname, "dist/subpage.html")
		}),
		new MiniCssExtractPlugin({
			filename: 'style.css',
		}),
	],
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					'css-loader',
					'sass-loader',
				],
			},
		],
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		port: 9000,
	}
};