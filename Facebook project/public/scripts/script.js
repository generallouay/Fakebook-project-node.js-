const logoutBtn =  document.getElementById('logout-btn');
const overlay = document.querySelector('.overlay-main');
const cancelBtn = document.getElementById('close-btn');
const notificationsWrapper = document.querySelector('.notifications-wrapper');
const likeBtns = document.querySelectorAll('.like-btn-home')
const likeItemsToStyle = document.querySelectorAll('.like-btn-home .fa-heart , .like-btn-home p');

for(btn of likeBtns){
    btn.addEventListener('click',(param)=>{
        const likesCount = +param.currentTarget.lastChild.innerText
        param.currentTarget.classList.toggle('active-like-btn')
        if(param.currentTarget.classList.contains('active-like-btn')){
            param.currentTarget.lastChild.innerText = likesCount + 1
            return param.currentTarget.previousElementSibling.value = 'like'
        }
        param.currentTarget.lastChild.innerText = likesCount - 1
        param.currentTarget.previousElementSibling.value = 'cancel'
    })
}



logoutBtn.addEventListener('click',()=>{

    cancelBtn.addEventListener('click',()=>{
        overlay.classList.remove('active');
        setTimeout(() => {
            overlay.style.display = 'none'
        }, 400);


    })
    setTimeout(() => {
        overlay.classList.add('active');
    }, 100);

    overlay.style.display = 'flex';
})

overlay.addEventListener('click',(param)=>{
    if(param.target.className.includes("overlay")){
        overlay.classList.remove('active');
        setTimeout(() => {
            overlay.style.display = 'none'
        }, 400);
    }
})

const notificationsBtn = document.getElementById('notifications-btn');
notificationsBtn.addEventListener('click' , ()=>{
    notificationsWrapper.classList.toggle('active-notifications');
})



