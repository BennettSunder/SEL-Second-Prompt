let additional = false;
let nowDragging = null;
let offset = [0,0];

function openDialogue(){
  document.getElementById('full-grey-out').style.display = 'grid';
  document.getElementById('dialogue-container').style.display = 'block';
  document.getElementById('dialogue-container').style.top = window.innerHeight/2 - (document.getElementById('dialogue-container').offsetHeight/2)+'px';
  document.getElementById('dialogue-container').style.left = window.innerWidth/2 - (document.getElementById('dialogue-container').offsetWidth/2)+'px';
}

function cancelDialogue(){
  document.getElementById('full-grey-out').style.display = 'none';
  document.getElementById('dialogue-container').style.display = 'none';
}

function addCount(){
  let currentCount = parseInt(document.getElementById('confirm-counter').innerHTML);
  currentCount += 1;
  document.getElementById('confirm-counter').innerHTML = currentCount;
  cancelDialogue();
}

function dragElement(){
    let element = document.getElementById('dialogue-container');
    element.style.position = "absolute";
    document.getElementById('dialogue-header').onmousedown = function(){
        nowDragging = element;
        // alert(nowDragging)
         
    }
    this.addEventListener('mousedown', (event) =>{
        const rect = nowDragging.getBoundingClientRect();
        offset[0] = event.clientX - rect.left;
        offset[1] = event.clientY - rect.bottom;
    });
}

document.onmouseup = function(){
    nowDragging = null;
}

document.onmousemove = function(move){
    let x = move.pageX;
    let y = move.pageY;

    nowDragging.style.left = x - offset[0] + "px";
    nowDragging.style.top = y - offset[1] - nowDragging.offsetHeight + "px";

    keepInWondow();
}

function keepInWondow(){
  const box = nowDragging.getBoundingClientRect();

  if (box.top < 0){
    nowDragging.style.top = '0px';
  }
  if (box.bottom > window.innerHeight){
    nowDragging.style.top = window.innerHeight - box.height +'px';
  }
  if (box.left < 0){
    nowDragging.style.left = '0px';
  }
  if (box.right > window.innerWidth){
    nowDragging.style.left =  window.innerWidth - box.width + 'px';
  }

}