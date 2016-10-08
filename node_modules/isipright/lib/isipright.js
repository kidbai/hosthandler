var IPISRIGHT;

var oneIpCheck = function (ip){
        var newIp = ip.split('.');
        if(newIp.length !== 4){
            IPISRIGHT = false;
        }
        newIp.forEach(function(value, index) {
            value = parseInt(value);
            if (index === 3) {
                if(value === 0 || value === 255){
                    IPISRIGHT = false;
                }
            }
            if(value > 254 || isNaN(value) || value === ''){
                IPISRIGHT = false;
            }
        });
    };

exports.check = function (ip) {
        IPISRIGHT = true;
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
