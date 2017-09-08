module.exports = {
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
    ],
  },
  output: {
    filename: 'public/bundle.js',
    path: __dirname,
  },
};
