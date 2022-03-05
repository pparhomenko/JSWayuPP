const tabs = document.getElementById('tabs');
const content = document.querySelectorAll('.content');
const psevBtn = document.getElementById('contentPsev');
const psevCont = document.querySelectorAll('.content-p');



const changeClass = el =>{
    for(let i = 0; i<tabs.children.length;i++){
        tabs.children[i].classList.remove('active');
    }
    el.classList.add('active');
}

const changeClass2 = el =>{

    for(let i = 0; i<psevBtn.children.length;i++){
        psevBtn.children[i].classList.remove('active');
    }
    el.classList.add('active');
   
}


tabs.addEventListener('click',e => {
const currTab = e.target.dataset.btn;
changeClass(e.target);
for(let i = 0; i<content.length;i++){
    content[i].classList.remove('active');
    if(content[i].dataset.content === currTab ){
        content[i].classList.add('active');
    }
}  
})


psevBtn.addEventListener('click',e => {
    const currTab = e.target.dataset.btn;
    changeClass2(e.target);
    for(let i = 0; i<psevCont.length;i++){
        psevCont[i].classList.remove('active');
        if(psevCont[i].dataset.content === currTab ){
            psevCont[i].classList.add('active');
        }
    }  
    })
