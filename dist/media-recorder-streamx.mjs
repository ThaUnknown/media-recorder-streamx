var B = { exports: {} }, A = typeof Reflect == "object" ? Reflect : null, ee = A && typeof A.apply == "function" ? A.apply : function(e, t, n) {
  return Function.prototype.apply.call(e, t, n);
}, P;
A && typeof A.ownKeys == "function" ? P = A.ownKeys : Object.getOwnPropertySymbols ? P = function(e) {
  return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
} : P = function(e) {
  return Object.getOwnPropertyNames(e);
};
function Ce(i) {
  console && console.warn && console.warn(i);
}
var ue = Number.isNaN || function(e) {
  return e !== e;
};
function o() {
  o.init.call(this);
}
B.exports = o;
B.exports.once = Fe;
o.EventEmitter = o;
o.prototype._events = void 0;
o.prototype._eventsCount = 0;
o.prototype._maxListeners = void 0;
var te = 10;
function M(i) {
  if (typeof i != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof i);
}
Object.defineProperty(o, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return te;
  },
  set: function(i) {
    if (typeof i != "number" || i < 0 || ue(i))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + i + ".");
    te = i;
  }
});
o.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
o.prototype.setMaxListeners = function(e) {
  if (typeof e != "number" || e < 0 || ue(e))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
  return this._maxListeners = e, this;
};
function oe(i) {
  return i._maxListeners === void 0 ? o.defaultMaxListeners : i._maxListeners;
}
o.prototype.getMaxListeners = function() {
  return oe(this);
};
o.prototype.emit = function(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t.push(arguments[n]);
  var r = e === "error", a = this._events;
  if (a !== void 0)
    r = r && a.error === void 0;
  else if (!r)
    return !1;
  if (r) {
    var s;
    if (t.length > 0 && (s = t[0]), s instanceof Error)
      throw s;
    var h = new Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
    throw h.context = s, h;
  }
  var d = a[e];
  if (d === void 0)
    return !1;
  if (typeof d == "function")
    ee(d, this, t);
  else
    for (var u = d.length, f = _e(d, u), n = 0; n < u; ++n)
      ee(f[n], this, t);
  return !0;
};
function le(i, e, t, n) {
  var r, a, s;
  if (M(t), a = i._events, a === void 0 ? (a = i._events = /* @__PURE__ */ Object.create(null), i._eventsCount = 0) : (a.newListener !== void 0 && (i.emit(
    "newListener",
    e,
    t.listener ? t.listener : t
  ), a = i._events), s = a[e]), s === void 0)
    s = a[e] = t, ++i._eventsCount;
  else if (typeof s == "function" ? s = a[e] = n ? [t, s] : [s, t] : n ? s.unshift(t) : s.push(t), r = oe(i), r > 0 && s.length > r && !s.warned) {
    s.warned = !0;
    var h = new Error("Possible EventEmitter memory leak detected. " + s.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    h.name = "MaxListenersExceededWarning", h.emitter = i, h.type = e, h.count = s.length, Ce(h);
  }
  return i;
}
o.prototype.addListener = function(e, t) {
  return le(this, e, t, !1);
};
o.prototype.on = o.prototype.addListener;
o.prototype.prependListener = function(e, t) {
  return le(this, e, t, !0);
};
function Me() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function he(i, e, t) {
  var n = { fired: !1, wrapFn: void 0, target: i, type: e, listener: t }, r = Me.bind(n);
  return r.listener = t, n.wrapFn = r, r;
}
o.prototype.once = function(e, t) {
  return M(t), this.on(e, he(this, e, t)), this;
};
o.prototype.prependOnceListener = function(e, t) {
  return M(t), this.prependListener(e, he(this, e, t)), this;
};
o.prototype.removeListener = function(e, t) {
  var n, r, a, s, h;
  if (M(t), r = this._events, r === void 0)
    return this;
  if (n = r[e], n === void 0)
    return this;
  if (n === t || n.listener === t)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete r[e], r.removeListener && this.emit("removeListener", e, n.listener || t));
  else if (typeof n != "function") {
    for (a = -1, s = n.length - 1; s >= 0; s--)
      if (n[s] === t || n[s].listener === t) {
        h = n[s].listener, a = s;
        break;
      }
    if (a < 0)
      return this;
    a === 0 ? n.shift() : Ue(n, a), n.length === 1 && (r[e] = n[0]), r.removeListener !== void 0 && this.emit("removeListener", e, h || t);
  }
  return this;
};
o.prototype.off = o.prototype.removeListener;
o.prototype.removeAllListeners = function(e) {
  var t, n, r;
  if (n = this._events, n === void 0)
    return this;
  if (n.removeListener === void 0)
    return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : n[e] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete n[e]), this;
  if (arguments.length === 0) {
    var a = Object.keys(n), s;
    for (r = 0; r < a.length; ++r)
      s = a[r], s !== "removeListener" && this.removeAllListeners(s);
    return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
  }
  if (t = n[e], typeof t == "function")
    this.removeListener(e, t);
  else if (t !== void 0)
    for (r = t.length - 1; r >= 0; r--)
      this.removeListener(e, t[r]);
  return this;
};
function fe(i, e, t) {
  var n = i._events;
  if (n === void 0)
    return [];
  var r = n[e];
  return r === void 0 ? [] : typeof r == "function" ? t ? [r.listener || r] : [r] : t ? ke(r) : _e(r, r.length);
}
o.prototype.listeners = function(e) {
  return fe(this, e, !0);
};
o.prototype.rawListeners = function(e) {
  return fe(this, e, !1);
};
o.listenerCount = function(i, e) {
  return typeof i.listenerCount == "function" ? i.listenerCount(e) : de.call(i, e);
};
o.prototype.listenerCount = de;
function de(i) {
  var e = this._events;
  if (e !== void 0) {
    var t = e[i];
    if (typeof t == "function")
      return 1;
    if (t !== void 0)
      return t.length;
  }
  return 0;
}
o.prototype.eventNames = function() {
  return this._eventsCount > 0 ? P(this._events) : [];
};
function _e(i, e) {
  for (var t = new Array(e), n = 0; n < e; ++n)
    t[n] = i[n];
  return t;
}
function Ue(i, e) {
  for (; e + 1 < i.length; e++)
    i[e] = i[e + 1];
  i.pop();
}
function ke(i) {
  for (var e = new Array(i.length), t = 0; t < e.length; ++t)
    e[t] = i[t].listener || i[t];
  return e;
}
function Fe(i, e) {
  return new Promise(function(t, n) {
    function r(s) {
      i.removeListener(e, a), n(s);
    }
    function a() {
      typeof i.removeListener == "function" && i.removeListener("error", r), t([].slice.call(arguments));
    }
    ce(i, e, a, { once: !0 }), e !== "error" && Ye(i, r, { once: !0 });
  });
}
function Ye(i, e, t) {
  typeof i.on == "function" && ce(i, "error", e, t);
}
function ce(i, e, t, n) {
  if (typeof i.on == "function")
    n.once ? i.once(e, t) : i.on(e, t);
  else if (typeof i.addEventListener == "function")
    i.addEventListener(e, function r(a) {
      n.once && i.removeEventListener(e, r), t(a);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof i);
}
var je = typeof queueMicrotask == "function" ? queueMicrotask : (i) => Promise.resolve().then(i), qe = class {
  constructor(e) {
    if (!(e > 0) || (e - 1 & e) !== 0)
      throw new Error("Max size for a FixedFIFO should be a power of two");
    this.buffer = new Array(e), this.mask = e - 1, this.top = 0, this.btm = 0, this.next = null;
  }
  push(e) {
    return this.buffer[this.top] !== void 0 ? !1 : (this.buffer[this.top] = e, this.top = this.top + 1 & this.mask, !0);
  }
  shift() {
    const e = this.buffer[this.btm];
    if (e !== void 0)
      return this.buffer[this.btm] = void 0, this.btm = this.btm + 1 & this.mask, e;
  }
  peek() {
    return this.buffer[this.btm];
  }
  isEmpty() {
    return this.buffer[this.btm] === void 0;
  }
};
const ie = qe;
var Ge = class {
  constructor(e) {
    this.hwm = e || 16, this.head = new ie(this.hwm), this.tail = this.head;
  }
  push(e) {
    if (!this.head.push(e)) {
      const t = this.head;
      this.head = t.next = new ie(2 * this.head.buffer.length), this.head.push(e);
    }
  }
  shift() {
    const e = this.tail.shift();
    if (e === void 0 && this.tail.next) {
      const t = this.tail.next;
      return this.tail.next = null, this.tail = t, this.tail.shift();
    }
    return e;
  }
  peek() {
    return this.tail.peek();
  }
  isEmpty() {
    return this.head.isEmpty();
  }
};
const { EventEmitter: Ke } = B.exports, H = new Error("Stream was destroyed"), G = new Error("Premature close"), pe = je, Se = Ge, l = (1 << 25) - 1, T = 1, b = 2, D = 4, me = l ^ T, v = 1 << 3, U = 2 << 3, k = 4 << 3, S = 8 << 3, w = 16 << 3, F = 32 << 3, E = 64 << 3, K = 128 << 3, Q = 256 << 3, X = 512 << 3, _ = 1024 << 3, W = 2049 << 3, Y = 4096 << 3, Ve = l ^ v, Be = l ^ U, He = l ^ (U | Y), Qe = l ^ k, Xe = l ^ Y, ze = l ^ w, $e = l ^ (S | X), Je = l ^ E, ne = l ^ (w | F), Ze = l ^ W, m = 1 << 16, z = 2 << 16, $ = 4 << 16, x = 8 << 16, L = 16 << 16, y = 32 << 16, V = 64 << 16, C = 129 << 16, N = 256 << 16, be = l ^ m, et = l ^ $, Ee = l ^ z, tt = l ^ N, it = l ^ L, nt = l ^ x, rt = l ^ C, I = v | m, xe = l ^ I, J = _ | y, p = b | D, c = p | T, Te = p | J, st = Ee & Be, ve = (C | W) & xe, ye = I | ve, Re = c | ve, at = c | E | _, re = c | _ | S, ut = w | F, ot = v | k, lt = v | k | Y, ht = U | v, ft = c | E | S, dt = Q | S, _t = c | Q | S | X, ct = c | v | E | _ | Y, pt = p | E | _, St = c | N | y, mt = x | L, Ae = x | m, bt = x | L | c | m, se = c | m | x, Et = z | m, xt = m | $, Tt = c | N | Ae | y, vt = L | p | N | y, O = Symbol.asyncIterator || Symbol("asyncIterator");
class we {
  constructor(e, { highWaterMark: t = 16384, map: n = null, mapWritable: r, byteLength: a, byteLengthWritable: s } = {}) {
    this.stream = e, this.queue = new Se(), this.highWaterMark = t, this.buffered = 0, this.error = null, this.pipeline = null, this.byteLength = s || a || Pe, this.map = r || n, this.afterWrite = It.bind(this), this.afterUpdateNextTick = Lt.bind(this);
  }
  get ended() {
    return (this.stream._duplexState & y) !== 0;
  }
  push(e) {
    return this.map !== null && (e = this.map(e)), this.buffered += this.byteLength(e), this.queue.push(e), this.buffered < this.highWaterMark ? (this.stream._duplexState |= x, !0) : (this.stream._duplexState |= mt, !1);
  }
  shift() {
    const e = this.queue.shift(), t = this.stream;
    return this.buffered -= this.byteLength(e), this.buffered === 0 && (t._duplexState &= nt), e;
  }
  end(e) {
    typeof e == "function" ? this.stream.once("finish", e) : e != null && this.push(e), this.stream._duplexState = (this.stream._duplexState | N) & Ee;
  }
  autoBatch(e, t) {
    const n = [], r = this.stream;
    for (n.push(e); (r._duplexState & se) === Ae; )
      n.push(r._writableState.shift());
    if ((r._duplexState & c) !== 0)
      return t(null);
    r._writev(n, t);
  }
  update() {
    const e = this.stream;
    for (; (e._duplexState & se) === x; ) {
      const t = this.shift();
      e._duplexState |= xt, e._write(t, this.afterWrite), e._duplexState &= et;
    }
    (e._duplexState & Et) === 0 && this.updateNonPrimary();
  }
  updateNonPrimary() {
    const e = this.stream;
    if ((e._duplexState & Tt) === N) {
      e._duplexState = (e._duplexState | m) & tt, e._final(Nt.bind(this));
      return;
    }
    if ((e._duplexState & p) === b) {
      (e._duplexState & ye) === 0 && (e._duplexState |= I, e._destroy(Ne.bind(this)));
      return;
    }
    (e._duplexState & Re) === T && (e._duplexState = (e._duplexState | I) & me, e._open(Ie.bind(this)));
  }
  updateNextTick() {
    (this.stream._duplexState & C) === 0 && (this.stream._duplexState |= C, pe(this.afterUpdateNextTick));
  }
}
class yt {
  constructor(e, { highWaterMark: t = 16384, map: n = null, mapReadable: r, byteLength: a, byteLengthReadable: s } = {}) {
    this.stream = e, this.queue = new Se(), this.highWaterMark = t, this.buffered = 0, this.error = null, this.pipeline = null, this.byteLength = s || a || Pe, this.map = r || n, this.pipeTo = null, this.afterRead = Dt.bind(this), this.afterUpdateNextTick = gt.bind(this);
  }
  get ended() {
    return (this.stream._duplexState & _) !== 0;
  }
  pipe(e, t) {
    if (this.pipeTo !== null)
      throw new Error("Can only pipe to one destination");
    if (typeof t != "function" && (t = null), this.stream._duplexState |= F, this.pipeTo = e, this.pipeline = new At(this.stream, e, t), t && this.stream.on("error", ae), j(e))
      e._writableState.pipeline = this.pipeline, t && e.on("error", ae), e.on("finish", this.pipeline.finished.bind(this.pipeline));
    else {
      const n = this.pipeline.done.bind(this.pipeline, e), r = this.pipeline.done.bind(this.pipeline, e, null);
      e.on("error", n), e.on("close", r), e.on("finish", this.pipeline.finished.bind(this.pipeline));
    }
    e.on("drain", wt.bind(this)), this.stream.emit("piping", e), e.emit("pipe", this.stream);
  }
  push(e) {
    const t = this.stream;
    return e === null ? (this.highWaterMark = 0, t._duplexState = (t._duplexState | E) & He, !1) : (this.map !== null && (e = this.map(e)), this.buffered += this.byteLength(e), this.queue.push(e), t._duplexState = (t._duplexState | S) & Xe, this.buffered < this.highWaterMark);
  }
  shift() {
    const e = this.queue.shift();
    return this.buffered -= this.byteLength(e), this.buffered === 0 && (this.stream._duplexState &= $e), e;
  }
  unshift(e) {
    let t;
    const n = [];
    for (; (t = this.queue.shift()) !== void 0; )
      n.push(t);
    this.push(e);
    for (let r = 0; r < n.length; r++)
      this.queue.push(n[r]);
  }
  read() {
    const e = this.stream;
    if ((e._duplexState & re) === S) {
      const t = this.shift();
      return this.pipeTo !== null && this.pipeTo.write(t) === !1 && (e._duplexState &= ne), (e._duplexState & K) !== 0 && e.emit("data", t), t;
    }
    return null;
  }
  drain() {
    const e = this.stream;
    for (; (e._duplexState & re) === S && (e._duplexState & ut) !== 0; ) {
      const t = this.shift();
      this.pipeTo !== null && this.pipeTo.write(t) === !1 && (e._duplexState &= ne), (e._duplexState & K) !== 0 && e.emit("data", t);
    }
  }
  update() {
    const e = this.stream;
    for (this.drain(); this.buffered < this.highWaterMark && (e._duplexState & ct) === 0; )
      e._duplexState |= lt, e._read(this.afterRead), e._duplexState &= Qe, (e._duplexState & v) === 0 && this.drain();
    (e._duplexState & _t) === dt && (e._duplexState |= X, e.emit("readable")), (e._duplexState & ht) === 0 && this.updateNonPrimary();
  }
  updateNonPrimary() {
    const e = this.stream;
    if ((e._duplexState & ft) === E && (e._duplexState = (e._duplexState | _) & Je, e.emit("end"), (e._duplexState & Te) === J && (e._duplexState |= b), this.pipeTo !== null && this.pipeTo.end()), (e._duplexState & p) === b) {
      (e._duplexState & ye) === 0 && (e._duplexState |= I, e._destroy(Ne.bind(this)));
      return;
    }
    (e._duplexState & Re) === T && (e._duplexState = (e._duplexState | I) & me, e._open(Ie.bind(this)));
  }
  updateNextTick() {
    (this.stream._duplexState & W) === 0 && (this.stream._duplexState |= W, pe(this.afterUpdateNextTick));
  }
}
class Rt {
  constructor(e) {
    this.data = null, this.afterTransform = Ot.bind(e), this.afterFinal = null;
  }
}
class At {
  constructor(e, t, n) {
    this.from = e, this.to = t, this.afterPipe = n, this.error = null, this.pipeToFinished = !1;
  }
  finished() {
    this.pipeToFinished = !0;
  }
  done(e, t) {
    if (t && (this.error = t), e === this.to && (this.to = null, this.from !== null)) {
      ((this.from._duplexState & _) === 0 || !this.pipeToFinished) && this.from.destroy(this.error || new Error("Writable stream closed prematurely"));
      return;
    }
    if (e === this.from && (this.from = null, this.to !== null)) {
      (e._duplexState & _) === 0 && this.to.destroy(this.error || new Error("Readable stream closed before ending"));
      return;
    }
    this.afterPipe !== null && this.afterPipe(this.error), this.to = this.from = this.afterPipe = null;
  }
}
function wt() {
  this.stream._duplexState |= F, (this.stream._duplexState & ot) === 0 ? this.updateNextTick() : this.drain();
}
function Nt(i) {
  const e = this.stream;
  i && e.destroy(i), (e._duplexState & p) === 0 && (e._duplexState |= y, e.emit("finish")), (e._duplexState & Te) === J && (e._duplexState |= b), e._duplexState &= be, this.update();
}
function Ne(i) {
  const e = this.stream;
  !i && this.error !== H && (i = this.error), i && e.emit("error", i), e._duplexState |= D, e.emit("close");
  const t = e._readableState, n = e._writableState;
  t !== null && t.pipeline !== null && t.pipeline.done(e, i), n !== null && n.pipeline !== null && n.pipeline.done(e, i);
}
function It(i) {
  const e = this.stream;
  i && e.destroy(i), e._duplexState &= be, (e._duplexState & bt) === L && (e._duplexState &= it, (e._duplexState & V) === V && e.emit("drain")), (e._duplexState & $) === 0 && this.update();
}
function Dt(i) {
  i && this.stream.destroy(i), this.stream._duplexState &= Ve, (this.stream._duplexState & k) === 0 && this.update();
}
function gt() {
  this.stream._duplexState &= Ze, this.update();
}
function Lt() {
  this.stream._duplexState &= rt, this.update();
}
function Ie(i) {
  const e = this.stream;
  i && e.destroy(i), (e._duplexState & b) === 0 && ((e._duplexState & at) === 0 && (e._duplexState |= U), (e._duplexState & St) === 0 && (e._duplexState |= z), e.emit("open")), e._duplexState &= xe, e._writableState !== null && e._writableState.update(), e._readableState !== null && e._readableState.update();
}
function Ot(i, e) {
  e != null && this.push(e), this._writableState.afterWrite(i);
}
class Z extends Ke {
  constructor(e) {
    super(), this._duplexState = 0, this._readableState = null, this._writableState = null, e && (e.open && (this._open = e.open), e.destroy && (this._destroy = e.destroy), e.predestroy && (this._predestroy = e.predestroy), e.signal && e.signal.addEventListener("abort", Ft.bind(this)));
  }
  _open(e) {
    e(null);
  }
  _destroy(e) {
    e(null);
  }
  _predestroy() {
  }
  get readable() {
    return this._readableState !== null ? !0 : void 0;
  }
  get writable() {
    return this._writableState !== null ? !0 : void 0;
  }
  get destroyed() {
    return (this._duplexState & D) !== 0;
  }
  get destroying() {
    return (this._duplexState & p) !== 0;
  }
  destroy(e) {
    (this._duplexState & p) === 0 && (e || (e = H), this._duplexState = (this._duplexState | b) & st, this._readableState !== null && (this._readableState.error = e, this._readableState.updateNextTick()), this._writableState !== null && (this._writableState.error = e, this._writableState.updateNextTick()), this._predestroy());
  }
  on(e, t) {
    return this._readableState !== null && (e === "data" && (this._duplexState |= K | w, this._readableState.updateNextTick()), e === "readable" && (this._duplexState |= Q, this._readableState.updateNextTick())), this._writableState !== null && e === "drain" && (this._duplexState |= V, this._writableState.updateNextTick()), super.on(e, t);
  }
}
class g extends Z {
  constructor(e) {
    super(e), this._duplexState |= T | y, this._readableState = new yt(this, e), e && (e.read && (this._read = e.read), e.eagerOpen && this.resume().pause());
  }
  _read(e) {
    e(null);
  }
  pipe(e, t) {
    return this._readableState.pipe(e, t), this._readableState.updateNextTick(), e;
  }
  read() {
    return this._readableState.updateNextTick(), this._readableState.read();
  }
  push(e) {
    return this._readableState.updateNextTick(), this._readableState.push(e);
  }
  unshift(e) {
    return this._readableState.updateNextTick(), this._readableState.unshift(e);
  }
  resume() {
    return this._duplexState |= w, this._readableState.updateNextTick(), this;
  }
  pause() {
    return this._duplexState &= ze, this;
  }
  static _fromAsyncIterator(e, t) {
    let n;
    const r = new g({
      ...t,
      read(s) {
        e.next().then(a).then(s.bind(null, null)).catch(s);
      },
      predestroy() {
        n = e.return();
      },
      destroy(s) {
        if (!n)
          return s(null);
        n.then(s.bind(null, null)).catch(s);
      }
    });
    return r;
    function a(s) {
      s.done ? r.push(null) : r.push(s.value);
    }
  }
  static from(e, t) {
    if (Ut(e))
      return e;
    if (e[O])
      return this._fromAsyncIterator(e[O](), t);
    Array.isArray(e) || (e = e === void 0 ? [] : [e]);
    let n = 0;
    return new g({
      ...t,
      read(r) {
        this.push(n === e.length ? null : e[n++]), r(null);
      }
    });
  }
  static isBackpressured(e) {
    return (e._duplexState & pt) !== 0 || e._readableState.buffered >= e._readableState.highWaterMark;
  }
  static isPaused(e) {
    return (e._duplexState & w) === 0;
  }
  [O]() {
    const e = this;
    let t = null, n = null, r = null;
    return this.on("error", (u) => {
      t = u;
    }), this.on("readable", a), this.on("close", s), {
      [O]() {
        return this;
      },
      next() {
        return new Promise(function(u, f) {
          n = u, r = f;
          const R = e.read();
          R !== null ? h(R) : (e._duplexState & D) !== 0 && h(null);
        });
      },
      return() {
        return d(null);
      },
      throw(u) {
        return d(u);
      }
    };
    function a() {
      n !== null && h(e.read());
    }
    function s() {
      n !== null && h(null);
    }
    function h(u) {
      r !== null && (t ? r(t) : u === null && (e._duplexState & _) === 0 ? r(H) : n({ value: u, done: u === null }), r = n = null);
    }
    function d(u) {
      return e.destroy(u), new Promise((f, R) => {
        if (e._duplexState & D)
          return f({ value: void 0, done: !0 });
        e.once("close", function() {
          u ? R(u) : f({ value: void 0, done: !0 });
        });
      });
    }
  }
}
class Pt extends Z {
  constructor(e) {
    super(e), this._duplexState |= T | _, this._writableState = new we(this, e), e && (e.writev && (this._writev = e.writev), e.write && (this._write = e.write), e.final && (this._final = e.final));
  }
  _writev(e, t) {
    t(null);
  }
  _write(e, t) {
    this._writableState.autoBatch(e, t);
  }
  _final(e) {
    e(null);
  }
  static isBackpressured(e) {
    return (e._duplexState & vt) !== 0;
  }
  write(e) {
    return this._writableState.updateNextTick(), this._writableState.push(e);
  }
  end(e) {
    return this._writableState.updateNextTick(), this._writableState.end(e), this;
  }
}
class De extends g {
  constructor(e) {
    super(e), this._duplexState = T, this._writableState = new we(this, e), e && (e.writev && (this._writev = e.writev), e.write && (this._write = e.write), e.final && (this._final = e.final));
  }
  _writev(e, t) {
    t(null);
  }
  _write(e, t) {
    this._writableState.autoBatch(e, t);
  }
  _final(e) {
    e(null);
  }
  write(e) {
    return this._writableState.updateNextTick(), this._writableState.push(e);
  }
  end(e) {
    return this._writableState.updateNextTick(), this._writableState.end(e), this;
  }
}
class ge extends De {
  constructor(e) {
    super(e), this._transformState = new Rt(this), e && (e.transform && (this._transform = e.transform), e.flush && (this._flush = e.flush));
  }
  _write(e, t) {
    this._readableState.buffered >= this._readableState.highWaterMark ? this._transformState.data = e : this._transform(e, this._transformState.afterTransform);
  }
  _read(e) {
    if (this._transformState.data !== null) {
      const t = this._transformState.data;
      this._transformState.data = null, e(null), this._transform(t, this._transformState.afterTransform);
    } else
      e(null);
  }
  _transform(e, t) {
    t(null, e);
  }
  _flush(e) {
    e(null);
  }
  _final(e) {
    this._transformState.afterFinal = e, this._flush(Ct.bind(this));
  }
}
class Wt extends ge {
}
function Ct(i, e) {
  const t = this._transformState.afterFinal;
  if (i)
    return t(i);
  e != null && this.push(e), this.push(null), t(null);
}
function Mt(...i) {
  return new Promise((e, t) => Le(...i, (n) => {
    if (n)
      return t(n);
    e();
  }));
}
function Le(i, ...e) {
  const t = Array.isArray(i) ? [...i, ...e] : [i, ...e], n = t.length && typeof t[t.length - 1] == "function" ? t.pop() : null;
  if (t.length < 2)
    throw new Error("Pipeline requires at least 2 streams");
  let r = t[0], a = null, s = null;
  for (let u = 1; u < t.length; u++)
    a = t[u], j(r) ? r.pipe(a, d) : (h(r, !0, u > 1, d), r.pipe(a)), r = a;
  if (n) {
    let u = !1;
    a.on("finish", () => {
      u = !0;
    }), a.on("error", (f) => {
      s = s || f;
    }), a.on("close", () => n(s || (u ? null : G)));
  }
  return a;
  function h(u, f, R, q) {
    u.on("error", q), u.on("close", We);
    function We() {
      if (f && u._readableState && !u._readableState.ended || R && u._writableState && !u._writableState.ended)
        return q(G);
    }
  }
  function d(u) {
    if (!(!u || s)) {
      s = u;
      for (const f of t)
        f.destroy(u);
    }
  }
}
function Oe(i) {
  return !!i._readableState || !!i._writableState;
}
function j(i) {
  return typeof i._duplexState == "number" && Oe(i);
}
function Ut(i) {
  return j(i) && i.readable;
}
function kt(i) {
  return typeof i == "object" && i !== null && typeof i.byteLength == "number";
}
function Pe(i) {
  return kt(i) ? i.byteLength : 1024;
}
function ae() {
}
function Ft() {
  this.destroy(new Error("Stream aborted."));
}
var Yt = {
  pipeline: Le,
  pipelinePromise: Mt,
  isStream: Oe,
  isStreamx: j,
  Stream: Z,
  Writable: Pt,
  Readable: g,
  Duplex: De,
  Transform: ge,
  PassThrough: Wt
};
class Gt extends Yt.Readable {
  constructor(e, t) {
    super(t), this._recorder = new MediaRecorder(e, t), this._recorder.addEventListener("dataavailable", this._handleData.bind(this));
  }
  pause() {
    this.destroyed || (this._recorder.pause(), super.pause());
  }
  resume() {
    this.destroyed || (this._recorder.resume(), super.resume());
  }
  start(e) {
    this.destroyed || this._recorder.start(e);
  }
  stop() {
    this.destroyed || this._recorder.stop();
  }
  _handleData({ data: e }) {
    this.destroyed || (e.size > 0 && this.push(e), this._recorder || this.push(null));
  }
  _cleanup() {
    var e, t;
    (e = this._recorder) == null || e.stop(), (t = this._recorder) == null || t.removeEventListener("dataavailable", this._handleData), this._recorder = null;
  }
  destroy() {
    this._cleanup();
  }
  _predestroy() {
    this._cleanup();
  }
  static isTypeSupported(...e) {
    return MediaRecorder.isTypeSupported(...e);
  }
}
export {
  Gt as default
};
