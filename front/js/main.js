//Appel API
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
    let result = await getApi()
        .then(function (data) {

            // Boucle
            data.forEach(element => {
                console.log(element);

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
                article.appendChild(image);  // Rajoute le tout sur ma page html
                article.appendChild(productName);
                article.appendChild(productDescription);
                card.appendChild(article);
                items.appendChild(card);

            });
        })
        // Si il y a une erreur (exemple: node server off) 
        .catch(function (err) {
            console.log("Error : " + err);
            let errorHtml = document.querySelector("#items");
            errorHtml.innerHTML = "<div>Une erreur s'est produite: Nous ne pouvons pas afficher les articles.</div>";
        })
}

getItems();