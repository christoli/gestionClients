//Déclaration de la variable de récupération de l'Id de l'utilisateur qui sera modifié
let userIdEdit = 0;
//Déclaration de la variable de récupération de la ligne séletionnée
let line;
let commentTitle; 
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
                document.getElementById('editNom').value = user.nom;
                document.getElementById('editPrenom').value = user.prenom;
                document.getElementById('editBirthday').value = user.naissance;
                document.getElementById('editEmail').value = user.email;
                document.getElementById('editPhone').value = user.phone;
                document.getElementById('editSexe').value = user.sexe;
                document.getElementById('editCommentId').value = user.comment;
            }
        });
        //Appel du formulaire de modification
        editModal.style.display='flex';     
    }

    //Ligne sélectionnée au clic sur l'icône d'affichage
    if(e.target.classList.contains('see')){
        //Affichage des informations dans le modal
        users.forEach(user => {
            if(user.id === userId){
                userIdEdit = userId;
                document.getElementById('infoNom').innerHTML = user.nom;
                document.getElementById('infoPrenom').innerHTML = user.prenom;
                document.getElementById('infoNaissance').innerHTML = user.naissance;
                document.getElementById('infoEmail').innerHTML = user.email;
                document.getElementById('infoTel').innerHTML = user.phone;
                document.getElementById('infoSexe').innerHTML = user.sexe;
                document.getElementById('userComment').innerHTML = user.comment;
            }
        });
        userModal.style.display='flex';
    }
});

//Evènement click du bouton "Modifier" du formulaire
document.getElementById('editForm').addEventListener('submit', (e)=>{
    e.preventDefault();
    let nom = document.querySelector('#editNom').value;
    let prenom = document.querySelector('#editPrenom').value;
    let naissance = document.querySelector('#editBirthday').value;
    let sexe = document.querySelector('#editSexe').value;
    let email = document.querySelector('#editEmail').value;
    let phone = document.querySelector('#editPhone').value;
    let comment = document.querySelector('#editCommentId').value;
    //Récupération des infos modifiées
    let userEdited = new Users(userIdEdit,nom,prenom,naissance,email,phone,sexe,comment);
    //Mise à jour des infos dans le tableau
    UI.updateUserList(userEdited,e.target.parentElement.parentElement);
    //Mise à jour des infos dans le localStorage
    Sauvegarde.updateUsers(userEdited);
    //Vidage des champs
    clearField();
    //Fermeture du formulaire(modal)
    editModal.style.display='none';

    alert('Modification effectuée !');
});

//Affichage du commentaire au survol de l'icône de commentaire
    //Déclaration de l'événement de survol et récupération de l'élément comment
    document.querySelector('#usersList').addEventListener('mouseover', (e) =>{
        if(e.target.classList.contains('comment')){
            let userId = parseInt(e.target.parentElement.parentElement.childNodes[3].textContent);
            users.forEach(user =>{
                if(user.id === userId){
                    commentTitle = user.comment;
                }
            });
            e.target.title = commentTitle.substr(0, 49);
        }
    });

//Recherche et Filtrage
let resultList;
    //Evenement d'entrée dans l'input de recherche
    document.getElementById('searchField').addEventListener('keyup', (e)=>{
        //Récupération de la valeur de l'input
        let text = e.target.value.toLowerCase();
        //console.log(text);
        //Passage du texte à la méthode de filtrage et récupération des résultats de recherche
        resultList = UI.filter(text);
    });