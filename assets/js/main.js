//Création de la classe utilisateur
class Users{
    constructor(id,nom,prenom,naissance,email,phone,sexe,comment){
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.naissance = naissance;
        this.email = email;
        this.phone = phone;
        this.sexe = sexe;
        this.comment = comment;
    }
}
//Création de la classe de sauvegarde dans le local storage
class Sauvegarde{

    //Récupération des utilisateurs enrégistrés dans le localStorage
static getUsers(){
        let users
        if(localStorage.getItem('users') === null){
            users = [];
        } else {
            users = JSON.parse(localStorage.getItem('users'));
        }
        return users;
    }
    //Ajout d'utilisateur dans le localStorage
    static addUsers(user){
        let users = Sauvegarde.getUsers();
        users.push(user);
        localStorage.setItem('users',JSON.stringify(users));
    }
    //Mise à jour d'un utilisateur dans le localStorage
    static updateUsers(user){
        let users = Sauvegarde.getUsers();
        users.forEach(info =>{
            if(user.id === info.id){
                info.id = user.id;
                info.nom = user.nom;
                info.prenom = user.prenom;
                info.naissance = user.naissance;
                info.email = user.email;
                info.phone = user.phone;
                info.sexe = user.sexe;
                info.comment = user.comment;
            }
        });
        localStorage.setItem('users',JSON.stringify(users));
    }
    //Suppression des utilisateurs dans le localStorage
    static removeUsers(id){
        let users = Sauvegarde.getUsers();

        users.forEach((user, index) => {
            if(user.id === id){
                users.splice(index, 1);
            }
        });
        localStorage.setItem('users',JSON.stringify(users));
    }
}
//Création de la classe contenant les méthodes à utiliser sur l'interface utilsateur
class UI{
    static displayUsers(){
        let users = Sauvegarde.getUsers();

        users.forEach(user => UI.addusersToList(user));
    }
    static addusersToList(user){
        let usersList = document.getElementById('usersList');
        let row = document.createElement('tr');
        row.className = 'userRow'; 
        row.innerHTML = `
        <td><input type="checkbox" class="selectUser" id="checkbox"></td>
        <td>${user.id}</td>
        <td>${user.nom}</td>
        <td>${user.prenom}</td>
        <td>${user.naissance}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.sexe}</td>
        <td>
            <i class="fa-solid fa-pen edit"></i>
            <i class="fa-solid fa-eye see"></i>
            <i class="fa-solid fa-xmark delete"></i>
            <i class="fa-solid fa-comment comment"></i>
        </td>
        `;

        if(usersList.hasChildNodes()){
            usersList.insertBefore(row, usersList.firstChild);
        } else{
                usersList.insertBefore(row, null);
            }
    }
    //Modification et mise à jour d'un utilisateur dans le tableau
    static updateUserList(user,line){
        let usersList = document.getElementById('usersList');
        let row = document.createElement('tr');
        
        row.innerHTML = `
        <td><input type="checkbox" class="selectUser" id="checkbox"></td>
        <td>${user.id}</td>
        <td>${user.nom}</td>
        <td>${user.prenom}</td>
        <td>${user.naissance}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.sexe}</td>
        <td>
            <i class="fa-solid fa-pen edit"></i>
            <i class="fa-solid fa-eye see"></i>
            <i class="fa-solid fa-xmark delete"></i>
            <i class="fa-solid fa-comment comment"></i>
        </td>
        `;
        //Remplacement de la ligne sélectionnée par la ligne avec les infos mises à jour
        line.replaceWith(row);
    }
    //Suppression des utilisateurs dans le tableau d'affichage
    static deleteUser(element) {
        if(element.classList.contains('delete')) {
          element.parentElement.parentElement.remove();
        }
      }
    //Recherche et Filtrage
    static filter(text){
        let searchResult = [];
        // Récupération des éléments à filtrer
        let items = document.getElementsByClassName('userRow');
        // Mettre les elements dans un tableau, puis les parcourir
        Array.from(items).forEach(item =>{
            let itemName = item.textContent;
            //Comparer chaque élément avec le texte de recherche
            if(itemName.toLowerCase().indexOf(text) != -1){
                item.style.display = 'table-row';
                searchResult.push(item);
            }
                else{
                    item.style.display = 'none';
                }
        });
        return searchResult;
    }
}

// Affichage des utilisateurs
document.addEventListener('DOMContentLoaded', UI.displayUsers());