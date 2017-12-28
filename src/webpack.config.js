module.exports = {
    module: {
      rules: [
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          loader: ExtractTextPlugin
          .extract({ fallback: 'style-loader'
          , use: [ { loader: 'css-loader'
                    , options: { camelCase: true, modules: true, localIdentName: '[path][name]__[local]--[hash:base64:5]' }}]})
        }
      ]
    }
  }