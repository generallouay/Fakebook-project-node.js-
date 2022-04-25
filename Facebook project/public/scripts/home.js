const friendsList = document.querySelector('.friends-container-home');
const allUsersList = document.querySelector('.users-container-home');
const exposeFirendsBtn = document.querySelector('#show-all-users-btn-home')
const exposeAllUsersBtn = document.querySelector('#show-all-friends-btn-home')


exposeFirendsBtn.addEventListener('click',()=>{
    if (!exposeFirendsBtn.classList.contains('active-home-u-btns')){
        exposeAllUsersBtn.classList.remove('active-home-u-btns');
        exposeFirendsBtn.classList.add('active-home-u-btns');
        allUsersList.style.display = 'flex'
        friendsList.style.display = 'none';
    }

})
exposeAllUsersBtn.addEventListener('click',()=>{
    if (!exposeAllUsersBtn.classList.contains('active-home-u-btns')){
        exposeFirendsBtn.classList.remove('active-home-u-btns');
        exposeAllUsersBtn.classList.add('active-home-u-btns');
        friendsList.style.display = 'flex'
        allUsersList.style.display = 'none';
    }

})

