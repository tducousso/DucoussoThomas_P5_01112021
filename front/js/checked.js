//PAGE CONFIRMATION (afficher l'id de la commande)

// recup de l'url de la page commande
const params = window.location.href;
const orderUrl = new URL(params);

// recup de orderId dans l'url
const orderId = orderUrl.searchParams.get("id");
console.log(orderId);
document.querySelector("#orderId").innerHTML = orderId;
localStorage.clear();