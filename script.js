const devices=[
 {id:"fridge",icon:"🧊",name:"냉장고",status:"정상",type:"normal"},
 {id:"dishwasher",icon:"🍽️",name:"식기세척기",status:"세척 완료",type:"warn"},
 {id:"washer",icon:"👕",name:"세탁기",status:"세탁 완료",type:"warn"},
 {id:"oven",icon:"🔥",name:"오븐",status:"대기",type:"normal"},
 {id:"robot",icon:"🧹",name:"로봇청소기",status:"청소 완료",type:"normal"},
 {id:"ac",icon:"❄️",name:"에어컨",status:"꺼짐",type:"normal"}
];

const tasks=[
 {icon:"🍽️",title:"식기세척기 비우기",desc:"세척이 완료되었습니다. 식기를 꺼내주세요.",priority:"지금",cls:""},
 {icon:"🧊",title:"대파 소비하기",desc:"소비기한이 1일 남았습니다. 오늘 요리에 활용해보세요.",priority:"우선",cls:"orange"},
 {icon:"👕",title:"세탁물 건조하기",desc:"세탁이 완료되었습니다. 건조기 사용을 권장합니다.",priority:"오늘",cls:"yellow"},
 {icon:"🧹",title:"로봇청소기 예약 확인",desc:"오늘 21:00 청소가 예정되어 있습니다.",priority:"오늘",cls:"yellow"},
 {icon:"🧊",title:"냉장고 정리",desc:"이번 주 냉장고 내부 정리를 권장합니다.",priority:"이번 주",cls:"yellow"}
];

const detailData={
 fridge:{
  title:"🧊 냉장고",subtitle:"식재료와 소비기한을 관리하세요.",
  services:[
   ["🍳","오늘 뭐 먹지?","현재 재료로 만들 수 있는 요리 추천"],
   ["⚠️","소비기한 관리","빨리 먹어야 하는 식재료 확인"],
   ["🛒","장보기","부족한 재료를 장보기 목록에 추가"],
   ["🧼","냉장고 관리","청소·필터·온도 상태 확인"]
  ],
  extra:`<div class="detail-card"><b>🥬 소비기한이 가까운 식재료</b>
   <div class="ingredient"><span>대파</span><span class="danger">1일 남음</span></div>
   <div class="ingredient"><span>계란</span><span>4일 남음</span></div>
   <div class="ingredient"><span>우유</span><span>5일 남음</span></div>
   <div class="ingredient"><span>닭가슴살</span><span>6일 남음</span></div>
  </div>`
 },
 dishwasher:{title:"🍽️ 식기세척기",subtitle:"세척 상태와 관리 서비스를 확인하세요.",services:[
  ["▶","세척 상태","현재 세척 완료 · 식기를 꺼내주세요"],
  ["⏱","예약 세척","원하는 시간에 자동 세척 예약"],
  ["✨","코스 추천","식기 상태에 맞는 세척 코스 추천"],
  ["🧼","관리","필터와 세척제 상태 확인"]
 ]},
 washer:{title:"👕 세탁기",subtitle:"세탁 상태와 다음 행동을 관리하세요.",services:[
  ["▶","세탁 상태","세탁 완료 · 건조기로 옮겨주세요"],
  ["⏱","예약 세탁","원하는 시간에 세탁 시작"],
  ["👕","코스 추천","의류 종류에 맞는 코스 추천"],
  ["🧼","관리","세탁조와 필터 관리"]
 ]},
 oven:{title:"🔥 오븐",subtitle:"요리와 조리 과정을 연결하세요.",services:[
  ["🍳","요리 시작","추천 레시피를 바로 조리"],
  ["🌡","예열","추천 온도로 예열 시작"],
  ["⏱","타이머","조리 시간 설정"],
  ["🧼","관리","내부 청소와 관리"]
 ]},
 robot:{title:"🧹 로봇청소기",subtitle:"청소 일정과 상태를 관리하세요.",services:[
  ["▶","청소 시작","지금 바로 청소 시작"],
  ["📅","예약","청소 시간을 설정"],
  ["🗺","청소 구역","청소할 공간 선택"],
  ["🧼","관리","먼지통과 브러시 관리"]
 ]},
 ac:{title:"❄️ 에어컨",subtitle:"실내 환경과 에너지 사용을 관리하세요.",services:[
  ["❄","냉방 시작","원하는 온도로 냉방 시작"],
  ["⏱","예약","켜짐·꺼짐 예약"],
  ["🌡","온도","실내 온도 확인"],
  ["🧼","관리","필터 상태 확인"]
 ]}
};

function $(id){return document.getElementById(id)}
function renderTasks(){
 $("priorityTasks").innerHTML=tasks.slice(0,3).map(taskHTML).join("");
 $("allTasks").innerHTML=tasks.map(taskHTML).join("");
 $("taskCount").textContent=tasks.slice(0,3).length+"개";
}
function taskHTML(t){
 return `<div class="task"><div class="task-icon">${t.icon}</div><div class="task-body"><div class="task-title">${t.title}</div><div class="task-desc">${t.desc}</div></div><span class="priority ${t.cls}">${t.priority}</span></div>`;
}
function deviceHTML(d){
 return `<div class="device" data-device="${d.id}"><div class="device-icon">${d.icon}</div><div class="device-name">${d.name}</div><div class="device-status"><span class="status-dot ${d.type==="warn"?"warn":""}"></span>${d.status}</div></div>`;
}
function renderDevices(){
 $("devicePreview").innerHTML=devices.slice(0,4).map(deviceHTML).join("");
 $("deviceFull").innerHTML=devices.map(deviceHTML).join("");
}
function showPage(page){
 document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
 $(page+"Page").classList.add("active");
 document.querySelectorAll(".nav-item").forEach(n=>n.classList.toggle("active",n.dataset.page===page));
 window.scrollTo({top:0,behavior:"smooth"});
}
function openDevice(id){
 const d=devices.find(x=>x.id===id), data=detailData[id];
 $("detailTitle").textContent=data.title;
 $("detailSubtitle").textContent=data.subtitle;
 $("deviceDetail").innerHTML=`
  <div class="detail-card">
   <div class="detail-status"><div class="big-device">${d.icon}</div><div style="text-align:right"><h2>${d.status}</h2><span class="online">● 연결됨</span></div></div>
   <div class="service-grid">${data.services.map((s,i)=>`<div class="service" data-service="${id}-${i}"><div style="font-size:20px;margin-bottom:9px">${s[0]}</div><b>${s[1]}</b><p>${s[2]}</p></div>`).join("")}</div>
  </div>
  ${data.extra||""}`;
 showPage("deviceDetail");
}
function toast(msg){const t=$("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
document.addEventListener("click",e=>{
 const nav=e.target.closest("[data-page]");
 if(nav) showPage(nav.dataset.page);
 const dev=e.target.closest("[data-device]");
 if(dev) openDevice(dev.dataset.device);
 const service=e.target.closest("[data-service]");
 if(service){
  const id=service.dataset.service.split("-")[0];
  const labels={fridge:["오늘의 요리를 준비하고 있어요.","소비기한이 가까운 식재료를 확인했어요.","장보기 목록에 추가할 재료를 정리했어요.","냉장고 관리 상태를 확인했어요."],
  dishwasher:["세척 상태를 확인했어요.","예약 세척 기능을 준비했어요.","식기 상태에 맞는 코스를 추천했어요.","관리 상태를 확인했어요."],
  washer:["세탁 상태를 확인했어요.","예약 세탁 기능을 준비했어요.","의류에 맞는 코스를 추천했어요.","관리 상태를 확인했어요."],
  oven:["추천 요리를 시작할 준비가 되었어요.","예열을 준비했어요.","조리 타이머를 설정할 수 있어요.","관리 상태를 확인했어요."],
  robot:["청소를 시작할 준비가 되었어요.","청소 예약을 준비했어요.","청소 구역을 선택할 수 있어요.","관리 상태를 확인했어요."],
  ac:["냉방을 시작할 준비가 되었어요.","예약 기능을 준비했어요.","실내 온도를 확인했어요.","관리 상태를 확인했어요."]};
  toast(labels[id][Number(service.dataset.service.split("-")[1])]||"서비스를 실행했어요.");
 }
});
$("recipeFromHome").addEventListener("click",()=>showPage("recipe"));
$("startOven").addEventListener("click",()=>toast("오븐을 180℃로 예열할 준비를 했어요."));
$("bellBtn").addEventListener("click",()=>toast("새로운 집안일 알림 3개가 있어요."));
renderTasks();renderDevices();
