'use strict';
const webpack = require('webpack');
const withLess = require('@zeit/next-less');
const path = require('path');

const baseURL = "http://127.0.0.1:3000";

module.exports = withLess({
	cssModules: true,
	webpack(config) {
		config.plugins.push(new webpack.DefinePlugin({
			'baseURL': JSON.stringify(baseURL)
		  }));
		return config;
	},
});
