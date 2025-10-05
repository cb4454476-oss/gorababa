function cleanText(s){return s.replace(/\u00A0/g,' ').replace(/\s+/g,' ').trim();}
function countAll(s){
  const cleaned=cleanText(s);
  const charsWith=s.length;
  const charsNoSpace=cleaned.replace(/\s/g,'').length;
  const words=cleaned===''?0:cleaned.split(' ').filter(w=>w.length>0).length;
  return {words,charsWith,charsNoSpace};
}

const textInput=document.getElementById('textInput');
const countBtn=document.getElementById('countBtn');
const clearBtn=document.getElementById('clearBtn');
const wordsEl=document.getElementById('words');
const charsEl=document.getElementById('chars');
const charsNoSpaceEl=document.getElementById('charsNoSpace');
const messageEl=document.getElementById('message');

countBtn.addEventListener('click',()=>{
  messageEl.textContent='';
  let raw=textInput.value;
  if(!raw.trim()){messageEl.textContent='Please enter some text.';return;}
  const c=countAll(raw);
  wordsEl.textContent=c.words.toLocaleString();
  charsEl.textContent=c.charsWith.toLocaleString();
  charsNoSpaceEl.textContent=c.charsNoSpace.toLocaleString();
  messageEl.textContent='Counting completed!';
});

clearBtn.addEventListener('click',()=>{
  textInput.value='';
  wordsEl.textContent='0'; charsEl.textContent='0'; charsNoSpaceEl.textContent='0';
  messageEl.textContent='';
});
