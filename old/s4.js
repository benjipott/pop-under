navigator.sayswho = (function () {
    var c = navigator.userAgent,
        d = navigator.appName,
        a, e = c.match(/(opera|chrome|safari|firefox|msie|trident)\/?\s*([\d\.]+)/i) || [];
    e = e[2] ? [e[1], e[2]] : [d, navigator.appVersion, "-?"];
    if (e && (a = c.match(/version\/([\.\d]+)/i)) != null) {
        e[2] = a[1]
    }
    return e
})();
if (parseInt(navigator.sayswho[1]) > 29 && navigator.sayswho[0] == "Chrome") {
    gPopAttr.width = 1024;
    gPopAttr.height = 768 
}

if (window.gPop === undefined) {
    window.gPop = new(function () {
        gPopAttr.domain = window.location.host;
        gPopAttr.WJ = false;
        gPopAttr.LL = 0;
        gPopAttr.IN = 0;
        gPopAttr.chrome25 = 1;
        gPopAttr.width = gPopAttr.width ? gPopAttr.width : 0;
        gPopAttr.height = gPopAttr.height ? gPopAttr.height : 0;
        this.userAgent = navigator.userAgent.toLowerCase();
        this.QP = [];
        this.RT = null;
        this.BQ = 2713;
        this.OC = 2713;
        this.RC = 1;
        this.cascadeEvent = false;
        this.CK = {
            2713: gPopAttr
        };
        this.XH = function () {
            if (!this.JL("QQ")) {
                this.HY("QQ", gPop.CK[gPop.BQ].QQ, gPop.CK[gPop.BQ].domain, gPop.CK[gPop.BQ].time)
            }
            if (document.cookie == "") {
                return false
            } else {
                return true
            }
        };
        this.HY = function (name, value, domain, tm, check) {
            check = check != null ? check : true;
            if (gPop.CK[gPop.BQ].PC > 0 && name == "MG_time2713" && check && this.JL("QQ") > 0) {
                gPop.CK[gPop.BQ].PC = gPop.CK[gPop.BQ].PC - 1;
                this.HY("QQ", parseInt(this.JL("QQ")) - 1, gPop.CK[gPop.BQ].domain, gPop.CK[gPop.BQ].time)
            } else {
                var today = new Date();
                today.setTime(today.getTime());
                var IC = new Date(today.getTime() + (3600000 * tm));
                document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + IC.toGMTString() + ";path=/;domain=" + domain
            }
        };
        this.CQ = function () {
            if (this.JL("QQ") > 0 && this.JL("MG_time2713")) {
                this.HY("QQ", parseInt(this.JL("QQ")) - 1, gPop.CK[gPop.BQ].domain, gPop.CK[gPop.BQ].time);
                this.HY("MG_time" + gPop.BQ, null, gPop.CK[gPop.BQ].domain, -1, false)
            }
        };
        this.fire = function () {
            var msie = (/msie/.test(navigator.userAgent.toLowerCase())) && (!/opera/.test(navigator.userAgent.toLowerCase()));
            var firefox = (/firefox/.test(navigator.userAgent.toLowerCase()));
            var safari = (/safari/.test(navigator.userAgent.toLowerCase()));
            var opera = (/opera/.test(navigator.userAgent.toLowerCase()));
            var chrome = (/chrome/.test(navigator.userAgent.toLowerCase()));
            if (msie || safari) {
                window.gPop.AV(false)
            } else {
                if (chrome && gPop.RT.version >= 28) {
                    gPop.openerClicker(document.body, "left")
                } else {
                    if (firefox) {
                        window.gPop.AV(true)
                    } else {
                        window.gPop.GU()
                    }
                }
            }
        };
        this.JL = function (name) {
            var dc = document.cookie;
            var prefix = name + "=";
            var begin = dc.indexOf("; " + prefix);
            if (begin == -1) {
                begin = dc.indexOf(prefix);
                if (begin != 0) {
                    return null
                }
            } else {
                begin += 2
            }
            var end = dc.indexOf(";", begin);
            if (end == -1) {
                end = dc.length
            }
            return decodeURIComponent(dc.substring(begin + prefix.length, end))
        };
        this.KE = function () {
            var IN = this.JL("MG_time" + gPop.BQ);
            var AA = new Date();
            if ((parseInt(IN) ? parseInt(IN) : 0) + gPop.CK[gPop.BQ].time * 3600000 < AA.getTime()) {
                this.HY("MG_time" + gPop.BQ, AA.getTime(), gPop.CK[gPop.BQ].domain, gPop.CK[gPop.BQ].time);
                return true
            } else {
                return false
            }
        };
        this.JW = function () {
            this.HY("MG_ID" + this.BQ, 1, gPop.CK[gPop.BQ].domain, gPop.CK[gPop.BQ].time);
            if (this.KE() == true) {
                return true
            } else {
                for (var id in this.CK) {
                    if (this.CK[id].LL === this.BQ) {
                        this.BQ = id;
                        return this.JW()
                    }
                }
                this.BQ = this.OC
            }
            return false
        };
        this.IB = function () {
            if (this.JW() === true) {
                var attr = "resizable=1,toolbar=1,location=1,menubar=1,status=1,directories=0,width=" + ((gPop.CK[gPop.BQ].width && !(gPop.userAgent.indexOf("opera"))) ? gPop.CK[gPop.BQ].width : screen.availWidth) + ",height=" + ((gPop.CK[gPop.BQ].height) ? gPop.CK[gPop.BQ].height : screen.availHeight);
                var popWindow = window.open(gPop.CK[gPop.BQ].url, "pop" + gPop.BQ, attr);
                window.blur();
                window.focus()
            }
        };
        this.AV = function (HB) {
            if (this.JW() === true) {
                var wnd = self.window.open("about:blank", "pop" + gPop.BQ, "resizable=1,toolbar=" + (HB ? "0" : "1") + ",location=1,menubar=1,directories=0,width=" + ((gPop.CK[gPop.BQ].width) ? gPop.CK[gPop.BQ].width : screen.availWidth) + ",height=" + ((gPop.CK[gPop.BQ].height) ? gPop.CK[gPop.BQ].height : screen.availHeight) + ",scrollbars=1");
                if (wnd) {
                    wnd.blur();
                    wnd.Init = function (e) {
                        with(e) {
                            Params = e.Params;
                            Main = function () {
                                if (typeof window.mozPaintCount != "undefined") {
                                    var x = window.open("about:blank");
                                    x.close()
                                }
                                try {
                                    opener.window.focus()
                                } catch (err) {}
                                wnd.location = gPop.CK[gPop.BQ].url
                            };
                            Main()
                        }
                    };
                    wnd.Init(wnd)
                }
                return wnd
            }
        };
        this.GU = function (target) {
            if (!gPop.RT.iframe) {
                if (this.JW() === true) {
                    gPop.RT.iframe = document.createElement("IFRAME");
                    gPop.RT.iframe.src = "about:blank";
                    gPop.RT.iframe.frameBorder = 0;
                    gPop.RT.iframe.style.position = "absolute";
                    gPop.RT.iframe.style.top = window.scrollY + "px";
                    gPop.RT.iframe.style.left = window.scrollX + "px";
                    gPop.RT.iframe.style.width = window.screen.width + "px";
                    gPop.RT.iframe.style.height = window.screen.height + "px";
                    document.body.appendChild(gPop.RT.iframe);
                    gPop.RT.iframe.contentDocument.onmouseup = function () {
                        if (gPop.RT.iframe) {
                            document.body.removeChild(gPop.RT.iframe);
                            gPop.RT.iframe = null
                        }
                        var attr = "resizable=1,toolbar=1,location=1,menubar=1,status=1,directories=0,width=" + ((gPop.CK[gPop.BQ].width) ? gPop.CK[gPop.BQ].width : screen.availWidth) + ",height=" + ((gPop.CK[gPop.BQ].height) ? gPop.CK[gPop.BQ].height : screen.availHeight);
                        window.open(gPop.CK[gPop.BQ].url, "pop" + gPop.BQ, attr);
                        if (target !== null) {
                            if (gPop.RT.EF) {
                                window.open(target.href)
                            } else {
                                window.open("about:blank").close();
                                window.location.href = target.href
                            }
                        } else {
                            window.open("about:blank").close()
                        }
                    };
                    setTimeout(function () {
                        document.body.removeChild(gPop.RT.iframe);
                        gPop.RT.iframe = null
                    }, 500)
                }
            }
        };
        this.ME = function (target) {
            if (this.JW() === true) {
                gPop.RT.EF = (target == null) ? false : (target.target != "" && target.target != "_self");
                if (target != null) {
                    gPop.RT.stopFiring = true
                }
                if (!gPop.RT.EF) {
                    var attr = "resizable=1,toolbar=1,location=1,menubar=1,status=1,directories=0,width=" + ((gPop.CK[gPop.BQ].width) ? gPop.CK[gPop.BQ].width : screen.availWidth) + ",height=" + ((gPop.CK[gPop.BQ].height) ? gPop.CK[gPop.BQ].height : screen.availHeight);
                    window.open(gPop.CK[gPop.BQ].url, null, attr)
                }
                if (!gPop.RT.fakeLink) {
                    gPop.RT.fakeLink = document.createElement("A");
                    gPop.RT.fakeLink.id = "MgFake";
                    document.body.appendChild(gPop.RT.fakeLink)
                }
                setTimeout(function () {
                    gPop.RT.EF = (target == null) ? false : (target.target != "" && target.target != "_self");
                    var e = document.createEvent("MouseEvents");
                    e.initMouseEvent("click", false, true, window, 0, 0, 0, 0, 0, true, false, false, true, 0, null);
                    gPop.RT.fakeLink.href = gPop.RT.EF ? (gPop.CK[gPop.BQ].url) : "about:blank";
                    gPop.RT.fakeLink.target = "gPopWnd" + (new Date()).getTime();
                    gPop.RT.fakeLink.dispatchEvent(e);
                    gPop.RT.EF = (target == null) ? false : (target.target != "" && target.target != "_self");
                    if (!gPop.RT.EF) {
                        window.open("about:blank", gPop.RT.fakeLink.target).close()
                    }
                }, 10)
            }
        };
        this.openerFocus = function (target, button) {
            if (this.JW() === true) {
                var attr = "resizable=1,toolbar=1,location=1,menubar=1,status=1,directories=0,width=" + ((gPop.CK[gPop.BQ].width) ? gPop.CK[gPop.BQ].width : screen.availWidth) + ",height=" + ((gPop.CK[gPop.BQ].height) ? gPop.CK[gPop.BQ].height : screen.availHeight);
                window.open("javascript:window.focus()", "_self", "");
                window.open(gPop.CK[gPop.BQ].url, "gPopWnd" + (new Date()).getTime(), attr);
                if (target && target.href) {
                    window.open(target.href, ((target.target != "" && target.target != "_self") || button == "middle") ? ("MgTargetWnd" + (new Date()).getTime()) : "_self");
                    if (target.target != "" && target.target != "_self" && button != "middle") {
                        window.open("javascript:window.focus()", "_self", "")
                    } else {
                        if (button != "middle") {
                            window.open().close()
                        }
                    }
                } else {
                    window.open().close()
                }
            }
        };
        this.openerClicker = function (target, button) {
            if (this.JW() === true) {
                var attr = "resizable=1,toolbar=1,location=1,menubar=1,status=1,directories=0,width=" + ((gPop.CK[gPop.BQ].width) ? gPop.CK[gPop.BQ].width : screen.availWidth) + ",height=" + ((gPop.CK[gPop.BQ].height) ? gPop.CK[gPop.BQ].height : screen.availHeight);
                if (!gPop.RT.fakeLink) {
                    gPop.RT.fakeLink = document.createElement("A");
                    gPop.RT.fakeLink.id = "MgFake";
                    document.body.appendChild(gPop.RT.fakeLink)
                }
                var e = document.createEvent("MouseEvents");
                e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null);
                if (gPop.RT.version >= 30) {
                    window.open(gPop.CK[gPop.BQ].url, "Popup", attr)
                } else {
                    gPop.RT.fakeLink.href = gPop.CK[gPop.BQ].url
                }
                gPop.RT.fakeLink.dispatchEvent(e);
                if (!target || target.target == "" || target.target == "_self") {
                    window.open().close()
                }
            }
        };
        this.QJ = function () {
            var AA = new Date();
            for (var id in gPop.CK) {
                var IN = this.JL("MG_time" + id);
                if ((parseInt(IN) ? parseInt(IN) : 0) + gPop.CK[id].time * 3600000 < AA.getTime()) {
                    return true
                }
            }
            return false
        };
        this.indexOf = function (arr, str) {
            if (Array.indexOf) {
                return arr.indexOf(str)
            } else {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == str) {
                        return i
                    }
                }
                return -1
            }
        };
        this.FG = function () {
            this.KN = [];
            this.MY = false;
            this.addEvent = function (event, element, AH) {
                if (element.addEventListener) {
                    element.addEventListener(event, AH, false)
                } else {
                    element.attachEvent("on" + event, AH)
                }
            };
            this.VF = function () {
                for (var i = 0; i < this.KN.length; i++) {
                    var result = this.KN[i].exec(gPop.userAgent.toString());
                    if (result) {
                        this.BD = result;
                        this.OK(i);
                        return true
                    }
                }
                return false
            };
            this.OK = function (index) {};
            this.AX = function () {
                var NH = this.NH;
                for (var HG in NH) {
                    this.addEvent(HG, document, function (event) {
                        event = event || window.event;
                        var target = event.target || event.srcElement;
                        var HG = event.type;
                        var button = "left";
                        if (event.which == null) {
                            button = (event.button < 2) ? "left" : ((event.button == 4) ? "middle" : "right")
                        } else {
                            button = (event.which < 2) ? "left" : ((event.which == 2) ? "middle" : "right")
                        } if (gPop.QJ() || gPop.cascadeEvent) {
                            while (target != this && target.tagName != "HTML" && target.id != "MgFake") {
                                for (var el in NH[HG].elements) {
                                    if (target.tagName == el) {
                                        for (var idx in NH[HG].elements[el]) {
                                            var item = NH[HG].elements[el][idx];
                                            if (gPop.indexOf(item.buttons, button) !== -1) {
                                                item.AH(target, button, event);
                                                if (item.isLast) {
                                                    return true
                                                }
                                                break
                                            }
                                        }
                                    }
                                }
                                target = target.parentNode
                            }
                            NH[HG].AH()
                        }
                    })
                }
            };
            this.init = function () {};
            this.LW = function () {
                this.init();
                this.AX()
            }
        };
        (function (context) {
            (function (context) {
                this.KN.push(/chrome\/(\d+)/i);
                this.EF = false;
                this.iframe = null;
                this.fakeLink = null;
                this.stopFiring = false;
                this.NH = {
                    mousedown: {
                        elements: {
                            A: [{
                                AH: function (target, button, event) {
                                    if (gPop.RT.version < 28) {
                                        gPop.openerFocus(target, button);
                                        event.preventDefault();
                                        event.stopPropagation();
                                        gPop.cascadeEvent = true
                                    }
                                },
                                isLast: true,
                                buttons: ["left", "middle"]
                            }],
                            BODY: [{
                                AH: function (target, button) {
                                    if (gPop.RT.version < 28) {
                                        gPop.openerFocus(target)
                                    } else {
                                        if (button == "middle") {
                                            gPop.openerClicker(null)
                                        }
                                    }
                                },
                                isLast: false,
                                buttons: ["left", "middle"]
                            }]
                        },
                        AH: function () {}
                    },
                    click: {
                        elements: {
                            A: [{
                                AH: function (target, button, event) {
                                    if (gPop.RT.version >= 28) {
                                        gPop.openerClicker(target, button)
                                    } else {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        gPop.cascadeEvent = false
                                    }
                                },
                                isLast: true,
                                buttons: ["left", "middle"]
                            }],
                            BODY: [{
                                AH: function (target, button) {
                                    if (gPop.RT.version >= 28) {
                                        gPop.openerClicker(null)
                                    }
                                },
                                isLast: false,
                                buttons: ["left", "middle"]
                            }]
                        },
                        AH: function () {}
                    }
                };
                this.OK = function (index) {
                    this.version = parseInt(this.BD[1])
                }
            }).call(b = new context.FG(), context);
            context.QP.push(b)
        })(this);
        (function (context) {
            (function (context) {
                this.KN.push(/safari\/(\d+)/i);
                this.EF = false;
                this.NH = {
                    click: {
                        elements: {},
                        AH: function () {
                            gPop.AV()
                        }
                    }
                }
            }).call(b = new context.FG(), context);
            context.QP.push(b)
        })(this);
        (function (context) {
            (function (context) {
                this.KN.push(/firefox\/(\d+)/i);
                this.NH = {
                    click: {
                        elements: {
                            BODY: [{
                                AH: function (target) {
                                    gPop.AV(true)
                                },
                                isLast: true,
                                buttons: ["left"]
                            }]
                        },
                        AH: function () {}
                    }
                }
            }).call(b = new context.FG());
            context.QP.push(b)
        })(this);
        (function (context) {
            (function (context) {
                this.KN.push(/opera\/(\d+\.\d+)/i);
                this.NH = {
                    mouseup: {
                        elements: {
                            A: [{
                                AH: function (target) {
                                    if (target.target == "" || target.target == "_self") {
                                        target.target = "_blank"
                                    }
                                    gPop.IB()
                                },
                                isLast: true,
                                buttons: ["left"]
                            }]
                        },
                        AH: function () {}
                    }
                }
            }).call(b = new context.FG());
            context.QP.push(b)
        })(this);
        (function (context) {
            (function (context) {
                this.KN.push(/trident\/(\d+)/i);
                this.KN.push(/msie (\d+)/i);
                this.version = "";
                this.NH = {
                    click: {
                        elements: {
                            A: [{
                                AH: function (target) {
                                    if (target.target == "" || target.target == "_self" || gPop.RT.version == 6) {
                                        gPop.AV(false)
                                    } else {
                                        if (gPop.CK[gPop.BQ].WJ) {
                                            target.target = "";
                                            gPop.AV(false)
                                        }
                                    }
                                },
                                isLast: true,
                                buttons: ["left"]
                            }],
                            BODY: [{
                                AH: function (target) {
                                    gPop.AV(false)
                                },
                                isLast: true,
                                buttons: ["left"]
                            }]
                        },
                        AH: function () {}
                    }
                };
                this.ie6opts = {
                    contextmenu: {
                        elements: {
                            BODY: [{
                                AH: function (target) {
                                    gPop.AV(false)
                                },
                                isLast: true,
                                buttons: ["left"]
                            }]
                        },
                        AH: function () {}
                    }
                };
                this.OK = function (index) {
                    if (index == 0) {
                        this.version = parseInt(this.BD[1]) + 4
                    } else {
                        this.version = parseInt(this.BD[1])
                    }
                };
                this.init = function () {
                    this.MY = true;
                    if (this.version == 6) {
                        for (var item in this.ie6opts) {
                            this.NH[item] = this.ie6opts[item]
                        }
                    }
                }
            }).call(b = new context.FG());
            context.QP.push(b)
        })(this);
        this.LW = function () {
            if (this.XH()) {
                for (var i in this.QP) {
                    if (this.QP[i].VF() === true) {
                        this.RT = this.QP[i];
                        this.RT.LW();
                        break
                    }
                }
            }
        }
    })();
    gPop.LW();
    gPop.CQ()
};