module.exports = {
	lintOnSave: true,
	devServer: {
		contentBase : '/dist',
		proxy: "http://localhost:8000"
	}
};
