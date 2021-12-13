/* eslint-disable key-spacing */
const URL = {
  MOCK: 'http://localhost:3000',
  LOCAL_UATA: 'https://wwwuata.gdn-app.com',
  LOCAL_UATB: 'https://wwwuatb.gdn-app.com',
  LOCAL_PREPROD: 'https://wwwpreprod.gdn-app.com',
  AUTH_UATA: 'https://auth-v2-gcp.gdn-app.com/',
  AUTH_UATB: 'https://auth2-v2-gcp.gdn-app.com',
  AUTH_PREPROD: 'http://gcp-fortress-preprod.infra-sg.cld:8080/',
  PY_UATA: 'http://pyeongyang-search.qa1-sg.cld',
  PY_UATB: 'http://pyeongyang-search.qa2-sg.cld',
  PY_PREPROD: 'http://pyeongyang-search.preprod-sg.cld',
  SIVA_UATA: 'http://siva-services.qa1-sg.cld',
  SIVA_UATB: 'http://siva-services.qa2-sg.cld',
  SIVA_PREPROD: 'http://siva-services.preprod-sg.cld',
};

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/instore/'
    : '/',
  outputDir: 'dist/instore/',
  assetsDir: 'static',
  devServer: {
    // https: true,
    // Paths
    proxy: {
      '^/backend/search/recommendations' : {
        target: URL.PY_UATA,
        changeOrigin: true,
      },
      '^/backend/oes/': {
        target: URL.LOCAL_UATA,
        changeOrigin: true,
      },
      '^/backend/': {
        target: URL.LOCAL_UATA,
        changeOrigin: true,
      },
      '^/gdn-oauth/token': {
        target: URL.AUTH_UATA,
        changeOrigin: true,
      },
      '/siva-services': {
        target: URL.SIVA_UATA,
        changeOrigin: true,
      },
    },
  },
};
