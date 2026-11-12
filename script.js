(() => {
  const pieces = [
    ['TRACE_001','PUBLIC NOTICE','artwork-01.jpg'],
    ['TRACE_002','AFTER HOURS','artwork-02.jpg'],
    ['TRACE_003','PASSING MOMENT','artwork-03.jpg'],
    ['TRACE_004','COMFORT ZONE','artwork-04.jpg'],
    ['TRACE_005','LOW TIDE','artwork-05.jpg'],
    ['TRACE_006','THE WANT','artwork-06.jpg'],
    ['TRACE_007','THE LONG RUN','artwork-07.jpg']
  ];
  const $ = s => document.querySelector(s);
  const viewer = $('#viewer'), viewerImage = $('#viewer-image'); let current = 0;
  function showPiece(index){current=(index+pieces.length)%pieces.length;const p=pieces[current];viewerImage.src=p[2];viewerImage.alt=p[0]+' — '+p[1];$('#viewer-id').textContent=p[0];$('#viewer-tag').textContent=p[1];viewer.classList.add('open');viewer.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';}
  function closeViewer(){viewer.classList.remove('open');viewer.setAttribute('aria-hidden','true');document.body.style.overflow='';}
  document.querySelectorAll('[data-piece]').forEach(b=>b.addEventListener('click',()=>showPiece(Number(b.dataset.piece))));
  $('.viewer-close').addEventListener('click',closeViewer);$('.viewer-prev').addEventListener('click',()=>showPiece(current-1));$('.viewer-next').addEventListener('click',()=>showPiece(current+1));viewer.addEventListener('click',e=>{if(e.target===viewer)closeViewer();});
  const nav=$('#navigation'), toggle=$('.nav-toggle');toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.querySelector('b').textContent=open?'×':'+';});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.querySelector('b').textContent='+';}));
  const terminal=$('#terminal'), output=$('#terminal-output'), input=$('#terminal-input');
  function openTerminal(){terminal.classList.add('open');terminal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';setTimeout(()=>input.focus(),80);}
  function closeTerminal(){terminal.classList.remove('open');terminal.setAttribute('aria-hidden','true');document.body.style.overflow='';}
  document.querySelectorAll('.secret-open,.dot-secret').forEach(b=>b.addEventListener('click',openTerminal));$('.terminal-close').addEventListener('click',closeTerminal);terminal.addEventListener('click',e=>{if(e.target===terminal)closeTerminal();});
  const commands={help:'Available commands: help, about, echo, signal, trace, archive, clear, exit',about:'The work is public. The author is not.',echo:'You are still here. Interesting.',signal:'FOLLOW THE MARKS: 001 → 002 → 004 → 007. SOLVE EACH TRACE. COUNT THE LETTERS IN EACH ANSWER. JOIN THE FOUR NUMBERS.',trace:'The visible archive contains more than images. Read the words, not the walls.',archive:'__ARCHIVE__',clear:'__CLEAR__',exit:'Connection closed. (Not really.)'};
  $('#terminal-form').addEventListener('submit',e=>{e.preventDefault();const command=input.value.trim().toLowerCase();if(!command)return;const line=document.createElement('p');line.textContent='visitor@street:~$ '+command;output.append(line);const result=document.createElement('p');result.textContent=commands[command]||'Command not recognised. Maybe that is the point.';if(command==='clear'){output.innerHTML='';}else if(command==='exit'){output.append(result);setTimeout(closeTerminal,650);}else if(command==='archive'){output.append(result);setTimeout(()=>{window.location.href='access.html';},500);}else output.append(result);input.value='';});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeViewer();closeTerminal();}if(viewer.classList.contains('open')&&e.key==='ArrowRight')showPiece(current+1);if(viewer.classList.contains('open')&&e.key==='ArrowLeft')showPiece(current-1);});
})();
