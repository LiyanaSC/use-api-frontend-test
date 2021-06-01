// essaie changement style sur bouton de validation color: #566f34;
addAttribut("try_to_change_me", "style", "background: #566f34; width: 50%")

//import de les outils
import { elementcreation, addAttribut, addText, Basket } from './tools.js'

let basket = new Basket();
basket.preparStorage();
basket.addAmount();
let total = basket.addTotal();


// apparitions des produit dans total____________________________________________________________________________________________

JSON.parse(localStorage.getItem("Produits_du_panier")).forEach((productIntoBasket, index) => {

    let name = productIntoBasket.name;
    let price = productIntoBasket.price;
    let id = productIntoBasket.id

    //La div contenant les infos produits
    elementcreation('div', `block_for_result${index}`, "summary_detail_box_results", "put_products_in_basket");

    // le nom des produits dans le pannier
    elementcreation('p', `summary_detail_box_articles${index}`, "summary_detail_box_articles", `block_for_result${index}`);
    addText(`summary_detail_box_articles${index}`, `${name}`);

    // le prix des produits dans le pannier
    elementcreation('p', `summary_detail_box_price${index}`, "summary_detail_box_price", `block_for_result${index}`);
    addText(`summary_detail_box_price${index}`, `${price}€`);


    //nombre d'articles
    addText("number_of_product", `${index + 1}`);

    // Retirer un produit
    elementcreation('span', `remove${index}`, "remove", `block_for_result${index}`);
    addText(`remove${index}`, "retirer");

    document.getElementById("remove" + index).addEventListener('click', function(e) {
        e.preventDefault();
        basket.deleteProduct(index);
        document.location = "panier.html"; //recharger la page
    })
});

//bouton de retour à l'accueil
elementcreation('button', "add_to_basket_box_btn", "summary_detail_validation_btn appear1", "total_box");
document.getElementById("add_to_basket_box_btn").addEventListener('click', e => {
    e.preventDefault();
    document.location = "index.html";

})

//texte
elementcreation('p', "add_to_basket_text", "useless", "add_to_basket_box_btn");
addText("add_to_basket_text", "Continuer mon shopping");



//Envoi à L'api__________________________________________________________________________________________________________________
var basketValidation = document.getElementById("basket_validation");
basketValidation.addEventListener('submit', function(event) {
    event.preventDefault();
    if (total == 0) {
        window.alert("Votre panier est vide... Mais vous trouverez votre bonheur dans notre boutique. Faites-y un tour!")
    } else {

        let contact = {
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                address: document.getElementById("adress").value,
                city: document.getElementById("city").value,
                email: document.getElementById("email").value
            }
            //envoie  des id produits
        let baketProducts = JSON.parse(localStorage.getItem("Produits_du_panier"));


        fetch("https://thesopekocko.herokuapp.com/api/teddies/order", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contact: contact,
                    products: baketProducts.map(x => x.id)
                })


            }).then(response => response.json()).then(response => {
                localStorage.setItem("Order", `${response.orderId}`)


                localStorage.setItem("payed", total) // conservation du prix total pour la validation

                window.document.location = `validation.html?id=${response.orderId}`

            })
            //renvoi à la page commande validé



    }
})