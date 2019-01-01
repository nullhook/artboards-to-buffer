module.exports = {
	entry: [
		'react-hot-loader/patch',
		'./src/app/index'
  	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: ['react-hot-loader/webpack', 'babel-loader']
			}
		]
	}
};
