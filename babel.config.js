const removeConsolePlugin = []
if(process.env.NODE_ENV === 'production') {
  removeConsolePlugin.push("transform-remove-console")
}

module.exports = function (api, plugins) {
  const presets = [
    '@vue/cli-plugin-babel/preset'
  ];
  /* Remueve los consoleLog en produccion */
  plugins = removeConsolePlugin,
  api.cache(false)

  return {
    presets,
    plugins
  };
}