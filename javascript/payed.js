import { addText, } from './tools.js'

//Ajouter le numéro de commande
let commandNumber = localStorage.getItem("Order");
addText("order", `${commandNumber}`);

//garder le prix et effacer les articles selectionnés
localStorage.removeItem("Produits_du_panier")
addText("add_total", ` ${localStorage.getItem("payed")}€`)