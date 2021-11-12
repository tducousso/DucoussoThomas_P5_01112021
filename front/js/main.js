//Appel API
let products = fetch("http://localhost:3000/api/products")    //rajouter async & await?
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (data) {

        // récupération de la section items dans laquelle vont apparaître les articles
        let items = document.querySelector("#items");

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

            // Affichage
            article.appendChild(image);  // Rajoute le tout sur ma page html
            article.appendChild(productName);
            article.appendChild(productDescription);
            card.appendChild(article);
            items.appendChild(card);

        });
    })
    // si il y a une erreur: 
    .catch(function(err) {              
        console.log(err);
        let serverErr = document.querySelector("#items");
        serverErr.innerHTML = "<div>Une erreur s'est produite : Nous ne pouvons pas afficher les articles.</div>";
    })