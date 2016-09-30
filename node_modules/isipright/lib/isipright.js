var IPISRIGHT = true;

var oneIpCheck = function (ip){
        var newIp = ip.split('.');
        if(newIp.length !== 4){
            IPISRIGHT = false;
        }
        newIp.forEach(function(value) {
            if(value < 0 || value > 255 || isNaN(value)){
                IPISRIGHT = false;
            }
        });
    };

exports.check = function (ip) {
        if(typeof(ip) === 'string'){
            oneIpCheck(ip);
        }
        if(typeof(ip) === 'object' && ip instanceof Array && ip.constructor === Array){
            ip.forEach(function(value) {
                oneIpCheck(value);
            });
        }
        if(!IPISRIGHT){
            return false;
        }
        return true;
    };
