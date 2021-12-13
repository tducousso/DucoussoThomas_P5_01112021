//PAGE ACCUEIL (tous les produits)

//Call API avec la méthode fetch (avant >>> XMLHttpRequest)
async function getApi() {
    try {
        let response = await fetch("http://localhost:3000/api/products");
        return await response.json();
    } catch (error) {
        console.log("Error : " + error);
    }
}

//Récupération des données et insertion dans le DOM    
async function getItems() {
    await getApi()
        .then(function (data) {
            console.log(data);
            // Boucle
            data.forEach(element => {
                // console.log(element);

                // création lien vers page produit
                let card = document.createElement('a');
                card.href = './product.html?id=' + element._id; //recupère la ref de chaques éléments,

                // création de l'article
                let article = document.createElement('article');

                // création d'image
                let image = document.createElement('img');
                image.src = element.imageUrl;
                image.alt = element.altTxt;

                // nom du produit 
                let productName = document.createElement('h3');
                productName.className = "productName"; //création de la classe pour le HTML
                productName.textContent = element.name; //recupère le nom 

                // description du produit
                let productDescription = document.createElement('p');
                productDescription.className = "productDescription";
                productDescription.textContent = element.description;

                // Affichage (DOM)
                article.appendChild(image);  // Implante le tout sur ma page html
                article.appendChild(productName);
                article.appendChild(productDescription);
                card.appendChild(article);
                items.appendChild(card);

            });
        })
        // Si il y a une erreur (exemple: node server off) 
        .catch (function (error){
            let errorHtml = document.querySelector("#items");
            errorHtml.innerHTML = "<div>Une erreur s'est produite: Nous ne pouvons pas afficher les articles.</div>"; // ou alert
            return error;
        })
}

getItems();


/* Autres façon de faire pour récup les données: 

(async function renderItems() {
	let items = await getApi();
	let htmlRender = "";
	items.forEach((item) => {
		let htmlContent = `
		<a href="./product.html?id=${item._id}">
			<article>
				<img src="${item.imageUrl}" alt="${item.altTxt}">
				<h3 class="productName">${item.name}</h3>
				<p class="productDescription">${item.description}</p>
			</article>
		</a>
		`;
		htmlRender += htmlContent;
	});
	const itemContainer = document.getElementById("items");
	itemContainer.innerHTML += htmlRender;
})();
*/


// GET & POST FETCH : https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data-fr