class Reportor {
    constructor() {
        this.init();
    }

    init() {
        this.reportMsg = {
            msg: '',
            url: '',
            line: '',
            time: '',
        };
        window.onerror = (msg, url, line) => {
            if (msg === this.reportMsg.msg
                && url === this.reportMsg.url
                && line === this.reportMsg.line
            ) return // 连续2次相同错误不重复上报
            this.reportMsg = {
                msg: msg,
                url: url,
                line: line,
                time: +new Date()
            }
            this.send(this.reportMsg)
        }
        console.warn = (function (oriLogFunc, me) {
            return function (str) {
                oriLogFunc.call(console, str);
                me.send({
                    msg: str,
                    url: 'console.warn',
                    line: 'unknow',
                    time: +new Date()
                })
            }
        })(console.warn, this);
    }

    send(data) {
        var xhr = new XMLHttpRequest();
        xhr.open('post', 'http://localhost:8888/report', true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Access-Control-Allow-Origin", '*');
        xhr.send(JSON.stringify(data));
    }

}

window.Reportor = new Reportor()