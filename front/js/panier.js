//PAGE PANIER

const cart = JSON.parse(localStorage.getItem("cart"));
console.table(cart);


async function displayItem() {
    if (cart === null || cart == 0) { // Si panier vide >>> afficher msg "Le panier est vide" + display none formulaire.
		document.getElementById("cart__items").innerHTML = "<p>\u2689 Le panier est vide. Vous pouvez retourner sur notre page d'accueil. \u2689</p>";
        document.getElementById("cart__items").style.fontSize = '24px';
        document.querySelector(".cart__order").style.display = "none";
        // document.querySelector(".cart__price").style.display = "none";
    } else {
        for (let i = 0; i < cart.length; i++) {
            const product = cart[i];
            let idKanap = product.ref;
            let selectedColor = product.color;
            let quantity = product.quantity;

            // appeler l'api et récup les données de l'élément ciblé dans la boucle
            await fetch("http://localhost:3000/api/products/" + idKanap)
                .then(function (res) {
                    if (res.ok) {
                        return res.json();
                    }
                })
                .then(function (value) { // affichage du panier 
                    let productPrice = value.price;
                    let productName = value.name;
                    let imageUrl = value.imageUrl;
                    let altTxt = value.altTxt;

                    // créer les éléments dans lesquels les infos des produits vont ê affichés :
                    let cartSection = document.querySelector('#cart__items');
                    let article = document.createElement('article');
                    article.className = "cart__item";
                    article.setAttribute('data-id', idKanap);
                    article.setAttribute('color-id', selectedColor);

                    let divImage = document.createElement('div');
                    divImage.className = ".cart__item__img";
                    divImage.innerHTML = `<img src="${imageUrl}" alt="${altTxt}" width="175px" height="auto">`

                    let divContent = document.createElement('div');
                    divContent.className = "cart__item__content";

                    let divTitlePrice = document.createElement('div');
                    divTitlePrice.className = "cart__item__content__titlePrice";
                    let title = document.createElement('h2');
                    title.innerHTML = productName;
                    let price = document.createElement('p');
                    price.innerHTML = productPrice + ' EUR';

                    let divSettings = document.createElement('div');
                    divSettings.className = "cart__item__content__settings";
                    
                    let divQuantity = document.createElement('div');
                    divQuantity.className = "cart__item__content__settings__quantity";
                
                    let quantityTitle = document.createElement('p');
                    quantityTitle.innerHTML = "Qté : ";
                    let quantityInput = document.createElement('input');
                    quantityInput.type = "number";
                    quantityInput.name = "itemQuantity";
                    quantityInput.className = "itemQuantity";
                    quantityInput.min = "1";
                    quantityInput.max = "100";
                    quantityInput.value = quantity;

                    let divColor = document.createElement('div');
                    divColor.innerHTML = `<p>Couleur : ${selectedColor}<p>`;

                    let divDelete = document.createElement('div');
                    divDelete.className = "cart__item__content__settings__delete";
                    let deleteItem = document.createElement('p');
                    deleteItem.className = "deleteItem";
                    deleteItem.innerText = "Supprimer";

                    // affichage des éléments (jai respecté le fichier html)
                    divTitlePrice.appendChild(title);
                    divTitlePrice.appendChild(price);
                    divContent.appendChild(divTitlePrice);

                    divQuantity.appendChild(quantityTitle);
                    divQuantity.appendChild(quantityInput);
                    divSettings.appendChild(divColor);
                    divSettings.appendChild(divQuantity);
                    divDelete.appendChild(deleteItem);
                    divSettings.appendChild(divDelete);
                    divContent.appendChild(divSettings);

                    article.appendChild(divImage);
                    article.appendChild(divContent);
                    cartSection.appendChild(article);
                })
                .catch(function (error) {
                    console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
                });
                // fonction TT qté/price, delete, etc...
                totalItemInCart();
                totalPrice();
        }
    };
}
displayItem();

        // Function TTal Qté
        function totalItemInCart() {
            let quantitySelector = document.querySelectorAll(".itemQuantity");
            let totalItem = 0;
            for (let i = 0; i < quantitySelector.length; i++) {
                totalItem += parseInt(quantitySelector[i].value);
            }
            const totalQuantityDisplay = document.getElementById("totalQuantity");
            totalQuantityDisplay.innerHTML = totalItem;
        }
         // Function TTal Prix
        function totalPrice() {
            let quantitySelector = document.querySelectorAll(".itemQuantity");
            let totalCartPrice = 0;
            for (let i = 0; i < quantitySelector.length; i++) {
                let articleDOM = quantitySelector[i].closest("article");  // a modifier
                let individualPrice = articleDOM.dataset.price;
                totalCartPrice += parseInt(quantitySelector[i].value) * individualPrice; // a revoir
            }
            let totalPriceDisplay = document.getElementById("totalPrice");
            totalPriceDisplay.innerHTML = totalCartPrice;
        }
        // Function Delete
        function deleteItem() {
            let btnDeleteItem = document.querySelectorAll(".deleteItem")
            console.log(btnDeleteItem);
            for (let z=0; z < btnDeleteItem.length; z++){
                btnDeleteItem[z].addEventListener("click" , (event) => {
                    event.preventDefault(); // pour ne pas que la page s'acctualise qd je clic sur le btn suppr (peut etre un comportement par défaut des btns)
                })
            }
        }
//  >>>> sélectionner l'id du produit à delete PUIS methode filter? puis alert + location.reload();





//récupération des données du formulaire 
const form = document.querySelector('.cart__order__form');
const firstNameForm = document.querySelector('#firstName');
const lastNameForm = document.querySelector('#lastName');
const addressForm = document.querySelector('#address');
const cityForm = document.querySelector('#city');
const emailForm = document.querySelector('#email');

/*  Constructor ??
const formulaireValues = {
    prenom: document.querySelector("#firstName").value,       le point value minteresse*/   

// Regex

function controlFirstName() {
    const firstNameForm = document.querySelector('#firstName');
    if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,30}$/.test(firstNameForm)) {
      return true;
    } else {
      const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
      firstNameErrorMsg.innerText = "Merci de vérifier le prénom, 2 caractères mini, 30 max";
    }} 
    // rajouter msg succes ? 
    // A TESTER, besoin du gi? 
controlFirstName();

// .innerHTML
// new RegExp
let regexLastName = /[a-zA-ZÀ-ÿ]/
const lastNameErrorMsg = document.querySelector('#lastNameErrorMsg');
let regexAddress = /[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)/
const addressErrorMsg = document.querySelector('#addressErrorMsg');
let regexCity =/^[a-zA-Z\u0080-\u024F\s\/\-\)\(\`\.\"\']+$/ // revoir
const cityErrorMsg = document.querySelector('#cityErrorMsg');
let regexEmail = /[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})/ //revoir
const emailErrorMsg = document.querySelector('#emailErrorMsg');
// (/^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$  que des lettres de 3 a 20 cc 
// [A-Za-z]{3,20}
// /^[0-9]{5} [A-Za-zÀ-ÿ\-' ]+$/gi cp + lettres ?

// RegExp.prototype.test(string) <<< pr tester mon regex

/* gi? en fin de regex? ( FLAG )
g modifier: global. All matches (don't return on first match)
i modifier: insensitive. Case insensitive match (ignores case of [a-zA-Z])
In your case though i is immaterial as you dont capture [a-zA-Z].
For input like !@#$ if g modifier is not there regex will return first match !See here.
If g is there it will return the whole or whatever it can match.See here */



   // Pouvoir modifier une qtité produit (addEventListener?)
// input.addEventListener('change', updateValue <<<< change


//.reduce ? La méthode reduce() applique une fonction qui est un « accumulateur » et qui traite chaque valeur d'une liste (de la gauche vers la droite) afin de la réduire à une seule valeur.
/*   const array1 = [1, 2, 3, 4];
const reducer = (previousValue, currentValue) => previousValue + currentValue;
 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
 expected output: 10         */

// .split? La méthode split() divise une chaîne de caractères en une liste ordonnée de sous-chaînes, place ces sous-chaînes dans un tableau et retourne le tableau. La division est effectuée en recherchant un motif ; où le motif est fourni comme premier paramètre dans l'appel de la méthode

/* .filter?
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
const result = words.filter(word => word.length > 6);
console.log(result);
// expected output: Array ["exuberant", "destruction", "present"] */


// Est ce que je peux fusionner ligne 9 et 10??
// tu laurais écrit cmt le dom ??

// APRES LES FONCTIONS >>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<>>>>>>>>><<<<<<<<<<<<<>><<<<<<

// I/ validation formulaire : prenom,nom,adresse,ville,mail

// II/ Apres la verif des regex pr envoyer formulaire

/* III/ orderBtn.addEventListener('click', (e) => {
    e.preventDefault();     <<<<< */ 

/* IV/  Requete POST API
        fetch("http://localhost:3000/api/products/order", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(toSend),
		})
        .then((response) => response.json())
        .then >>> order ID
        */ 


//******************************************************************************************************************//
        /* if (productRegister.length !== 0) {
    let productPanier = "";

    for (let a = 0; a < productRegister.length; a++) {
      productPanier += `
    <article class="cart__item" data-index = "${a}">
   <div class="cart__item__img">
     <img src="${productRegister[a].imageUrl}" alt="${productRegister[a].alt}">
   </div>
   <div class="cart__item__content">
     <div class="cart__item__content__titlePrice">
       <h2>${productRegister[a].nameKanap}</h2>
       <p>${
         productRegister[a].price * productRegister[a].quantityKanap
       } euros</p>
     </div>
     <div class="cart__item__content__settings">
       <div class="cart__item__content__settings__quantity">
         <p>Qté : </p>
         <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
           productRegister[a].quantityKanap
         }">
       </div>
       <div class="cart__item__content__settings__delete">
         <p class="deleteItem">Supprimer</p>
       </div>
     </div>
   </div>
 </article>`;
    }
    positionElement.innerHTML = productPanier;
*/
//******************************************************************************************************************//