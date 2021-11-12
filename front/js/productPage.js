
// recupération url de la page produit + id
let urlLocation = window.location.href;
let urlKanap = new URL(urlLocation);
let idKanap = urlKanap.searchParams.get("id");

// envoi de l'id à l'api pour avoir une page 'monoproduit'
fetch("http://localhost:3000/api/products/" + idKanap)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
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

  // let addToCartBtn = document.querySelector('#addToCart');
  // addToCartBtn.onclick = 
  // egalité : (quantity == null) || (quantity < 1) || (quantity > 100)
  // est ce que le produit existe déja ds mon panier ?
  // Cf local storage