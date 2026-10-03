// @ts-nocheck
(function(){
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $(s, c){ return (c || document).querySelector(s); }
  function $$(s, c){ return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  /* sticky nav */
  var nav = $('#nav');
  function onScroll(){ nav.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, {passive: true}); onScroll();

  /* fade-up reveal */
  var reveals = $$('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function(el){ el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {rootMargin: '0px 0px -8% 0px', threshold: 0.08});
    reveals.forEach(function(el){ io.observe(el); });
  }

  /* accordions: one open per group */
  function accordion(group, itemSel, btnSel){
    var items = $$(itemSel, group);
    items.forEach(function(item){
      var btn = $(btnSel, item);
      btn.addEventListener('click', function(){
        var wasOpen = item.classList.contains('open');
        items.forEach(function(o){ o.classList.remove('open'); $(btnSel, o).setAttribute('aria-expanded', 'false'); });
        if (!wasOpen){ item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
      });
    });
  }
  $$('.acc').forEach(function(g){ accordion(g, '.acc-item', '.acc-btn'); });
  accordion($('.qa'), '.qa-item', '.qa-btn');

  /* feature tabs */
  var tabs = $$('.tab');
  function selectTab(tab, focus){
    tabs.forEach(function(t){
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute('aria-controls'));
      panel.hidden = !on;
      if (on && !reduce){
        var mock = $('.mock', panel);
        if (mock.animate) mock.animate([{opacity: 0, transform: 'translateY(12px)', filter: 'blur(6px)'}, {opacity: 1, transform: 'none', filter: 'blur(0)'}], {duration: 500, easing: 'cubic-bezier(.2,.7,.2,1)'});
        $$('*', mock).forEach(function(n){ if (n.getAnimations) n.getAnimations().forEach(function(a){ try { a.currentTime = 0; } catch {} }); });
      }
    });
    if (focus) tab.focus();
  }
  tabs.forEach(function(t, i){
    t.addEventListener('click', function(){ selectTab(t); });
    t.addEventListener('keydown', function(e){
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (d){ e.preventDefault(); selectTab(tabs[(i + d + tabs.length) % tabs.length], true); }
    });
  });

  /* copy buttons copy the text that is shown */
  function bindCopy(btn, getText){
    btn.addEventListener('click', function(){
      var text = getText();
      function done(){
        btn.classList.add('done'); $('span', btn).textContent = 'Copied';
        setTimeout(function(){ btn.classList.remove('done'); $('span', btn).textContent = 'Copy'; }, 1800);
      }
      function fallback(){
        var ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', '');
        ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch {}
        document.body.removeChild(ta); done();
      }
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
    });
  }
  bindCopy($('#copy'), function(){ return $('#cmd').textContent; });
  $$('.qs .copy').forEach(function(btn){
    bindCopy(btn, function(){ return document.getElementById(btn.getAttribute('data-copy-for')).textContent; });
  });

  /* quickstart client tabs */
  var qsTabs = $$('.qs-tab');
  function selectQs(tab, focus){
    qsTabs.forEach(function(t){
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tab.focus();
  }
  qsTabs.forEach(function(t, i){
    t.addEventListener('click', function(){ selectQs(t, false); });
    t.addEventListener('keydown', function(e){
      var next = null;
      if (e.key === 'ArrowRight') next = qsTabs[(i + 1) % qsTabs.length];
      else if (e.key === 'ArrowLeft') next = qsTabs[(i - 1 + qsTabs.length) % qsTabs.length];
      else if (e.key === 'Home') next = qsTabs[0];
      else if (e.key === 'End') next = qsTabs[qsTabs.length - 1];
      if (next){ e.preventDefault(); selectQs(next, true); }
    });
  });

  /* policy engine mirroring the example policy (first match wins) */
  var policy = [
    {tool: 'read_*', action: 'allow'},
    {tool: 'write_*', prefix: '/etc', action: 'deny'},
    {tool: 'write_*', action: 'ask'},
    {tool: '*', action: 'ask'}
  ];
  function globToRe(g){ return new RegExp('^' + g.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$'); }
  function decide(tool, path){
    for (var i = 0; i < policy.length; i++){
      var r = policy[i];
      if (globToRe(r.tool).test(tool) && (!r.prefix || (path && path.indexOf(r.prefix) === 0))) return {i: i, action: r.action};
    }
    return {i: -1, action: 'ask'};
  }

  /* live tool-call stream */
  var calls = [
    {tool: 'read_file', path: 'src/index.ts'},
    {tool: 'write_file', path: '/etc/hosts'},
    {tool: 'list_directory', path: 'src/', ans: 'approved'},
    {tool: 'read_multiple_files', paths: '["README.md","package.json"]'},
    {tool: 'write_file', path: 'src/app.ts', ans: 'approved'},
    {tool: 'move_file', path: 'src/old.ts', ans: 'denied'},
    {tool: 'read_file', path: 'docs/policy.md'},
    {tool: 'write_file', path: '/etc/ssh/sshd_config'},
    {tool: 'read_text_file', path: 'tests/proxy.test.mjs'},
    {tool: 'edit_file', path: 'src/config.ts', ans: 'approved'}
  ];
  var stream = $('#stream'), rules = $$('.rule'), idc = 2, ci = 0, MAX = 9;
  var counts = {allow: 0, deny: 0, ask: 0}, lines = 0;
  function pad(n){ return (n < 10 ? '0' : '') + n; }
  function clock(){ var d = new Date(); return pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()); }
  function chip(cls, label){ var s = document.createElement('span'); s.className = 'chip v v-' + cls; s.textContent = label; return s; }
  function bump(action){
    counts[action]++; lines++;
    var el = document.getElementById('c-' + action); if (el) el.textContent = counts[action];
    var l = document.getElementById('c-lines'); if (l) l.textContent = lines + (lines === 1 ? ' line' : ' lines');
  }
  function mkRow(c){
    var row = document.createElement('div'); row.className = 'srow';
    idc += 1 + Math.floor(Math.random() * 2);
    row.innerHTML = '<span class="t"></span><span class="id"></span><span class="tool"></span><span class="args"></span>';
    $('.t', row).textContent = clock(); $('.id', row).textContent = idc;
    $('.args', row).textContent = c.paths ? '{"paths":' + c.paths + '}' : '{"path":"' + c.path + '"}';
    return row;
  }
  function trim(){
    var rows = $$('.srow:not(.leaving)', stream);
    while (rows.length > MAX){
      var old = rows.shift(); old.classList.add('leaving');
      (function(o){ setTimeout(function(){ if (o.parentNode) o.parentNode.removeChild(o); }, 360); })(old);
    }
  }
  function highlight(i){ rules.forEach(function(r, k){ r.classList.toggle('hit', k === i); }); }
  function askChip(c){
    var ok = c.ans === 'approved';
    var ch = chip(ok ? 'allow' : 'deny', ok ? 'ASK→APPROVED' : 'ASK→DENIED'); ch.style.fontSize = '10px'; return ch;
  }
  function finish(row, c, d, instant){
    highlight(d.i);
    if (d.action === 'ask' && !instant){
      var ch = chip('ask', 'ASK'); ch.classList.add('pending'); row.appendChild(ch);
      setTimeout(function(){ if (ch.parentNode) row.replaceChild(askChip(c), ch); bump('ask'); }, 1300);
    } else {
      row.appendChild(d.action === 'ask' ? askChip(c) : chip(d.action, d.action.toUpperCase()));
      bump(d.action);
    }
  }
  function next(){
    var c = calls[ci++ % calls.length], d = decide(c.tool, c.path || '');
    var row = mkRow(c), toolEl = $('.tool', row), args = $('.args', row);
    args.style.opacity = '0';
    stream.appendChild(row); trim();
    var caret = document.createElement('span'); caret.className = 'caret';
    var n = 0;
    (function type(){
      if (n <= c.tool.length){
        toolEl.textContent = c.tool.slice(0, n); toolEl.appendChild(caret); n++;
        setTimeout(type, 28 + Math.random() * 30);
      } else {
        if (caret.parentNode) caret.parentNode.removeChild(caret);
        args.style.transition = 'opacity .3s'; args.style.opacity = '1';
        setTimeout(function(){ finish(row, c, d); }, 260);
        setTimeout(next, d.action === 'ask' ? 2300 : 1500);
      }
    })();
  }
  function seed(count){
    for (var k = 0; k < count; k++){
      var c = calls[ci++ % calls.length], d = decide(c.tool, c.path || ''), row = mkRow(c);
      $('.tool', row).textContent = c.tool; row.style.animation = 'none';
      stream.appendChild(row); finish(row, c, d, true);
    }
  }
  if (reduce){ seed(8); }
  else {
    seed(4);
    var started = false;
    var start = function(){ if (!started){ started = true; setTimeout(next, 600); } };
    if ('IntersectionObserver' in window){
      var sio = new IntersectionObserver(function(es){ if (es[0].isIntersecting){ start(); sio.disconnect(); } }, {threshold: 0.1});
      sio.observe($('.term'));
    } else start();
  }

  /* first-match-wins diagram */
  var probes = [
    {tool: 'write_file', path: '/etc/hosts'},
    {tool: 'read_file', path: 'src/index.ts'},
    {tool: 'write_file', path: 'src/app.ts'},
    {tool: 'move_file', path: 'src/old.ts'}
  ];
  var colors = {allow: '#35dfb4', deny: '#ff5c6c', ask: '#f5b83d'};
  var steps = $$('#steps .step'), yl = $$('#yaml .yl[data-r]'), pv = $('#probe-v'), pc = $('#probe-call'), pi = 0;
  function showProbe(p){
    var d = decide(p.tool, p.path);
    pc.textContent = p.tool + ' ' + p.path;
    steps.forEach(function(s, k){
      s.className = 'step ' + (k < d.i ? 'skip' : k === d.i ? 'match' : 'idle');
      s.style.setProperty('--vc', colors[d.action]);
      $('small', s).textContent = k < d.i ? 'no match' : k === d.i ? 'match → ' + d.action : 'not checked';
    });
    yl.forEach(function(l){ var on = +l.getAttribute('data-r') === d.i; l.className = 'yl' + (on ? ' on ' + d.action : ''); });
    pv.className = 'chip v-' + d.action; pv.textContent = d.action.toUpperCase();
  }
  showProbe(probes[0]);
  if (!reduce) setInterval(function(){ pi = (pi + 1) % probes.length; showProbe(probes[pi]); }, 2600);
})();
