const fs = require('fs');

console.log('开始删除theme中的js文件...')
fs.readdirSync('./dist').forEach(function(file) {
  fs.stat(`./dist/${file}`, function(err, stats) {
    if (stats.isDirectory ()) {
      fs.readdirSync(`./dist/${file}`).forEach(function(item) {
        if (/.*\.js$/.test(item)) fs.unlinkSync(`./dist/${file}/${item}`);
      })
    }
  })
});
console.log('done!');
