## Base info

Hosthandler can cover a old host and add a new host.

## Usage

    npm install hosthandler
    var hosthandler = require('hosthandler');

    hosthandler.update('127.0.0.1', 'wwww.iamhosthandler.com');

    hosthandler.update('127.0.1.6', 'wwww.iamhosthandlers.com', function () {
        fs.readFile('/etc/hosts', 'utf-8', function(err, data) {
            console.log(data);
        });
    });

    hosthandler.update(['127.0.0.9', '11.11.11.11'], ['wwww.iamhosthandler.com', 'www.isipright.com']);

    hosthandler.update(['127.0.0.9', '11.11.11.11'], ['wwww.iamhosthandler.com', 'www.isipright.com'], function () {
        fs.readFile('/etc/hosts', 'utf-8', function(err, data) {
            console.log(data);
        });
    });

## ATTENTION

Hosthandler can not update the host file if permission not allow.

**sudo node app.js**

## LICENSE

MIT
