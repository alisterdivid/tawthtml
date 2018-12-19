$_TAWK_JSON = {stringify: JSON.stringify, parse: JSON.parse};
(function (a) {
	"function" !== typeof Array.isArray && (Array.isArray = function (a) {
		return "[object Array]" === Object.prototype.toString.call(a)
	});
	Array.prototype.indexOf || (Array.prototype.indexOf =
		function (a) {
			for (var b = 0, c = this.length; b < c; b++) if (this[b] === a) return b;
			return -1
		});
	a = a.EventEmitter = function () {
	};
	var c = Array.isArray;
	a.prototype.emit = function (a) {
		var b;
		if ("error" === a && (!this._events || !this._events.error || c(this._events.error) && !this._events.error.length)) {
			if (arguments[1] instanceof Error) throw arguments[1];
			throw Error("Uncaught, unspecified 'error' event.");
		}
		if (!this._events) return !1;
		var e = this._events[a];
		if (!e) return !1;
		if ("function" == typeof e) {
			switch (arguments.length) {
				case 1:
					e.call(this);
					break;
				case 2:
					e.call(this, arguments[1]);
					break;
				case 3:
					e.call(this, arguments[1], arguments[2]);
					break;
				default:
					b = Array.prototype.slice.call(arguments, 1), e.apply(this, b)
			}
			return !0
		}
		if (c(e)) {
			b = Array.prototype.slice.call(arguments, 1);
			for (var e = e.slice(), f = 0, g = e.length; f < g; f++) e[f].apply(this, b);
			return !0
		}
		return !1
	};
	a.prototype.addListener = function (a, b) {
		if ("function" !== typeof b) throw Error("addListener only takes instances of Function");
		this._events || (this._events = {});
		this._events[a] ? c(this._events[a]) ? this._events[a].push(b) :
			this._events[a] = [this._events[a], b] : this._events[a] = b;
		return this
	};
	a.prototype.on = a.prototype.addListener;
	a.prototype.once = function (a, b) {
		var c = this;
		c.on(a, function g() {
			c.removeListener(a, g);
			b.apply(this, arguments)
		})
	};
	a.prototype.removeListener = function (a, b) {
		if ("function" !== typeof b) throw Error("removeListener only takes instances of Function");
		if (!this._events || !this._events[a]) return this;
		var e = this._events[a];
		if (c(e)) {
			var f = e.indexOf(b);
			if (0 > f) return this;
			e.splice(f, 1);
			0 === e.length && delete this._events[a]
		} else this._events[a] ===
		b && delete this._events[a];
		return this
	};
	a.prototype.removeAllListeners = function (a) {
		a ? a && (this._events && this._events[a]) && (this._events[a] = null) : this._events = {};
		return this
	};
	a.prototype.listeners = function (a) {
		this._events || (this._events = {});
		this._events[a] || (this._events[a] = []);
		c(this._events[a]) || (this._events[a] = [this._events[a]]);
		return this._events[a]
	}
})(window);
(function (a) {
	function c(c, d) {
		console.log('SOCKET_PROTOCOL===', c);
		if (!d.engineIo) throw Error("You must specify engineIo");
		d.timestampRequests = !0;
		d.timestampParam = "__t";
		this.__callbackIndex = 0;
		this.__callbacks = {};
		this.state = b.OPENING;
		this.socket = new d.engineIo(c, d);
		this.debug = !1;
		if (document.getElementById("tawk__dmz")) {
			var g = this;
			a.getSocketTransport = function () {
				if (g.socket.transport) return g.socket.transport.name
			}
		}
		document.location && "#!tawk-debug" === document.location.hash && (this.debug = !0);
		EventEmitter.call(this);
		this.attachListeners()
	}

	var d, b = {OPENING: "opening", OPEN: "open", CLOSING: "closing", CLOSED: "closed"};
	for (d in EventEmitter.prototype) "function" === typeof EventEmitter.prototype[d] &&
	Object.prototype.hasOwnProperty.call(EventEmitter.prototype, d) && (c.prototype[d] = EventEmitter.prototype[d]);
	c.prototype.attachListeners = function () {
		var a = this;
		this.socket.on("open", function () {
			a.state = b.OPEN;
			a.emit("connect")
		});
		this.socket.on("close", function (b, c) {
			a.emit("disconnect", b, c);
			a.doClose()
		});
		this.socket.on("error", function (b) {
			a.emit("error", b)
		});
		this.socket.on("message", function (b) {
			a.onMessage(b)
		})
	};
	c.prototype.close = c.prototype.disconnect = function () {
		var a = this;
		this.state === b.OPENING && setTimeout(function () {
				a.close()
			},
			1E3);
		this.state === b.OPEN && (this.state = b.CLOSING, this.clearCallbacks(), this.socket.close())
	};
	c.prototype.doClose = function () {
		this.clearCallbacks();
		this.state = b.CLOSED;
		this.socket.removeAllListeners();
		this.removeAllListeners();
		this.socket = null
	};
	c.prototype.clearCallbacks = function () {
		this.__callbacks = {}
	};
	c.prototype.onMessage = function (a) {
		(a = this.decode(a)) && ("__callback__" === a.c ? this.executeCallback(a) : this.emit.apply(this, [a.c].concat(a.p)))
	};
	c.prototype.executeCallback = function (a) {
		var b = this.__callbacks[a.cb];
		delete this.__callbacks[a.cb];
		b.apply(null, a.p)
	};
	c.prototype.decode = function (a) {
		var b;
		this.debug && (console && console.log) && (data = new Date, console.log("received " + data.toUTCString() + " : " + a));
		try {
			b = $_TAWK_JSON.parse(a)
		} catch (c) {
			this.emit("error", c);
			return
		}
		if (b.c) if ("error" === b.c || "connect" === b.c || "disconnect" === b.c) this.emit("error", Error("server returned reserved command : `" + b.cmd + "`")); else if (b.p && "[object Array]" !== Object.prototype.toString.call(b.p)) this.emit("error", Error("data is expected to be an array"));
		else {
			if ("__callback__" !== b.c) return b;
			a = parseInt(b.cb, 10);
			if (isNaN(a)) this.emit("error", Error("received callback command but there was no valid callback id(`" + a + "`")); else {
				if (this.__callbacks[a]) return b.cb = a, b;
				this.emit("error", Error("received callback command but callback isnt present (`" + b.cb + "`)"))
			}
		} else this.emit("error", Error("no command was sent by the server"))
	};
	c.prototype.send = function () {
		var a = this.encode(arguments);
		this.debug && (console && console.log) && (data = new Date, console.log("send " +
			data.toUTCString() + " : " + a));
		this.state !== b.OPEN ? this.emit("error", Error("Socket isnt open its state is `" + this.state + "` tried to send `" + a + "`")) : a && this.socket.send(a)
	};
	c.prototype.encode = function (a) {
		var b = {};
		a = Array.prototype.slice.call(a);
		if (a[0]) {
			b.c = a[0];
			"function" === typeof a[a.length - 1] && (b.cb = this.enqueuCallback(a.pop()));
			b.p = a.slice(1);
			var c;
			try {
				c = $_TAWK_JSON.stringify(b)
			} catch (d) {
				this.emit("error", d);
				return
			}
			return c
		}
		this.emit("error", Error("now command specified"))
	};
	c.prototype.enqueuCallback =
		function (a) {
			this.__callbacks[this.__callbackIndex] = a;
			return this.__callbackIndex++
		};
	a.$__TawkSocket = c
})(window);