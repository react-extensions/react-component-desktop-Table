!(function(a) {
  let t;
  let c =
    '<svg><symbol id="icon-check-square" viewBox="0 0 1024 1024"><path d="M433.1 657.7c12.7 17.7 39 17.7 51.7 0l210.6-292c3.8-5.3 0-12.7-6.5-12.7H642c-10.2 0-19.9 4.9-25.9 13.3L459 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H315c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8z"  ></path><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32z m-40 728H184V184h656v656z"  ></path></symbol><symbol id="icon-border" viewBox="0 0 1024 1024"><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32z m-40 728H184V184h656v656z"  ></path></symbol><symbol id="icon-right" viewBox="0 0 1024 1024"><path d="M765.7 486.8L314.9 134.7c-5.3-4.1-12.9-0.4-12.9 6.3v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1c16.4-12.8 16.4-37.6 0-50.4z"  ></path></symbol><symbol id="icon-left" viewBox="0 0 1024 1024"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8c-16.4 12.8-16.4 37.5 0 50.3l450.8 352.1c5.3 4.1 12.9 0.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"  ></path></symbol><symbol id="icon-doubleleft" viewBox="0 0 1024 1024"><path d="M272.9 512l265.4-339.1c4.1-5.2 0.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3c-9.1 11.6-9.1 27.9 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512z"  ></path><path d="M576.9 512l265.4-339.1c4.1-5.2 0.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3c-9.1 11.6-9.1 27.9 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z"  ></path></symbol><symbol id="icon-doubleright" viewBox="0 0 1024 1024"><path d="M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1c-4.1 5.2-0.4 12.9 6.3 12.9h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z"  ></path><path d="M837.2 492.3L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1c-4.1 5.2-0.4 12.9 6.3 12.9h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z"  ></path></symbol><symbol id="icon-ellipsis" viewBox="0 0 1024 1024"><path d="M232 511m-56 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0Z"  ></path><path d="M512 511m-56 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0Z"  ></path><path d="M792 511m-56 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0Z"  ></path></symbol><symbol id="icon-caret-down" viewBox="0 0 1024 1024"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"  ></path></symbol><symbol id="icon-caret-up" viewBox="0 0 1024 1024"><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"  ></path></symbol><symbol id="icon-caret-right" viewBox="0 0 1024 1024"><path d="M715.8 493.5L335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37z"  ></path></symbol><symbol id="icon-caret-left" viewBox="0 0 1024 1024"><path d="M689 165.1L308.2 493.5c-10.9 9.4-10.9 27.5 0 37L689 858.9c14.2 12.2 35 1.2 35-18.5V183.6c0-19.7-20.8-30.7-35-18.5z"  ></path></symbol></svg>';
  const e = (t = document.getElementsByTagName('script'))[
    t.length - 1
  ].getAttribute('data-injectcss');
  if (e && !a.__iconfont__svg__cssinject__) {
    a.__iconfont__svg__cssinject__ = !0;
    try {
      document.write(
        '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>'
      );
    } catch (t) {
      console && console.log(t);
    }
  }
  !(function(t) {
    if (document.addEventListener) {
      if (~['complete', 'loaded', 'interactive'].indexOf(document.readyState)) {
        setTimeout(t, 0);
      } else {
        var e = function() {
          document.removeEventListener('DOMContentLoaded', e, !1), t();
        };
        document.addEventListener('DOMContentLoaded', e, !1);
      }
    } else {
      document.attachEvent &&
        ((c = t),
        (o = a.document),
        (i = !1),
        (n = function() {
          i || ((i = !0), c());
        }),
        (l = function() {
          try {
            o.documentElement.doScroll('left');
          } catch (t) {
            return void setTimeout(l, 50);
          }
          n();
        })(),
        (o.onreadystatechange = function() {
          o.readyState == 'complete' && ((o.onreadystatechange = null), n());
        }));
    }
    let c;
    let o;
    let i;
    let n;
    let l;
  })(function() {
    let t;
    let e;
    ((t = document.createElement('div')).innerHTML = c),
      (c = null),
      (e = t.getElementsByTagName('svg')[0]) &&
        (e.setAttribute('aria-hidden', 'true'),
        (e.style.position = 'absolute'),
        (e.style.width = 0),
        (e.style.height = 0),
        (e.style.overflow = 'hidden'),
        (function(t, e) {
          e.firstChild
            ? (function(t, e) {
                e.parentNode.insertBefore(t, e);
              })(t, e.firstChild)
            : e.appendChild(t);
        })(e, document.body));
  });
})(window);
