//appelle de mon id produit

let params = (new URL(document.location)).searchParams;

let urlId = params.get('id');

function getProductById(id) {
    return fetch(`https://thesopekocko.herokuapp.com/api/teddies/${id}`).then(result => result.json())
}
// mes imports 
import { elementcreation, addAttribut, addText, Basket } from './tools.js'
let basket = new Basket;
basket.preparStorage();


//mise en page-----------------------------------------------------------------------------------------------------------------
getProductById(urlId).then(teddy => {

    //ajout de l'image
    elementcreation('img', "pic_loaded", "main_teddy_bear_result_pics_size", "box_pic"); //photo
    addAttribut("pic_loaded", 'src', `${teddy.imageUrl}`) //lien photo
    addAttribut("pic_loaded", 'alt', "photo d'un ours en peluche") //lien photo

    //Partie h3 (nom de l article)
    elementcreation('h3', "result_page_description_title", "result_page_description_title", "description_box");
    addText("result_page_description_title", `${teddy.name}`);


    // description
    elementcreation('p', "result_page_description_text", "result_page_description_text", "description_box");
    addText("result_page_description_text", `${teddy.description}`);

    //Prix
    elementcreation('p', "product_price", "results_descriptions_text_price", "description_box");
    addText("product_price", `${(teddy.price / 100).toPrecision(4)}€`);

    // box choix couleur
    elementcreation('div', "color_selector", "color_choices appear1", "description_box");
    elementcreation('label', "label_of_color_to_select", "color_choices_title", "color_selector");
    addAttribut("label_of_color_to_select", 'for', "color_select")
    addText("label_of_color_to_select", "Couleurs disponibles:");

    // couleurs
    elementcreation('select', "color_select", "color_choices_selection", "color_selector");
    addAttribut("color_select", 'name', "couleurs")


    //placeholder
    elementcreation('option', "put_color", "useless", "color_select");
    addAttribut("put_color", 'value', "placeholder")
    addText("put_color", "--Couleur--");
    //mise en place des couleurs

    let teddysColors = teddy.colors

    teddysColors.forEach((teddysColor, index) => {

        elementcreation('option', `put_color${index}`, "useless", "color_select");
        addAttribut(`put_color${index}`, 'value', `${teddysColor}`)
        addText(`put_color${index}`, `${teddysColor}`);

    });

    //box de validation
    elementcreation('div', "validation", "add_to_basket_box appear2", "description_box");

    //bouton de validation
    elementcreation('button', "add_to_basket_box_btn", "add_to_basket_box_btn appear2", "validation");


    //texte
    elementcreation('p', "add_to_basket_text", "useless", "add_to_basket_box_btn");
    addText("add_to_basket_text", "Ajouter au panier");




    // Localstorage-----------------------------------------------------------------------------------------------------------------

    //au click l'envoie des produits ajouté au panier
    document.getElementById("add_to_basket_box_btn").addEventListener('click', (e) => {
        e.preventDefault();
        basket.addProduct(teddy.name, (teddy.price / 100).toPrecision(4), teddy._id);
        document.location = "panier.html";
    })
    basket.addAmount();
})