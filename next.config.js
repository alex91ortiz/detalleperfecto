const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
const withFonts = require('next-fonts');
const withImages = require('next-images');
module.exports = withImages(withCss(withSass(withFonts({
  devIndicators: {
    autoPrerender: true,
  },
  env: {
    FIREBASE_API_KEY: 'AIzaSyC6gusBI_DKohpGg3PVpOBpjcPNnxkVKPw',
    FIREBASE_AUTH_DOMAIN: 'revol-bb930.firebaseapp.com',
    FIREBASE_DATABASE: 'https://revol-bb930.firebaseio.com',
    FIREBASE_PROJECT_ID: 'revol-bb930',
    FIREBASE_STORAGE_BUCKET: 'revol-bb930.appspot.com',
    FIREBASE_SENDER_ID: '60754649641',
    FIREBASE_APP_ID: '1:60754649641:web:7a7e2ecfb352a571687238',
    PORT: 8080
  },
  webpack(config, options) {

    return config;
  }
}))));


