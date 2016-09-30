var exec = require('child_process').exec,
    hostPath = '/etc/hosts',
    util = require('util'),
    fs = require('fs'),
    readline = require('readline'),
    EventProxy = require('eventproxy'),
    isipright = require('isipright'),
    ep = new EventProxy(),

    oldHost = [], // 添加注释处理过后的host
    host, // 需要更新的host
    hostExist = false, // host是否存在
    SINGLE = true; // 默认更新的host是string类型，false host类型则为array


var getNewHostArr = function(oldHost, hostip, hostname) {
    // to Array
    var newHostip = [];
    var newHostName = [];
    if(SINGLE){
        newHostip[0] = hostip;
        newHostName[0] = hostname;
    }else {
        newHostip = hostip;
        newHostName = hostname;
    }
    console.log(newHostip);
    console.log(newHostName);
    var newHostArr;
    var bufferHostArr = oldHost;
    for(var i = 0; i < newHostip.length; i++) {
        if(i > 0){
            bufferHostArr = newHostArr;
        }
        var MATCH = false;
        newHostArr = bufferHostArr.map(function (hostItem, index) {
            var indexItem;  // 匹配的host
            var returnItem; // return value
            if(hostItem.indexOf(newHostName[i]) !== -1){
                // 判断hostip是否匹配
                if(hostItem.indexOf(newHostip[i]) !== -1){
                    MATCH = true;
                    console.log();
                    // 是否被注释
                    if(hostItem.indexOf('#') !== -1){
                        indexItem = hostItem.substring(hostItem.indexOf('#') + 1);
                    }
                }
            }

            if(indexItem !== undefined){
                returnItem = indexItem;
            }else {
                returnItem = hostItem;
            }
            return returnItem;
        });
        console.log('match');
        console.log(MATCH);
        if(!MATCH){
            console.log('gg');
            newHostArr.push(newHostip[i] + '        ' + newHostName[i]);
        }
    }

    console.log(newHostArr[newHostArr.length - 1]);
    console.log(newHostArr[newHostArr.length - 2]);
    console.log(newHostArr[newHostArr.length - 3]);
    console.log(newHostArr[newHostArr.length - 4]);
    console.log(newHostArr[newHostArr.length - 5]);
    console.log(newHostArr[newHostArr.length - 6]);
    console.log(newHostArr.join('\n'));
    return newHostArr.join('\n');
};


exports.update = function(hostip, hostname, callback) {
    if(!isipright.check(hostip)){
        throw 'IP error';
    }
    // hostip hostname
    if(hostip instanceof Array && hostname instanceof Array){
        SINGLE = false;
        if(hostip.length !== hostname.length){
            throw 'args error';
        }
    }

    // readline
    var rl = readline.createInterface({
      input: fs.createReadStream(hostPath)
    });
    exec('sudo -s', function(err, stdout, stderr){
        if(err){
            util.puts(stderr);
        }else {
            util.puts(stdout);
        }
    });
    oldHost = [];  // init oldHost
    rl.on('line', function(line) {
            oldHost.push(line);
    }).on('close', function(){
        // 获取新host
        getNewHostArr(oldHost, hostip, hostname);
        return false;









        // new host cover
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
        return false;
        // HOST存在
        if(hostExist){
            ep.all('readfile', function(data) {
                fs.writeFile(hostPath, data, 'utf-8', function(err) {
                    if(err) throw err;
                    hostExist = false;
                    if(callback && typeof(callback) === 'function'){
                        callback();
                    }
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
                    if(callback && typeof(callback) === 'function'){
                        callback();
                    }
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
