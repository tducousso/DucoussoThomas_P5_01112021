// PAGE PRODUIT

// recupération url de la page produit + id
let urlLocation = window.location.href;
let urlKanap = new URL(urlLocation);
let idKanap = urlKanap.searchParams.get("id");
console.log(idKanap);

// envoi de l'id à l'api pour avoir une page 'monoproduit'
fetch("http://localhost:3000/api/products/" + idKanap)
  .then(function (res) {
      return res.json();
  })
  
  .then(function (value) {
    // modif titre page web avec nom produit
    document.querySelector("title").innerHTML = value.name;

    // recup div image dans laquelle la balise image doit apparaître
    let divImage = document.querySelector(".item__img");
    let image = document.createElement('img');
    image.src = value.imageUrl;
    image.alt = value.altTxt;

    // affichage image
    divImage.appendChild(image);

    // modif titre, prix et description
    document.querySelector("#title").innerHTML = value.name;
    document.querySelector("#price").innerHTML = value.price;
    document.querySelector("#description").innerHTML = value.description;

    // mise en place du choix des couleurs 
    let colors = document.querySelector("#colors");
    let colorsOptions = value.colors;
    colorsOptions.forEach(element => {
      let option = document.createElement("option");
      option.innerHTML = element;
      option.value = element;
      colors.appendChild(option);
    });
  })
  .catch(function (error) {
    console.log('Erreur : ' + error.message);
  });


let addToCartBtn = document.querySelector('#addToCart');

// fonction ajouter au panier (local storage)
addToCartBtn.onclick = () => {

  let selectedColor = document.querySelector("#colors").value;
  let quantity = Number(document.querySelector("input").value);
  console.log("couleur et quantité sélectionnées : " + selectedColor + " " + quantity);


// Fenetre popup -------------------------------------------------------------------------------------------------------
const popupConfirmation = () => {
  if(window.confirm( `${idKanap} , color: ${selectedColor} , quantity: ${quantity} , a bien été ajouté au panier. 
Consulter le panier: OK ou rester sur la page: ANNULER`)){
window.location.href = "cart.html";
}
}
// Fenetre popup -------------------------------------------------------------------------------------------------------

  if ((selectedColor == "") || ((quantity == null) || (quantity < 1) || (quantity > 100))) {
    alert("Merci de sélectionner une couleur ainsi qu'une quantité comprise entre 1 et 100.");
  } else { //alors ajouter au localStorage.
    let cartStorage = localStorage.getItem("cart");

    if (cartStorage === null) {
      // console.log('si le panier était vide, je le déclare');
      let cart = []; // création de mon array
      cart.push({
        "ref": idKanap,
        "color": selectedColor,
        "quantity": quantity
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      popupConfirmation();

    } else { // puisque le panier contient déjà des articles, alors ajouter article si différent; sinon incrémenter la qté de ce dernier.
      let cart = JSON.parse(cartStorage);
      // console.log(cart);

      let newCart = [];
      let validator = false;
      cart.forEach((product) => {
        // console.log(product);
        // si produit existe déjà dans le panier augmenter qté
        if ((product.ref == idKanap) && (product.color == selectedColor)) {
          product.quantity += quantity;
          newCart.push({
            "ref": product.ref,
            "color": product.color,
            "quantity": product.quantity
          })

          validator = true; // produit existait déjà : sa qté a été incrémentée du nouvel ajout
        } else { // sinon créer produit dans panier
          newCart.push({
            "ref": product.ref,
            "color": product.color,
            "quantity": product.quantity
          })
        }
      });

      if (!validator) { 
        newCart.push({
          "ref": idKanap,
          "color": selectedColor,
          "quantity": quantity
        });
      }
      // remplace le panier par le nouveau panier avec produits ajoutés et/ou incrémentés
      localStorage.setItem("cart", JSON.stringify(newCart));
      popupConfirmation();
    };
  }
}

