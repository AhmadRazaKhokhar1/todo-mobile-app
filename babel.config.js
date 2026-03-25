module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};

// https://github.com/firebase/firebase-ios-sdk 
