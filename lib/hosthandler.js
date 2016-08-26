var exec = require('child_process').exec;
var hostPath = '/etc/hosts';
var util = require('util');

var fs = require('fs');
var readline = require('readline');
var EventProxy = require('eventproxy');
var ep = new EventProxy();

var bufferArr = []; // 需要处理的host
var newHostArr = []; // 添加注释处理过后的host
var host; // 需要更新的host
var hostExist = false; // host是否存在

exports.update = function(hostip, hostname) {
    var rl = readline.createInterface({
      input: fs.createReadStream(hostPath)
    });
    console.log('update hosts...');
    exec('sudo -s', function(err, stdout, stderr){
        if(err){
            console.log('err');
            util.puts(stderr);
        }else {
            console.log('done');
            util.puts(stdout);
        }
    });
    bufferArr = [];
    newHostArr = [];
    rl.on('line', function(line) {
        if(line.indexOf(hostname) != -1){
            bufferArr.push(line);
        }
    }).on('close', function(){
        // 判断hostip和hostname在host是否存在
        newHostArr = bufferArr.map(function(item) {
            if(item.indexOf(hostip) !== -1){
                host = item;  //获取需要匹配的host
                hostExist = true;
            }
            // 注释处理
            if(item.slice(0, 1) !== '#'){
                item = '#' + item.slice(0, 1) + item.slice(1);
            }
            return item;
        });
        // HOST存在
        if(hostExist){
            ep.all('readfile', function(data) {
                fs.writeFile(hostPath, data, 'utf-8', function(err) {
                    if(err) throw err;
                    hostExist = false;
                    console.log('update host done');
                });
            });

            fs.readFile(hostPath, 'utf-8', function(err, data) {
                if(err) throw err;
                var reg = new RegExp(host, 'g');
                var newHostFile = data.replace(reg, hostip + '       ' + hostname);
                bufferArr.forEach(function(el, index) {
                    if(el.indexOf(hostip) !== -1 && el.indexOf(hostname) !== -1){
                    }else {
                        var reg = new RegExp(el, 'g');
                        newHostFile = newHostFile.replace(reg, newHostArr[index]);
                    }
                });
                ep.emit('readfile', newHostFile);
            });
        }else {
            ep.all('readfile', function(data) {
                fs.writeFile(hostPath, data, 'utf-8', function(err) {
                    if(err) throw err;
                    console.log('update host done');
                });
            });

            fs.readFile(hostPath, 'utf-8', function(err, data) {
                if(err) throw err;
                var newHostFile = data;
                bufferArr.forEach(function(el, index) {
                    var reg = new RegExp(el, 'g');
                    newHostFile = newHostFile.replace(reg, newHostArr[index]);
                });
                ep.emit('readfile', newHostFile.concat('\n' + hostip + '       ' + hostname));
            });
        }

    });
};
