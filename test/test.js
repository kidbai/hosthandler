var hosthandler = require('../index');
var fs = require('fs');

/*
 tc1
 */
// hosthandler.update('127.0.1.5', 'wwww.iamhosthandlers.com');

/*
 tc2
 */
// hosthandler.update('127.0.1.6', 'wwww.iamhosthandlers.com', function () {
//     fs.readFile('/etc/hosts', 'utf-8', function(err, data) {
//         console.log('-----');
//         console.log(data);
//     });
// });

/*
 tc3
 */
// hosthandler.update(['127.0.0.9', '11.11.11.11'], ['wwww.iamhosthandler.com', 'www.isipright.com']);

/*
 tc4
 */
hosthandler.update(['127.0.0.9', '11.11.11.11'], ['wwww.iamhosthandler.com', 'www.isipright.com'], function () {
    fs.readFile('/etc/hosts', 'utf-8', function(err, data) {
        console.log(data);
    });
});
// hosthandler.update(['127.0.0.1', '11.11.11.a1'], ['wwww.iamhosthandler.com', 'www.isipright.com']);
