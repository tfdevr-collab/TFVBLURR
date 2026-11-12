(() => {
 const $=s=>document.querySelector(s);
 const keyForm=$('#key-form'), key=$('#archive-key'), feedback=$('#key-feedback');
 const toggle=$('#recovery-toggle'), recovery=$('#recovery'), puzzle=$('#puzzle-form');
 toggle.addEventListener('click',()=>{recovery.hidden=!recovery.hidden;toggle.querySelector('span').textContent=recovery.hidden?'RECOVER FROM THE TRACES +':'CLOSE FIELD NOTES −';});
 keyForm.addEventListener('submit',e=>{e.preventDefault();if(key.value.trim().replace(/\s+/g,'')==='4745'){sessionStorage.setItem('tfvArchiveAccess','granted');feedback.textContent='SEQUENCE ACCEPTED. OPENING RECORD...';setTimeout(()=>location.href='black-archive.html',650);}else{feedback.textContent='ACCESS DENIED. THE SEQUENCE DOES NOT MATCH.';key.value='';key.focus();}});
 puzzle.addEventListener('submit',e=>{e.preventDefault();const values=[...new FormData(puzzle).values()].map(v=>String(v).trim().toLowerCase().replace(/[^a-z]/g,''));const expected=['lies','silence','bars','truth'];const ok=values.every((v,i)=>v===expected[i]);const out=$('#puzzle-feedback');if(ok){out.textContent='ALL FOUR RECORDS VERIFIED.';$('#sequence-reveal').hidden=false;}else{out.textContent='ONE OR MORE RECORDS DO NOT MATCH. RETURN TO THE PHOTOGRAPHS.';$('#sequence-reveal').hidden=true;}});
})();