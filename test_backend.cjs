const { exec } = require('child_process');
const fs = require('fs');

exec('node backend/server.js', { env: process.env }, (error, stdout, stderr) => {
  fs.writeFileSync('server_debug.log', `STDOUT:\n${stdout}\n\nSTDERR:\n${stderr}\n\nERROR:\n${error ? error.message : 'None'}`);
});
