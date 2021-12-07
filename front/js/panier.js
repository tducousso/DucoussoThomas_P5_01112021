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
    }
    // fonction TT qté/price, delete, etc...
    totalItemInCart();
    totalPrice();
    deleteItem();
    changeQuantity();

  };
}
displayItem();

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//                                                        FONCTIONS
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// Function TTal Qté
function totalItemInCart() {
  let quantitySelector = document.querySelectorAll(".itemQuantity");
  let totalItem = 0;
  for (let w = 0; w < quantitySelector.length; w++) {
    totalItem += parseInt(quantitySelector[w].value);
  }
  const totalQuantityDisplay = document.getElementById("totalQuantity");
  totalQuantityDisplay.innerHTML = totalItem;
  // console.log(totalItem);
}


// Function TTal Prix
function totalPrice() {
  let totalPrice = parseInt(0);
  let totalQty = Number(0);
  // console.log('test')
  let elements = document.querySelectorAll('.cart__item');
  elements.forEach(element => {
    let dataAttribute = element.getAttribute('data-id');
    let productQty = element.querySelector(".itemQuantity").value;
    //total de produit dans le panier :
    totalQty += Number(productQty);
    document.querySelector('#totalQuantity').innerText = totalQty;
    // prix total du panier
    fetch("http://localhost:3000/api/products/" + dataAttribute)
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function (value) {
        let productPrice = Number(value.price);
        // console.log("qté du produit " + productQty + " prix produit " + productPrice)
        // calcul total
        totalPrice += (productQty * productPrice);
        // affichage prix total dans le panier
        document.querySelector('#totalPrice').innerText = totalPrice;
      })
      .catch(function (error) {
        console.log('Il y a eu un problème avec l\'opération fetch pour le calcul total : ' + error.message);
      });
  });
}


// Function Changer de qté
function changeQuantity() {
  // sélection des inputs
  let itemQuantity = document.querySelectorAll('.itemQuantity');
  for (let y = 0; y < itemQuantity.length; y++) {
    // console.log(itemQuantity[y].value);
    itemQuantity[y].addEventListener('change', () => {
      // console.log('index produit ' + y + ' valeur initiale ds la localStorage : ' + cart[y].quantity + ' nouvelle valeur : ' + itemQuantity[k].value);
      let newQty = itemQuantity[y].value;
      if (newQty >= 1 && newQty <= 100) {
        cart[y].quantity = itemQuantity[y].value;
        localStorage.setItem('cart', JSON.stringify(cart));
        totalPrice();
        alert('La modification de la quantité à bien été prise en compte.');
      } else {
        alert('Veuillez saisir une valeur entre 1 et 100 s\'il vous plait.')
        itemQuantity[y].value = cart[y].quantity;
      }
    })
  }
}


// Function Delete   >>>>>>>  .bind ? à tester   .filter? à tester      *.Splice*
function deleteItem() {
  let deleteItem = document.querySelectorAll(".deleteItem");
  for (let z = 0; z < deleteItem.length; z++) {
    deleteItem[z].addEventListener('click', (event) => {
      event.preventDefault();
      let itemToDelete = cart.indexOf(cart[z]);
      cart.splice(itemToDelete, 1);
      // renvoyer ce nouveau panier dans le localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      totalPrice();
      alert('Le Kanap a été supprimé du panier.');
      location.reload();
    })
  }
}

// function deleteItem() {
//   let deleteButton = document.querySelectorAll(".deleteItem");

//   deleteButton.forEach((button) => {
//     let parent = button.closest("article");
//     let parentId = parent.dataset.id;
//     let parentColor = parent.dataset.color;

//     button.addEventListener("click", () => {
//       let storageContentFilter = cart.filter(
//         (element) => element.id != parentId || element.color != parentColor);

//       localStorage.setItem("cart",JSON.stringify(storageContentFilter));
//       window.location.reload();
//     });
//   });
// }

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//                                                            REGEX
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//récupération des données du formulaire 
class Formu {
  constructor() {
    this.firstName = document.getElementById("firstName").value;
    this.lastName = document.getElementById("lastName").value;
    this.adress = document.getElementById("address").value;
    this.city = document.getElementById("city").value;
    this.email = document.getElementById("email").value;
  }
}

// Regex
function userVerification() {

  const userFormu = new Formu();
  
  // Firstname
  function testFirstName() {
    const userFirstName = userFormu.firstName;
    const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    if (/^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(userFirstName)) {
      firstNameErrorMsg.innerText = "CHECKED";
      return true;
    } else {
      firstNameErrorMsg.innerText = "Merci de renseigner votre prénom en toutes lettres.";
    }
  }
  // Lastname
  function testLastName() {
    const userLastName = userFormu.lastName;
    const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    if (/^[A-Za-z]{2,20}$/.test(userLastName)) {
      lastNameErrorMsg.innerText = "CHECKED";
      return true;
    } else {
      lastNameErrorMsg.innerText = "Merci de renseigner votre nom en toutes lettres.";
    }
  }
  // Adresse
  function testAdress() {
    const userAdress = userFormu.adress;
    const addressErrorMsg = document.getElementById("addressErrorMsg");
    if (/[^§]{5,50}$/.test(userAdress)) {
      addressErrorMsg.innerText = "CHECKED";
      return true;
    } else {
      addressErrorMsg.innerText = "Merci de saisir une adresse correct.";
    }
  }
  // City
  function testCity() {
    const userCity = userFormu.city;
    const cityErrorMsg = document.getElementById("cityErrorMsg");
    if (/^[A-Za-z]{2,20}$/.test(userCity)) {
      cityErrorMsg.innerText = "CHECKED";
      return true;
    } else {
      cityErrorMsg.innerText = "Merci de renseigner votre ville en toutes lettres.";
    }
  }
  // Email
  function testEmail() {
    const userEmail = userFormu.email;
    const emailErrorMsg = document.getElementById("emailErrorMsg");
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userEmail)) {
      emailErrorMsg.innerText = "CHECKED";
      return true;
    } else {
      emailErrorMsg.innerText = "Merci de renseigner une adresse email valide.";
    }
  }

  if (testFirstName() || testLastName() || testAdress() || testCity() || testEmail()) {
    // Mise des données utilisateur dans le local storage
    localStorage.setItem('formuValues', JSON.stringify(userFormu));
    return true;
  } /*else {
    console.log("Formulaire PB.");
  }*/
}

userVerification();

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//                                                    Recup données + POST API
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


// Mets les products id dans un array 
function productToSend() {
  let orderProduct = [];
  for (let i = 0; i < localStorage.length; i++) {
    let idColor = localStorage.key(i);
    let idColorArray = idColor.split(",");
    let id = idColorArray[0];
    orderProduct.push(id);
  }
  return orderProduct;
}

// Info >>> Back
let userFormSubmit = document.getElementById("order");
userFormSubmit.addEventListener("click", (e) => {
  // userFormSubmit.addEventListener("submit", (e) => { a test
  e.preventDefault();
  let products = [];
      //collecter les id des produits du panier
      cart.forEach(element => {
        products.push(element.ref);
    })
    console.log(products);
  if (userVerification()) {

     const contact = {
        'firstName': firstName.value,
        'lastName': lastName.value,
        'address': address.value,
        'city': city.value,
        'email': email.value,
    };

     // déclaration d'une variable contenant les infos de la commande
     let order = {
      contact,
      products
  }
  console.log(order);

    // POST API
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((response) => response.json())  // -----> RECUP ID DE LA COMMANDE AU NIVEAU DE LA RESPONSE FETCHS
      .then((data) => {
        window.location.replace("./confirmation.html?id=" + data.orderId);
        // document.location.href = `./confirmation.html?id=${data.orderId}`;
        //  le recup dans le local storage
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  }
});


 
// [A-Za-z]{3,20} >>> que des lettres de 3 a 20 cc 
// /^[0-9]{5} [A-Za-zÀ-ÿ\-' ]+$/gi cp + lettres ?

// RegExp.prototype.test(string) <<< pr tester mon regex

/* gi? en fin de regex? ( FLAG )
g modifier: global. All matches (don't return on first match)
i modifier: insensitive. Case insensitive match (ignores case of [a-zA-Z])
In your case though i is immaterial as you dont capture [a-zA-Z].
For input like !@#$ if g modifier is not there regex will return first match !See here.
If g is there it will return the whole or whatever it can match.See here */


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