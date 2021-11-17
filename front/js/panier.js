//PAGE PANIER
const cart = JSON.parse(localStorage.getItem("cart"));
console.table(cart);
// afficher le contenu du panier 

// const positionEmptyCart = document.querySelector("#cart__items");

// if panier vide
function checkIfCartIsEmpty() {
	if (cart === null || cart == 0) {
		document.getElementById("cart__items").innerHTML = "<p >\u2689Le panier est vide.Vous pouvez retourner sur notre page d'accueil.<a href='./index.html'></a>\u2689</p>";
        document.querySelector(".cart__order").style.display = "none";
    }
}   
checkIfCartIsEmpty();

function getCart() {

}

// Pouvoir supprimer des articles
// Pouvoir modifier une qtité produit
// Afficher le total de tous les produits(prix)
// validation formulaire : prenom,nom,adresse,ville,mail
// regex??