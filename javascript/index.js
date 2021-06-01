//import de mes fonctions
import { elementcreation, addAttribut, addText, Basket } from './tools.js'
//contenu du panier
let basket = new Basket;
basket.preparStorage();
console.log("start !")

//Méthode Fetch________________________________________________________________________________________________________
fetch("https://thesopekocko.herokuapp.com/api/teddies")
    .then(response => {
        if (response.ok == true) {
            response.json().then(teddys => {
                //création  de mes produits________________________________________________________________________________________________________
                teddys.forEach((teddy, index) => {
                    //conteneur
                    elementcreation('div', `result_box${index}`, `main_products_results appear${index}`, "section_index");

                    //creation de la partie photo
                    elementcreation('div', `result_pics${index}`, "results_pics", `result_box${index}`); //bloc photo

                    elementcreation('img', `pic_${index}`, "results_pics_size", `result_pics${index}`); //photo
                    addAttribut(`pic_${index}`, 'src', `${teddy.imageUrl}`) //lien photo

                    //création de la partie commentaire
                    elementcreation('div', `results_descriptions${index}`, "results_descriptions", `result_box${index}`);

                    //Partie h3 (nom des articles)
                    elementcreation('h3', `results_descriptions_title${index}`, "results_descriptions_title", `results_descriptions${index}`);
                    addText(`results_descriptions_title${index}`, `${teddy.name}`);

                    //Partie description
                    elementcreation('p', `product_text${index}`, "results_descriptions_text", `results_descriptions${index}`);
                    addText(`product_text${index}`, `${teddy.description}`);

                    //Prix
                    elementcreation('p', `product_price${index}`, "results_descriptions_text_price", `results_descriptions${index}`);
                    addText(`product_price${index}`, `${(teddy.price / 100).toPrecision(4)}€`);

                    //creation de l'étiquette disponible
                    elementcreation('div', `results_availability${index}`, "results_availability", `result_box${index}`);
                    addText(`results_availability${index}`, "disponible");



                    // création des page produit

                    let productPage = document.getElementById("result_box" + index);


                    productPage.addEventListener("click", function() {
                        window.document.location = `product.html?id=${teddy._id}`

                    })

                    document.addEventListener('DOMContentLoaded', function() {
                        productPage()
                    })


                });
            });

            basket.addAmount();
            // Gestion de l'erreur________________________________________________________________________________________________________
        } else {
            console.log('Oups! Il y a une erreur dans la requête fetch! vérifiez les paramètres API');
            addText("section_index", "Oups! Le site rencontre un petit problème technique veillez nous en excuser!");
            addAttribut("section_index", "style", "font-family: 'Mansalva'; font-size: 2rem; margin: 30px;") //lien photo


        }
    })