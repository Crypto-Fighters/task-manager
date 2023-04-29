const url = `curl -XGET 'https://api.telegram.org/bot2120629951:AAEPDlx0K5GZaDgeUfzb0MPdE5cNiiQjxh0/sendMessage?chat_id=479218657&text=qwe'`;

const execSync = require('child_process').execSync;

const output = execSync(url, { encoding: 'utf-8' });
