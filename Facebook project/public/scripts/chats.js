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

chats.forEach(el => {
    el.addEventListener('click', () => {
        messagesWrapper.classList.add('active-messages-wrapper');
        chatsWrapper.style.zIndex = '-9999';
        chatsWrapper.style.opacity = '0';
    })
})