module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: { '@': './src' },
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        },
      ],
      // No explicit worklets/reanimated plugin here: the `nativewind/babel`
      // preset above (react-native-css-interop) already applies
      // react-native-worklets/plugin. Adding it again risks the same
      // transform running twice.
    ],
  };
};
