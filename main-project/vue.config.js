// vue cli 配置

// 增加环境变量
process.env.VUE_APP_VERSION = require('./package.json').version;
console.log(`当前接口环境：${process.env.VUE_APP_API}`);
const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);
const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  lintOnSave: false,
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true,
  publicPath: './',
  devServer: {
    port: 9090,
    hot: true,
    disableHostCheck: true
  },
  css: {
    loaderOptions: {
      // 设置 scss 公用变量文件
      sass: {
        prependData: `@import '~@/assets/style/variables.scss';`
      }
    },
    extract:
      process.env.NODE_ENV === 'production'
        ? {
          ignoreOrder: true
        }
        : false
  },
  transpileDependencies: [],
  chainWebpack: (config) => {
    // 配置别名
    config.resolve.alias.set('@', resolve('src'));
    // 加载svg
    config.module.rule('svg').exclude.add(resolve('src/assets/icons')).end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();
    // 生产环境，开启js\css压缩
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin').use(
        new CompressionPlugin({
          test: /\.(js|css|less)$/, // 匹配文件名
          threshold: 102400, // 对超过10k的数据压缩
          minRatio: 0.8,
          deleteOriginalAssets: false // 删除源文件
        })
      );
      config.plugin('limitChunkCountPlugin').use(
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 15,
          minChunkSize: 100
        })
      );
    }
  },
  // 不输出 map 文件
  productionSourceMap: false
};
