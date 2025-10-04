
const postLinks = [
  "https://www.gorababa.com/2025/09/online-notepad-free-simple-notes-editor_7.html",
  "https://www.gorababa.com/2025/09/online-mortgage-calculator.html",
  "https://www.gorababa.com/2025/09/girl-name-generator-female-name_5.html",
  "https://www.gorababa.com/2025/09/boy-name-generator-male-name-generator_4.html",
  "https://www.gorababa.com/2025/09/free-age-calculator.html",
  "https://www.gorababa.com/2025/09/countdown-to-india-independence-day_9.html",
  "https://www.gorababa.com/2025/09/password-generator-strong-and-secure_2.html",
  "https://www.gorababa.com/2025/09/celebrate-with-new-year-countdown_5.html",
  "https://www.gorababa.com/2025/09/my-birthday-countdown.html",
  "https://www.gorababa.com/2025/09/all-in-one-image-converter-fast-free.html",
  "https://www.gorababa.com/2025/09/online-screen-recorder-record-your-own.html",
  "https://www.gorababa.com/2025/09/free-online-word-counter-track-your_6.html",
  "https://www.gorababa.com/2025/09/google-drive-direct-link-generator_6.html",
  "https://www.gorababa.com/2025/09/what-is-my-ip-check-your-public-ip_0.html",
];

// ======= Helper =======
function escapeHtml(str){return String(str||"").replace(/[&<>"']/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));}

// Blogger feed se HD image nikalna (s1600/original)
function getHD(entry){
  let img="";
  if(entry.media$thumbnail?.url){
    img = entry.media$thumbnail.url
           .replace(/\/s\d+(-c)?\//,"/s1600/")
           .replace(/=s\d+(-c)?/,"=s1600");
  }else if(entry.content?.$t){
    const m=entry.content.$t.match(/<img[^>]+src="([^">]+)"/i);
    if(m){
      img = m[1]
             .replace(/\/s\d+(-c)?\//,"/s1600/")
             .replace(/=s\d+(-c)?/,"=s1600");
    }
  }
  return img || "https://via.placeholder.com/1600x900/eeeeee/999999?text=No+Image";
}

// ======= Grid Build =======
const container=document.getElementById("bloggerGrid");

postLinks.forEach(link=>{
  const blog=new URL(link).origin;
  const card=document.createElement("div");
  card.className="post-card";
  card.innerHTML="<div style='padding:40px;text-align:center;color:#888;'>Loading…</div>";
  container.appendChild(card);

  const cb="cb_"+Math.random().toString(36).slice(2);
  window[cb]=data=>{
    delete window[cb];
    document.head.removeChild(script);
    const entry=data.feed?.entry?.find(e=>
      e.link?.some(l=>l.rel==="alternate" && l.href===link)
    );
    if(entry){
      const title=entry.title.$t;
      const snippet=(entry.summary?.$t||"").replace(/<[^>]+>/g,"").slice(0,140);
      const img=getHD(entry);
      card.innerHTML=`
        <a href="${escapeHtml(link)}" target="_blank" rel="noopener">
          <img src="${escapeHtml(img)}" alt="${escapeHtml(title)}" loading="lazy">
          <div class="body">
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(snippet)}</p>
          </div>
        </a>`;
    }else{
      card.innerHTML=`<a href="${escapeHtml(link)}" target="_blank"><div class="body"><h3>${escapeHtml(link)}</h3></div></a>`;
    }
  };

  const script=document.createElement("script");
  script.src=`${blog}/feeds/posts/default?alt=json-in-script&max-results=500&callback=${cb}`;
  document.head.appendChild(script);
});

// ======= 🔎 Search Function =======
function doSearch(){
  const term=document.getElementById("searchInput").value.toLowerCase();
  document.querySelectorAll(".post-card").forEach(card=>{
    const txt=card.innerText.toLowerCase();
    card.style.display = txt.includes(term) ? "" : "none";
  });
}

document.getElementById("searchBtn").addEventListener("click",doSearch);
document.getElementById("searchInput").addEventListener("keypress",function(e){
  if(e.key==="Enter"){ doSearch(); }
});
