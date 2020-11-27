const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  webpack: (config) => {
    config.target = 'electron-renderer';
    config.module.rules = [
      ...(config.module.rules || []),
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|ico)$/,
        use: 'url-loader?limit=100000',
      },
    ];

    return config;
  },
  env: {
    environment: 'production',
    version: '0.1',
  },
});
