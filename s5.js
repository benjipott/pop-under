if (window.MgPop === undefined) {
    window.MgPop = new (function() {
        p_settings.domain = window.location.host;
        p_settings.removeTarget = false;
        p_settings.prevId = 0;
        p_settings.prevTime = 0;
        p_settings.width = p_settings.width ? p_settings.width : 0;
        p_settings.height = p_settings.height ? p_settings.height : 0;
        p_settings.QQ = p_settings.QQ ? p_settings.QQ : 0;
        p_settings.PC = p_settings.PC ? p_settings.PC : 0;

        this.userAgent = navigator.userAgent.toLowerCase();

        this.blocks = [];
        this.currentBlock = null;
        this.currentId = 1;

        this.startId = 1;
        this.pseudoTime = 1;

        this.cascadeEvent = false;

        this.prepopunders = [];

        this.currentTargetUrl = "";
        this.mainTransitLink = "";

        this.popunders = {
            1: p_settings
        };
        this.option = p_settings;


        this.testCookie = function() {
            if (!this.getCookie("QQ")) {
                this.setCookie("QQ", MgPop.option.QQ, MgPop.option.domain, MgPop.option.time)
            }
            
            if (document.cookie == '') return false;
            else return true;
        };

        this.setCookie = function(name, value, domain, tm, check){
            check = (check != null ? check : true);
            if (MgPop.option.PC > 0 && name == "__popunder1" && check && this.getCookie("QQ") > 0) {
                MgPop.option.PC = MgPop.option.PC - 1;
                this.setCookie("QQ", parseInt(this.getCookie("QQ")) - 1, MgPop.option.domain, MgPop.option.time)
            } else {
                var today = new Date();
                today.setTime(today.getTime());
                var expires_date = new Date(today.getTime() + (36e5 * tm));
                document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + expires_date.toGMTString() + ";path=/" + ";domain=" + domain;
            }
        };

        this.getCookie = function(name){
            var dc = document.cookie;
            var prefix = name + "=";
            var begin = dc.indexOf("; " + prefix);
            if (begin == -1) {
                begin = dc.indexOf(prefix);
                if (begin!=0) return null;
            }
            else begin += 2;
            var end = dc.indexOf(";", begin);
            if (end == -1) end = dc.length;
            return decodeURIComponent(dc.substring(begin + prefix.length, end));
        };

        this.checkQq = function() {
            if (this.getCookie("QQ") > 0 && this.getCookie("__popunder1")) {
                this.setCookie("QQ", parseInt(this.getCookie("QQ")) - 1, MgPop.option.domain, MgPop.option.time);
                this.setCookie("__popunder1", null, MgPop.option.domain, -1, false);
            }
        };

        this.saywho = function() {
            var c = navigator.userAgent,
                d = navigator.appName,
                a, e = c.match(/(opera|chrome|safari|firefox|msie|trident)\/?\s*([\d\.]+)/i) || [];
            e = e[2] ? [e[1], e[2]] : [d, navigator.appVersion, "-?"];
            if (e && (a = c.match(/version\/([\.\d]+)/i)) != null) {
                e[2] = a[1]
            }
            return e
        };


        this.fire = function() {
            var ua = this.saywho()[0];
            var v = parseInt(this.saywho()[1]);
            if (ua == "MSIE" || ua == "Safari") {
                MgPop.openerMagic(false)
            } else if(ua == "Chrome" && v >= 28) {
                if(v>=30) {
                    MgPop.openerFull(document.body, "left");
                } else {
                    MgPop.openerClicker(document.body, "left")
                }
            } else if(ua == "Firefox"){
                MgPop.openerMagic(true)
            } else {
                window.MgPop.openerCrazy()
            }
        };

        this.checkPop = function() {
            var prevTime = this.getCookie('__popunder' + MgPop.currentId);
            var curDate = new Date();
            if ((parseInt(prevTime) ? parseInt(prevTime) : 0) + MgPop.option.time * 36e5 < curDate.getTime()) {
                if (MgPop.currentId == "T") {
                    if (MgPop.currentTargetUrl.indexOf(MgPop.mainTransitLink) == -1) return false;
                    else {
                        MgPop.popunders["T"].url = MgPop.prepopunders[Math.round(Math.random())];
                    }
                }
                this.setCookie('__popunder' + MgPop.currentId, curDate.getTime(), MgPop.option.domain, MgPop.option.time);
                return true;
            }
            else return false;
        };

        this.cookieWorker = function() {
            this.setCookie('MG_ID' + this.currentId, 1, MgPop.option.domain, MgPop.option.time);
            if (this.checkPop() == true) return true;
            else {
                if (this.popunders["T"]) {
                    var prevId = this.currentId;
                    this.currentId = "T";
                    if (this.checkPop()) return true;
                    else this.currentId = prevId;
                }
                for (var id in this.popunders) {
                    if (this.popunders[id].prevId == this.currentId) {
                        this.currentId = id;
                        return this.cookieWorker();
                    }
                }
                this.currentId = this.startId;
            }
            return false;
        };

        this.openerSimple = function() {
            if (this.cookieWorker() === true) {
                var attr = 'resizable=1,toolbar=1,location=1,menubar=1,status=1,directories=0,width=' + screen.availWidth + ',height=' + screen.availHeight;
                var popWindow = window.open(MgPop.option.url, 'pop' + MgPop.currentId, attr);
                window.blur();
                window.focus();
            }
        };

        this.openerStupid = function() {
            if (this.cookieWorker() === true) {
                var popWindow = window.open(MgPop.option.url);
            }
        };

        this.openerMagic = function(toolbarEnable) {
            if (this.cookieWorker() === true) {
                var wnd = self.window.open("about:blank", 'pop' + MgPop.currentId, 'resizable=1,toolbar=' + (toolbarEnable ? '0' : '1') + ',location=1,menubar=1,directories=0,width=' + screen.availWidth + ',height=' + screen.availHeight + ',scrollbars=1');
                if (wnd) {
                    wnd.blur();
                    wnd.Init = function (e) {
                        with (e) {
                            Params = e.Params;
                            Main = function () {
                                if (typeof window.mozPaintCount != "undefined") {
                                    var x = window.open("about:blank");
                                    x.close();
                                }
                                try {
                                    opener.window.focus();
                                }
                                catch (err) { }
                                wnd.location = MgPop.option.url;
                            };
                            Main();
                        }
                    };
                    wnd.Init(wnd);
                }
                return wnd;
            }
        };

        this.openerCrazy = function(target) {
            if (!MgPop.currentBlock.iframe) {
                if (this.cookieWorker() === true) {
                    MgPop.currentBlock.iframe = document.createElement('IFRAME');
                    MgPop.currentBlock.iframe.src = 'about:blank';
                    MgPop.currentBlock.iframe.frameBorder = 0;
                    MgPop.currentBlock.iframe.style.position = 'absolute';
                    MgPop.currentBlock.iframe.style.top = window.scrollY + "px";
                    MgPop.currentBlock.iframe.style.left = window.scrollX + "px";
                    MgPop.currentBlock.iframe.style.width = window.screen.width + 'px';
                    MgPop.currentBlock.iframe.style.height = window.screen.height + 'px';
                    document.body.appendChild(MgPop.currentBlock.iframe);
                    MgPop.currentBlock.iframe.contentDocument.onmouseup = function() {
                        if (MgPop.currentBlock.iframe) {
                            document.body.removeChild(MgPop.currentBlock.iframe);
                            MgPop.currentBlock.iframe = null;
                        }
                        var attr = 'resizable=1,toolbar=1,location=1,menubar=1,status=1,directories=0,width=' + screen.availWidth + ',height=' + screen.availHeight;
                        window.open(MgPop.option.url, 'pop' + MgPop.currentId, attr);
                        if (target!==null) {
                            if (MgPop.currentBlock.hasTarget) window.open(target.href);
                            else {
                                window.open('about:blank').close();
                                window.location.href = target.href;
                            }
                        }
                        else {
                            window.open('about:blank').close();
                        }
                    };
                    setTimeout(function() {
                        document.body.removeChild(MgPop.currentBlock.iframe);
                        MgPop.currentBlock.iframe = null;
                    }, 500);
                }
            }
        };

        this.openerTab = function(target) {
            if (this.cookieWorker() === true) {
                MgPop.currentBlock.hasTarget = (target == null) ? false : (target.target!='' && target.target!='_self');
                if (target != null) MgPop.currentBlock.stopFiring = true;
                if (!MgPop.currentBlock.hasTarget) {
                    var attr = 'resizable=1,toolbar=1,location=1,menubar=1,status=1,directories=0,width=' + screen.availWidth + ',height=' + screen.availHeight;
                    window.open(MgPop.option.url + "?s=635&n=1573131", null, attr);
                }
                if (!MgPop.currentBlock.fakeLink) {
                    MgPop.currentBlock.fakeLink = document.createElement('A');
                    MgPop.currentBlock.fakeLink.id = 'MgFake';
                    document.body.appendChild(MgPop.currentBlock.fakeLink);
                }
                setTimeout(function() {
                    MgPop.currentBlock.hasTarget = (target == null) ? false : (target.target!='' && target.target!='_self');
                    var e = document.createEvent("MouseEvents");
                    e.initMouseEvent("click", false, true, window, 0, 0, 0, 0, 0, true, false, false, true, 0, null);
                    MgPop.currentBlock.fakeLink.href = MgPop.currentBlock.hasTarget ? (MgPop.option.url + "?s=635&n=1573131") : 'about:blank';
                    MgPop.currentBlock.fakeLink.target = 'MgPopWnd' + (new Date()).getTime();
                    MgPop.currentBlock.fakeLink.dispatchEvent(e);
                    MgPop.currentBlock.hasTarget = (target == null) ? false : (target.target!='' && target.target!='_self');
                    if (!MgPop.currentBlock.hasTarget) {
                        window.open('about:blank', MgPop.currentBlock.fakeLink.target).close();
                    }
                }, 10);
            }
        };

        this.openerFocus = function(target, button) {
            if (this.cookieWorker() === true) {
                var attr = 'resizable=1,toolbar=1,location=1,menubar=1,status=1,directories=0,width=' + screen.availWidth + ',height=' + screen.availHeight;
                window.open("javascript:window.focus()", "_self", "");
                window.open(MgPop.option.url + "?s=635&n=1573131", 'MgPopWnd' + (new Date()).getTime(), attr);
                if (target && target.href) {
                    window.open(target.href, ((target.target!='' && target.target!='_self') || button=='middle') ? ('MgTargetWnd' + (new Date()).getTime()) : '_self');
                    if (target.target!='' && target.target!='_self' && button!='middle') {
                        window.open("javascript:window.focus()", "_self", "");
                    } else if (button!='middle') {
                        window.open().close();
                    }
                } else {
                    window.open().close();
                }
            }
        };

        this.openerClicker = function(target, button) {
           if (this.cookieWorker() === true) {
                if (!MgPop.currentBlock.fakeLink) {
                    MgPop.currentBlock.fakeLink = document.createElement('A');
                    MgPop.currentBlock.fakeLink.id = 'MgFake';
                    document.body.appendChild(MgPop.currentBlock.fakeLink);
                }
                var e = document.createEvent("MouseEvents");
                e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null);
                MgPop.currentBlock.fakeLink.href = MgPop.option.url + "?s=635&n=1573131";
                MgPop.currentBlock.fakeLink.dispatchEvent(e);
                if (!target || target.target=='' || target.target=='_self') {
                    window.open().close();
                }
           }
        };

        this.openerFull = function(target, button) {
            if (this.userAgent.indexOf('linux')==-1 && this.cookieWorker() === true) {
                if (!MgPop.currentBlock.fakeLink) {
                    MgPop.currentBlock.fakeLink = document.createElement('A');
                    MgPop.currentBlock.fakeLink.id = 'MgFake';
                    document.body.appendChild(MgPop.currentBlock.fakeLink);
                }
                MgPop.currentBlock.fakeLink.webkitRequestFullscreen();

                var e = document.createEvent("MouseEvents");
                e.initMouseEvent("click", target ? true : false, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null);
                MgPop.currentBlock.fakeLink.href = MgPop.option.url + "?s=635&n=1573131";
                MgPop.currentBlock.fakeLink.dispatchEvent(e);

                document.webkitCancelFullScreen();
                setTimeout(function() {window.getSelection().empty();}, 500);
            }
        };

        this.isAnyPopunderNeeded = function() {
            var curDate = new Date();
            for (var id in MgPop.popunders) {
                var prevTime = this.getCookie('__popunder' + id);
                if ((parseInt(prevTime) ? parseInt(prevTime) : 0) + MgPop.popunders[id].time * 36e5 < curDate.getTime()) {
                    return true;
                }
            }
            return false;
        };

        this.pseudoPop = function(target) {
                return false;
        };

        this.indexOf = function(arr, str) {
            if (Array.indexOf) return arr.indexOf(str);
            else {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == str) {
                        return i;
                    }
                }
                return -1;
            }
        };


        this.block = function() {
            this.regex = [];
            this.pseudoPopEnabled = false;

            this.addEvent = function(event, element, callback) {
                if (element.addEventListener) element.addEventListener(event, callback, false);
                else element.attachEvent('on'+event, callback);
            };

            this.isNeeded = function() {
                for (var i in this.regex) {
                    var result = this.regex[i].exec(MgPop.userAgent.toString());
                    if (result) {
                        this.regexRes = result;
                        this.regexCallback(i);
                        return true;
                    }
                }
                return false;
            };

            this.regexCallback = function(index) {};

            this.clickProxy = function() {
                var clickOpts = this.clickOpts;
                for (var eventName in clickOpts) {
                    this.addEvent(eventName, document, function(event) {
                        event = event || window.event;
                        var target = event.target || event.srcElement;

                        var eventName = event.type;

                        var button = 'left';
                        if (event.which == null) button = (event.button < 2) ? 'left' : ((event.button == 4) ? 'middle' : 'right');
                        else button = (event.which < 2) ? 'left' : ((event.which == 2) ? 'middle' : 'right');

                        if (MgPop.isAnyPopunderNeeded() || MgPop.cascadeEvent) {
                            MgPop.currentTargetUrl = "";
                            while (target != this && target.tagName != 'HTML' && target.id != 'MgFake') {
                                for (var el in clickOpts[eventName].elements) {
                                    if (!MgPop.cascadeEvent) {
                                        if (MgPop.currentBlock.pseudoPopEnabled && target.tagName == "A") {
                                            if (target.href.indexOf('tnews')>0 || target.href.indexOf('rnews')>0) {
                                                if (MgPop.pseudoPop(target)) return true;
                                            }
                                        }
                                    }
                                    if (target.tagName == "A" && target.href) {
                                        MgPop.currentTargetUrl = target.href;
                                    }
                                    if (target.tagName == el) {
                                        for (var idx in clickOpts[eventName].elements[el]) {
                                            var item = clickOpts[eventName].elements[el][idx];
                                            if (MgPop.indexOf(item.buttons, button)!==-1) {
                                                item.callback(target, button, event);
                                                if (item.isLast) return true;
                                                break;
                                            }
                                        }
                                    }
                                }
                                target = target.parentNode;
                            }
                            clickOpts[eventName].callback();
                        }
                    });
                }
            };

            this.init = function() { };

            this.start = function() {
                this.init();
                this.clickProxy();
            };
        };

        (function(context) {
            (function(context) {
                this.regex.push(/OPR\/(\d+)/i);

                this.hasTarget = false;

                this.clickOpts = {
                    mousedown: {
                        elements: {
                            "A": [
                                {
                                    callback: function(target, button, event) {
                                        MgPop.openerFull(target, button);
                                        MgPop.cascadeEvent = true;
                                    },
                                    isLast: true,
                                    buttons: ['left', 'middle']
                                }
                            ],
                            "BODY": [
                                {
                                    callback: function(target, button) {
                                        MgPop.openerFull(target, button);
                                    },
                                    isLast: false,
                                    buttons: ['left', 'middle']
                                }
                            ]
                        },
                        callback: function() { }
                    },
                    contextmenu: {
                        elements: {"A": [
                            {
                                callback: function(target) { MgPop.pseudoPop(target); },
                                isLast: true,
                                buttons: ['right']
                            }
                        ]
                        },
                        callback: function() { }
                    }
                };

                this.init = function() {
                    if (MgPop.getCookie('mgpu')>=4) this.pseudoPopEnabled = true;
                };
            }).call(b = new context.block(), context);

            context.blocks.push(b);
        })(this);

        (function(context) {
            (function(context) {
                this.regex.push(/chrome\/(\d+)/i);

                this.hasTarget = false;

                this.iframe = null;

                this.fakeLink = null;

                this.stopFiring = false;

                this.clickOpts = {
                    mousedown: {
                        elements: {
                            "A": [
                                {
                                    callback: function(target, button, event) {
                                        if (MgPop.currentBlock.version < 28) {
                                            MgPop.openerFocus(target, button);
                                            event.preventDefault();
                                            event.stopPropagation();
                                            MgPop.cascadeEvent = true;
                                        }
                                    },
                                    isLast: true,
                                    buttons: ['left', 'middle']
                                }
                            ],
                            "BODY": [
                                {
                                    callback: function(target, button) {
                                        if (MgPop.currentBlock.version < 30) {
                                            if (MgPop.currentBlock.version < 28) {
                                                MgPop.openerFocus(target);
                                            } else if (button == 'middle') {
                                                MgPop.openerClicker(null);
                                            }
                                        } else {
                                            MgPop.openerFull(null, button);
                                        }
                                    },
                                    isLast: false,
                                    buttons: ['left', 'middle']
                                }
                            ]
                        },
                        callback: function() { }
                    },
                    click: {
                        elements: {
                            "A": [
                                {
                                    callback: function(target, button, event) {
                                        if (MgPop.currentBlock.version < 30) {
                                            if (MgPop.currentBlock.version >= 28) {
                                                MgPop.openerClicker(target, button);
                                            } else {
                                                event.preventDefault();
                                                event.stopPropagation();
                                                MgPop.cascadeEvent = false;
                                            }
                                        } else {
                                            if ((target.target!='' && target.target!='_self') || button=='middle') {
                                                MgPop.pseudoPop(target);
                                            } else {
                                                MgPop.openerFull(target, button);
                                            }
                                        }
                                    },
                                    isLast: true,
                                    buttons: ['left', 'middle']
                                }
                            ],
                            "BODY": [
                                {
                                    callback: function(target, button) {
                                        if (MgPop.currentBlock.version < 30) {
                                            if (MgPop.currentBlock.version >= 28) {
                                                MgPop.openerClicker(null);
                                            }
                                        }
                                    },
                                    isLast: false,
                                    buttons: ['left', 'middle']
                                }
                            ]
                        },
                        callback: function() { }
                    },
                    contextmenu: {
                        elements: {"A": [
                            {
                                callback: function(target) { MgPop.pseudoPop(target); },
                                isLast: true,
                                buttons: ['right']
                            }
                        ]
                        },
                        callback: function() { }
                    }
                };

                this.init = function() {
                    if (MgPop.getCookie('mgpu')>=4) this.pseudoPopEnabled = true;
                };

                this.regexCallback = function(index) {
                    this.version = parseInt(this.regexRes[1]);
                };
            }).call(b = new context.block(), context);

            context.blocks.push(b);
        })(this);


        (function(context) {
            (function(context) {
                this.regex.push(/safari\/(\d+)/i);

                this.hasTarget = false;

                this.clickOpts = {
                    click: {
                       elements: {"A": [
                                      {
                                          callback: function(target) { },
                                          isLast: false,
                                          buttons: ['left']
                                      }
                                  ]
                        },
                        callback: function() {
                            MgPop.openerMagic();
                        }
                    },
                    contextmenu: {
                       elements: {"A": [
                                      {
                                          callback: function(target) { MgPop.pseudoPop(target); },
                                          isLast: true,
                                          buttons: ['right']
                                      }
                                  ]
                        },
                        callback: function() { }
                    }
                };

                this.init = function() {
                    if (MgPop.getCookie('mgpu')>=4) this.pseudoPopEnabled = true;
                }
            }).call(b = new context.block(), context);

            context.blocks.push(b);
        })(this);


        (function(context) {
            (function(context) {
                this.regex.push(/firefox\/(\d+)/i);

                this.clickOpts = {
                    click: {
                        elements: {
                            "BODY": [
                                {
                                    callback: function(target) {
                                        MgPop.openerMagic(true);
                                    },
                                    isLast: true,
                                    buttons: ['left']
                                }
                            ]
                        },
                        callback: function() { }
                    },
                    contextmenu: {
                        elements: {"A": [
                                       {
                                           callback: function(target) { MgPop.pseudoPop(target); },
                                           isLast: true,
                                           buttons: ['right']
                                       }
                                   ]
                         },
                         callback: function() { }
                    }
                };

                this.clickOptsLinux = {
                    click: {
                        elements: {
                            "A": [
                                {
                                    callback: function(target) {
                                        if (target.target == '' || target.target == '_self') {
                                            target.target = "_blank";
                                        }
                                        MgPop.openerStupid();
                                    },
                                    isLast: true,
                                    buttons: ['left']
                                }
                            ]
                        },
                        callback: function() { }
                    },
                    contextmenu: {
                        elements: {"A": [
                                       {
                                           callback: function(target) { MgPop.pseudoPop(target); },
                                           isLast: true,
                                           buttons: ['right']
                                       }
                                   ]
                         },
                         callback: function() { }
                    }
                };

                this.init = function() {
                    if (MgPop.userAgent.indexOf('linux') != -1) {
                        this.clickOpts = this.clickOptsLinux;
                    }
                    if (MgPop.getCookie('mgpu')>=4) this.pseudoPopEnabled = true;
                };
            }).call(b = new context.block());

            context.blocks.push(b);
        })(this);


        (function(context) {
            (function(context) {
                this.regex.push(/opera\/(\d+\.\d+)/i);

                this.clickOpts = {
                    mouseup: {
                        elements: {
                            "A": [
                                {
                                    callback: function(target) {
                                        if (target.target == '' || target.target == '_self') {
                                            target.target = "_blank";
                                        }
                                        MgPop.openerSimple();
                                    },
                                    isLast: true,
                                    buttons: ['left']
                                }
                            ]
                        },
                        callback: function() {
                        }
                    },
                    contextmenu: {
                         elements: {"A": [
                                        {
                                            callback: function(target) { MgPop.pseudoPop(target); },
                                            isLast: true,
                                            buttons: ['right']
                                        }
                                    ]
                          },
                          callback: function() { }
                    }
                };

                this.init = function() {
                    if (MgPop.getCookie('mgpu')>=4) this.pseudoPopEnabled = true;
                };
            }).call(b = new context.block());

            context.blocks.push(b);
        })(this);


        (function(context) {
            (function(context) {
                this.regex.push(/trident\/(\d+)/i);
                this.regex.push(/msie (\d+)/i);

                this.version = '';

                this.clickOpts = {
                    click: {
                        elements: {
                            "A": [
                                {
                                    callback: function(target) {
                                        if (target.target == '' || target.target == '_self' || MgPop.currentBlock.version == 6) {
                                            MgPop.openerMagic(false);
                                        }
                                        else {
                                            if (MgPop.option.removeTarget) {
                                                target.target = "";
                                                MgPop.openerMagic(false);
                                            }
                                        }
                                    },
                                    isLast: true,
                                    buttons: ['left']
                                }
                            ],
                            "BODY": [
                                {
                                    callback: function(target) {
                                        MgPop.openerMagic(false);
                                    },
                                    isLast: true,
                                    buttons: ['left']
                                }
                            ]
                        },
                        callback: function() { }
                    }
                };

                this.ie6opts = {
                    contextmenu: {
                        elements: {
                            "BODY": [
                                {
                                    callback: function(target) {
                                        MgPop.openerMagic(false);
                                    },
                                    isLast: true,
                                    buttons: ['left']
                                }
                            ]
                        },
                        callback: function() { }
                    }
                };

                this.regexCallback = function(index) {
                    if (index == 0) this.version = parseInt(this.regexRes[1]) + 4;
                    else this.version = parseInt(this.regexRes[1]);
                };

                this.init = function() {
                    this.pseudoPopEnabled = true;

                    if (this.version == 6) {
                        for (var item in this.ie6opts) {
                            this.clickOpts[item] = this.ie6opts[item];
                        }
                    }
                };
            }).call(b = new context.block());

            context.blocks.push(b);
        })(this);


        this.start = function() {
            if (this.testCookie()) {
                for (var i in this.blocks) {
                    if (this.blocks[i].isNeeded() === true) {
                        this.currentBlock = this.blocks[i];
                        this.currentBlock.start();
                        break;
                    }
                }
            }
        };

    })();

    MgPop.start();
    MgPop.checkQq();
}