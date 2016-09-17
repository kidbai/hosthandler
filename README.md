Hosthandler can cover a old host and add a new host.

## Base info

If the host exist, Hosthander will comment the exist host. If the host not exist, a new host will be create.

## Usage
    npm install host_handler
    var host_handler = require('hosthandler');
    host_handler.update('127.0.0.1', 'wwww.iamhosthandler.com');

## ATTENTION

Hosthandler can not update the host file if permission not allow.

**sudo node app.js**
