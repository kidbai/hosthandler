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
    var newHostArr;
    var bufferHostArr = oldHost;
    for(var i = 0; i < newHostip.length; i++) {
        if(i > 0){
            bufferHostArr = newHostArr;
        }
        var MATCH = false;
        // console.log(bufferHostArr);
        newHostArr = bufferHostArr.map(function (hostItem, index) {
            var indexItem;  // 匹配的host
            var returnItem; // return value
            if(hostItem.indexOf(newHostName[i]) !== -1){
                // 判断hostip是否匹配
                if(hostItem.indexOf(newHostip[i]) !== -1){
                    MATCH = true;
                    // 是否被注释
                    if(hostItem.indexOf('#') !== -1){
                        indexItem = hostItem.substring(hostItem.indexOf('#') + 1);
                    }
                }else {
                    if(hostItem.indexOf('#') === -1){
                        indexItem = '#' + hostItem;
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
        if(!MATCH){
            newHostArr.push(newHostip[i] + '        ' + newHostName[i]);
        }
    }
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
        var newHost = getNewHostArr(oldHost, hostip, hostname);
        fs.writeFile(hostPath, newHost, 'utf-8', function (err) {
            if(err) {
                throw err;
            }
            if(callback && typeof(callback) === 'function'){
                callback();
            }
        });

    });
};
