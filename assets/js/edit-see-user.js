//Déclaration de la variable de récupération de l'Id de l'utilisateur qui sera modifié
let userIdEdit = 0;
//Déclaration de la variable de récupération de la ligne séletionnée
let line; 
//Récupération des informations depuis le localStorage
let users = Sauvegarde.getUsers();
//Evènement de clic sur la liste d'utilisateurs
document.querySelector('#usersList').addEventListener('click', (e)=>{
    //Récupération de la ligne
    line = e.target;
    let userId = parseInt(line.parentElement.parentElement.childNodes[3].textContent);
    if(e.target.classList.contains('edit')){
        //Passage des informations dans les champs du formulaire
        users.forEach(user => {
            if(user.id === userId){
                userIdEdit = userId;
                document.getElementById('nom').value = user.nom;
                document.getElementById('prenom').value = user.prenom;
                document.getElementById('naissance').value = user.naissance;
                document.getElementById('email').value = user.email;
                document.getElementById('phone').value = user.phone;
                document.getElementById('sexe').value = user.sexe;
                document.getElementById('commentId').value = user.comment;
            }
        });
        console.log(userId);
        //Modification de l'id, le titre et le bouton "Sauvegarder" du formulaire
        modal.id ='formModalEdit';
        document.querySelector('#formTitle').textContent = 'Modification';
        document.getElementById('submitBtn').textContent = 'Modifier';
        //Appel du formulaire(modal) pour modification
        modal.style.display='flex';     
    }

    //Ligne sélectionnée au clic sur l'icône d'affichage
    if(e.target.classList.contains('see')){
        userModal.style.display='flex';
    }
});

//Evènement click du bouton "Modifier" du formulaire
document.getElementById('submitBtn').addEventListener('click', (e)=>{
    e.preventDefault();
    let nom = document.querySelector('#nom').value;
    let prenom = document.querySelector('#prenom').value;
    let naissance = document.querySelector('#naissance').value;
    let sexe = document.querySelector('#sexe').value;
    let email = document.querySelector('#email').value;
    let phone = document.querySelector('#phone').value;
    let comment = document.querySelector('#commentId').value;
    //Récupération des infos modifiées
    let userEdited = new Users(userIdEdit,nom,prenom,naissance,email,phone,sexe,comment);
    //Mise à jour des infos dans le localStorage
    Sauvegarde.updateUsers(userEdited);
    //Mise à jour des infos dans le tableau
    UI.updateUserList(userEdited,line.parentElement.parentElement);
    //Vidage des champs
    clearField();
    //Fermeture et initialisation des infos du formulaire(modal)
    modal.style.display='none';
    modal.id='formModal';
    document.getElementById('submitBtn').textContent = 'Sauvegarder';
    document.querySelector('#formTitle').textContent = 'Enrégistrement';

    alert('Modification effectuée !');
});

//