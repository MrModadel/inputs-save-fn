let form = document.forms.todo
let input = form.querySelector('input')
let cont = document.querySelector('.container')
let todos = []


form.onsubmit = (e) => {
   e.preventDefault();

   let task = {
      id: Math.random(),
      isDone: false,
      task: input.value,
      time: new Date().getHours() + ":" + new Date().getMinutes()
   }

   if (input.value.length !== 0) {
      todos.push(task)
      reload(todos, cont)
   }

}

function reload(arr, place) {
   place.innerHTML = ""
   let span;
   let itemTask;
   for (let item of arr) {
      let item_div = document.createElement('div')
      let div_top = document.createElement('div')
      let span_top = document.createElement('span')
      let span_time = document.createElement('span')
      let delete_btn = document.createElement('button')
      let edit_btn = document.createElement('button')

      item_div.classList.add('item')
      div_top.classList.add('top')
      span_time.classList.add('time')

      span_top.innerHTML = item.task
      span_time.innerHTML = item.time
      delete_btn.innerHTML = "x"
      edit_btn.innerHTML = "edit"
      edit_btn.dataset.modal = '0';
      place.append(item_div)
      div_top.append(span_top, delete_btn, edit_btn)
      item_div.append(div_top, span_time)

      delete_btn.onclick = () => {
         todos = todos.filter(el => el.id !== item.id)
         item_div.classList.add('remove_anim')
         setTimeout(() => {
            item_div.remove()
         }, 1000)
      }
      // modal
      let form = document.forms.modal;
      let modal = document.querySelector('.modal');
      let closeBtns = document.querySelectorAll('[data-close]');
      let input = document.querySelector('.modal__input');
      let btn = document.querySelector('.btn');

      closeBtns.forEach((btn) => {
         btn.onclick = () => {
            modal.classList.remove('show', 'fade')
         }
      })
      if (item.isDone === true) {
         span_top.style.textDecoration = 'line-through red';
      }
      edit_btn.onclick = () => {
         input.value = span_top.innerText;
         itemTask = item;
         span = span_top;
         modal.classList.add('show', 'fade');
      }
      btn.onclick=()=>{
         span.innerText = input.value;
         itemTask.task = input.value;
         console.log(arr);
         
         modal.classList.remove('show', 'fade');
      }
      form.onsubmit = (e) => {
         e.preventDefault();
      }
      span_top.onclick = () => {
         if (span_top.style.textDecoration !== 'line-through red') {
            span_top.style.textDecoration = 'line-through red';
            item.isDone = true;
            console.log(arr);

         } else {
            span_top.style.textDecoration = 'none';
            item.isDone = false;
            console.log(arr);

         }
      }
   }
}
