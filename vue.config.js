module.exports = {
  devServer: {
//    disableHostCheck: true,
proxy: 'https://localhost:7198',
headers: { "Access-Control-Allow-Origin": "*" }
  },
 

  transpileDependencies: ['vuetify'],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
}
