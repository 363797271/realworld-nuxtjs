// windows下使用pm2启动的脚本（解决windows下pm2 start npm -- start 失败的问题）
const cmd = require('node-cmd')
cmd.run('npm run start')
