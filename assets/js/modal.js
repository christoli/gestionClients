// Contrôle du modal d'enrégistrement et d'affichage utilisateur

//Récupération des éléments
let addBtn = document.querySelector('#addBtn');
let modal = document.querySelector('#formModal');
let closeBtn = document.querySelector('#closeBtn');
let cancel = document.querySelector('#cancelBtn');
let userCloseBtn = document.getElementById('userCloseBtn');
let userModal = document.getElementById('userProfil');

//Evénements
addBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
userCloseBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

//Ouverture du modal
function openModal(){
    modal.style.display = 'flex';
}

 //Vider les champs du formulaire
 function clearField(){
    document.querySelector('#nom').value = '';
    document.querySelector('#prenom').value = '';
    document.querySelector('#naissance').value = '';
    document.querySelector('#sexe').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#phone').value = '';
    document.querySelector('#commentId').value = '';
}

//Fermeture du modal
function closeModal(){
    modal.style.display = 'none';
    userModal.style.display = 'none';
    clearField(); 
    modal.id='formModal';
    document.getElementById('submitBtn').textContent = 'Sauvegarder';
    document.querySelector('#formTitle').textContent = 'Enrégistrement';  
}
function outsideClick(e){
    if(e.target.classList.contains === 'modal'){
        modal.display.style = 'none';
        clearField();
        modal.id='formModal';
        document.getElementById('submitBtn').textContent = 'Sauvegarder';
        document.querySelector('#formTitle').textContent = 'Enrégistrement';
    }
}
