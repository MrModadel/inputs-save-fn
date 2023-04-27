
let doc = document;
let form = doc.forms.add;
let mainArr = []
form.onsubmit = (e) => {
   e.preventDefault();
   let obj = {};
   let rm = Math.random();
   obj.id = rm;
   obj.isDone = false;
   obj.time = startTime();
   obj.task = form.querySelector('input').value;
   mainArr.push(obj);
   console.log(mainArr);
   obj = {};
   creater()
}
function checkTime(i) {
   if (i < 10) {
      i = "0" + i;
   }
   return i;
}
function startTime() {
   var today = new Date();
   var h = today.getHours();
   var m = today.getMinutes();
   m = checkTime(m);
   let text = h + ":" + m;
   let t = setTimeout(function () {
      startTime()
   }, 30000);
   return text;
}
startTime();
let container = doc.querySelector('.look__container')

//create
function creater() {
   container.innerHTML = ''
   for (let i of mainArr) {
      let doc = document
      let item = doc.createElement('div');
      let left = doc.createElement('div');
      let right = doc.createElement('div');
      let title = doc.createElement('h1');
      let time = doc.createElement('div');
      let img = doc.createElement('img');
      //style
      item.className = 'look__item item';
      left.classList.add('item__left');
      right.classList.add('item__right');
      title.classList.add('item__title');
      title.innerText = i.task;
      time.classList.add('item__time');
      time.innerText = i.time
      img.src = './img/close.svg';
      img.classList.add('item__close-img');
      img.alt = 'close';
      //append
      item.append(left, right);
      left.append(title, time);
      right.append(img);
      container.append(item);
      img.onclick=()=>{
         mainArr = mainArr.filter(el=>el.id!==i.id);
         console.log(mainArr);
         
         creater()
      }
   }
}

