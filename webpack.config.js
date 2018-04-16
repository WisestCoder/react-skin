const fs = require('fs');
const path = require('path');
// var glob = require('glob');

module.exports = function(config) {
  // 读取每一个 entry 文件，查找是否 path/index.(xxx).js 括号中的关键词文件存在
  const entry = config.entry;
  const addedEntry = {};
  Object.keys(entry).forEach(function(key) {
    const fileName = entry[key];
    const dirName = path.parse(fileName).dir;
    fs.readdirSync(dirName).forEach(function(file) {
      if (/index\..*\.js/.test(file)) {
        const theme = /index\.(.*)\.js/.exec(file)[1];
        addedEntry[`${theme}/${key}`] = `${dirName}/${file}`;
      }
    });
  });

  config.entry = Object.assign({}, entry, addedEntry);

  config.externals = {
    'react': 'var React',
    'react-dom': 'var ReactDOM',
  };
};
