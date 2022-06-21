//Ajout d'utilisateur(s)
var lastId = 0;
//Appel de la variable modal depuis le fichier modal.js pour déclarer l'événement
modal.addEventListener('submit', (e) => {
    //Empêchement de l'évenement de soumission par défaut du formulaire
    e.preventDefault();

    //Récupération des valeurs du formulaire
    lastId++;
    let nom = document.querySelector('#nom').value;
    let prenom = document.querySelector('#prenom').value;
    let naissance = document.querySelector('#naissance').value;
    let sexe = document.querySelector('#sexe').value;
    let email = document.querySelector('#email').value;
    let phone = document.querySelector('#phone').value;
    let comment = document.querySelector('#commentId').value;

    //Création d'une instance de la classe Users pour enrégistrement d'utilisateurs
    let user = new Users(lastId,nom,prenom,naissance,email,phone,sexe,comment);

    //Ajout au tableau
    UI.addusersToList(user);

    //Ajout à la sauvegarde
    Sauvegarde.addUsers(user);

    //Vidage des champs : fonction appelée depuis modal.js
    // clearField();

    //Fermeture du modal
    modal.style.display = 'none'

    alert(`Utilisateur ${nom} ${prenom} enrégistré !`);
 });

 //Suppression d'un utilisateur
 let deleleList = [];
 let uncheckedUser = [];
//  let checkedUserList = document.querySelectorAll('#checkbox');
 let deleteBtn = document.querySelector('#removeBtn');
 document.querySelector('#usersList').addEventListener('click', (e) =>{
    //Récupération des utilisateurs sélectionnés dans un tableau
    if(e.target.classList.contains('selectUser')){
        if(e.target.checked){
            deleleList.push(e.target);
        }
            else if(!e.target.checked){
                uncheckedUser.push(e.target);
            }
    }
    console.log(deleleList);
    console.log(uncheckedUser);
    //Si l'on clique sur l'icône de suppression
    if(e.target.classList.contains('delete')){
        if(confirm('Êtes-vous sûre de vouloir supprimer cet utilisateur?')){
            //Suppression dans le tableau d'affichage
            UI.deleteUser(e.target);

            //Suppression dans le localStorage
            Sauvegarde.removeUsers(parseInt(e.target.parentElement.parentElement.childNodes[3].textContent));

            alert('Utilisateur Supprimé !');
        }
            else{
                alert('Suppression annulée !');
            }
    }
 });

 
//Suppression d'une liste d'utilisateurs sélectionnés
    //Clic sur le bouton Supprimer
    document.getElementById('removeBtn').addEventListener('click',()=>{
        if(confirm('Veuillez confirmer la suppression')){
            //Comparaison des 2 tableaux pour garder les lignes sélectionnées à l'aide des checkbox
            deleleList.forEach((checkedUser,index)=>{
                uncheckedUser.forEach((element,i)=>{
                    if(checkedUser===element){
                        deleleList.splice(index,1);
                        uncheckedUser.splice(i,1);
                    }
                });
            });
            //Parcours du tableau et passage de chaque élément aux méthodes de suppression
            deleleList.forEach((element)=> {
                //Suppression dans le tableau d'affichage
                element.parentElement.parentElement.remove();

                //Suppression dans le localStorage
                Sauvegarde.removeUsers(parseInt(element.parentElement.parentElement.childNodes[3].textContent));
            });
            alert('Utilisateur(s) Supprimé(s) !');
        }
            else{
                alert('Suppression annulée !');
            }
    });