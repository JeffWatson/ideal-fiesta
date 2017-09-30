module.exports = {
  devtool: 'source-map',
  entry: './src/frontend/index.js',
  module: {
    loaders: [
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader', // creates style nodes from JS strings
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'sass-loader', // compiles Sass to CSS
        }],
      },
      {
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
        test: /\.js$/,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'url-loader?limit=10000',
        ],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: __dirname,
    publicPath: 'public/',
  },
};
