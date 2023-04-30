const cli = require('node-cli-params');

const execSync = require('child_process').execSync;

const url = `curl -XGET 'https://api.telegram.org/bot2120629951:AAEPDlx0K5GZaDgeUfzb0MPdE5cNiiQjxh0/sendMessage?chat_id=479218657&text=${encodeURI(cli.getKey('text'))}'`;

execSync(url, { encoding: 'utf-8' });
