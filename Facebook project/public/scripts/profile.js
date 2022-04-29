const postManageBtn = document.querySelectorAll('.manage-post-btn');
const postDeleteBtn = document.querySelectorAll('.post-delete-item');
const postEditButton = document.querySelectorAll('.post-edit-item')

const editPfpButton = document.getElementById('modify-pfp');
const createPostButton = document.querySelector('.create-post-btn');
const form = document.querySelector('.create-post-form-div');
const formOverlay = document.querySelector('.c-p-f-o');
const editPostOverlay = document.querySelector('.e-p-f-o');
const deletePostOverlay = document.querySelector('.d-p-f-o');
const closeFormBtn = document.querySelector('.create-post-form-cancel-btn');
const createPostTextarea = document.getElementById('c-p-textarea');
const editBioBtn = document.getElementById('edit-bio-btn');

for (btn of postManageBtn){
    btn.addEventListener('click' , (param)=>{
        const element = param.currentTarget.parentElement.nextElementSibling;
        setTimeout(() => {
            if(element.classList.contains('active-dropDown')){
                element.classList.remove('active-dropDown')
                setTimeout(() => {
                    element.style.display = 'none'
                }, 300);
            }else{
                element.classList.add('active-dropDown')
            }


        }, 1);
        element.style.display = 'flex'

    })
}


if (createPostButton){
    createPostButton.addEventListener('click' , ()=>{
        // document.querySelector('.create-post-div-home').style.zIndex = '0';
        setTimeout(() => {
            formOverlay.classList.add('active');
        }, 100);
    
        formOverlay.style.display = 'flex';
        createPostTextarea.focus()
    })
}

if (formOverlay){
    formOverlay.addEventListener('click',(param)=>{
        if(param.target.className.includes("c-p-f-o")){
            formOverlay.classList.remove('active');
            setTimeout(() => {
                // document.querySelector('.create-post-div-home').style.zIndex = '1';
                formOverlay.style.display = 'none'
            }, 400);
        }
    })
}

if(closeFormBtn){
    closeFormBtn.addEventListener('click',()=>{
        formOverlay.classList.remove('active');
            setTimeout(() => {
                // document.querySelector('.create-post-div-home').style.zIndex = '1';
                formOverlay.style.display = 'none'
            }, 400);
    })
}

if(postEditButton){  
    for (btn of postEditButton){
        btn.addEventListener('click' , (param) =>{
            const form = document.getElementById('edit-form');
            const postId = param.target.nextElementSibling.value;
            const editPostTitle = document.querySelector('.e-p-title');
            const editPostContent = document.querySelector('.e-p-content');
            const currentPostTitle = param.target.parentElement.parentElement.nextElementSibling.nextElementSibling.innerText;
            const currentPostContent = param.target.parentElement.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.innerText;

            editPostTitle.value = currentPostTitle;
            editPostContent.value = currentPostContent;


            form.action = '/post-edit/'+ postId;
            param.target.parentElement.style.display = 'none';
            param.target.parentElement.classList.remove('active-dropDown');
            setTimeout(() => {
                editPostOverlay.classList.add('active');
            }, 100);
        
            editPostOverlay.style.display = 'flex';
        })
    }
    
}
if (postDeleteBtn){
    for (btn of postDeleteBtn){
        btn.addEventListener('click' , (param)=>{
            const postId = param.target.previousElementSibling.value;
            const form = document.getElementById('post-del-form');
            form.action = '/delete-post/' + postId;


            param.target.parentElement.style.display = 'none';
            param.target.parentElement.classList.remove('active-dropDown');
            setTimeout(() => {
                deletePostOverlay.classList.add('active');
            }, 100);
        
            deletePostOverlay.style.display = 'flex';



           

        })


    }
}


if(editPostOverlay){
    editPostOverlay.addEventListener('click',(param)=>{
        if(param.target.classList.contains('e-p-f-o')){
            editPostOverlay.classList.remove('active');
            setTimeout(() => {
                editPostOverlay.style.display = 'none'
            }, 400);
        }
    })

    document.querySelector('.e-p-f-c-b').addEventListener('click',()=>{
        
        editPostOverlay.classList.remove('active');
            setTimeout(() => {
                editPostOverlay.style.display = 'none'
            }, 400);
    })
}



if(deletePostOverlay){
    deletePostOverlay.addEventListener('click',(param)=>{
        if(param.target.classList.contains('d-p-f-o')){
            deletePostOverlay.classList.remove('active');
            setTimeout(() => {
                deletePostOverlay.style.display = 'none'
            }, 400);
        }
    })

    document.querySelector('#delete-post-cancel').addEventListener('click',()=>{
        
        deletePostOverlay.classList.remove('active');
            setTimeout(() => {
                deletePostOverlay.style.display = 'none'
            }, 400);
    })
}

// the reason behind these multiple if statements is because my stupid ass included some shit where i'm not supposed to, this script called profile is also included in the home page cuz i'm lazo so it wont find those while rendering the home page ;
// also remember : developers are not lazy , they're exhausted! 
if(editPfpButton){
    const delbtn = document.querySelector('.delete-pfp-btn')
    editPfpButton.addEventListener('mouseenter', (p) => {
        delbtn.style.display = 'flex';
  
    })
    editPfpButton.addEventListener('mouseleave', (p) => {
        delbtn.style.display = 'none'
    })
}

if (editBioBtn){
    editBioBtn.addEventListener('click',(p) =>{
        const paragraph = p.currentTarget.previousElementSibling;
        const form = document.createElement('form')
        form.action = '/edit-bio';
        form.method = 'post';
        form.classList.add('update-bio-form')
        paragraph.parentElement.appendChild(form);
        

        const input = document.createElement('input');
        input.value = paragraph.innerText;
        paragraph.style.display = 'none';
        input.setAttribute('name' , 'bio');

        input.classList.add('bio-inp')
        input.maxLength = '120'
        input.spellcheck = 'false';
        form.previousElementSibling.style.display = 'none';

        const updateBioBtn = document.createElement('button');
        const cancelUpdateBioBtn = document.createElement('button');


        cancelUpdateBioBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        cancelUpdateBioBtn.classList.add('update-bio-btn')

        updateBioBtn.classList.add('update-bio-btn');
        updateBioBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        updateBioBtn.setAttribute('type', 'submit')

        form.appendChild(input)
        form.appendChild(updateBioBtn);
        form.parentElement.appendChild(cancelUpdateBioBtn);
        input.focus()

        cancelUpdateBioBtn.addEventListener('click', () => {
            form.previousElementSibling.style.display = 'block'
            form.remove()
            cancelUpdateBioBtn.remove();
            paragraph.style.display = 'block';
        })
    })
}