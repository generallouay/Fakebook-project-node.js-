const chatsWrapper = document.querySelector('.chats-wrapper');
(function navChatItemHover(){
    
const messagesBtn = document.getElementById('nav-message-btn');

messagesBtn.addEventListener('mouseenter', () => {
    chatsWrapper.style.zIndex = '9999';
    chatsWrapper.style.opacity = '100';
})

messagesBtn.addEventListener('mouseleave', () => {
    chatsWrapper.style.zIndex = '-9999';
    chatsWrapper.style.opacity = '0';

})

chatsWrapper.addEventListener('mouseenter', () => {
    chatsWrapper.style.zIndex = '9999';
    chatsWrapper.style.opacity = '100';
})

chatsWrapper.addEventListener('mouseleave', () => {
    chatsWrapper.style.zIndex = '-9999';
    chatsWrapper.style.opacity = '0';
})





})()

const chatsContainer = document.querySelector('.chats-conatiner');
const chats = [...chatsContainer.children];
const messagesWrapper = document.querySelector('.messages-wrapper')
const closeChatWrapper = document.querySelector('.close-msg-wrapper');
const closeChatBtn = document.getElementById('close-chat-btn');


chats.forEach(el => {
    el.addEventListener('click', () => {
        messagesWrapper.classList.add('active-messages-wrapper');
        chatsWrapper.style.zIndex = '-9999';
        chatsWrapper.style.opacity = '0';
        closeChatBtn.style.top = '25px';
        messagesWrapper.classList.add('active-messages-wrapper');
        closeChatBtn.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
    })
})


closeChatWrapper.addEventListener('mouseenter' , () => {
    closeChatBtn.style.top = '13px';
    if(messagesWrapper.classList.contains('active-messages-wrapper')){
        closeChatBtn.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
    }else{
        closeChatBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
    }
})

closeChatBtn.addEventListener('click', ()=>{
    if(!messagesWrapper.classList.contains('active-messages-wrapper')){
        closeChatBtn.style.top = '25px';
        messagesWrapper.classList.add('active-messages-wrapper');
        closeChatBtn.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
    }else if (messagesWrapper.classList.contains('active-messages-wrapper')){
        messagesWrapper.classList.remove('active-messages-wrapper');
        closeChatBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
    }

})



closeChatWrapper.addEventListener('mouseleave', (p) => {
    if(p.target.id !== 'close-chat-btn'){
        if(messagesWrapper.classList.contains('active-messages-wrapper')){
            closeChatBtn.style.top = '25px'
        }
    }
})