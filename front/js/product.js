//----------------------------------------------------- recupération id
var str = "http://localhost:3000/api/products";
var url = new URL(location.href);
var id = url.searchParams.get("id");

// console.log(id);

fetch(`http://localhost:3000/api/products/${id}`)
  .then((reponse) => {
    // console.log(reponse)

    //-------------------------------- création constente pour recuperer les id a afficher
    const affichage_priceKanap = document.getElementById("price");
    const affichage_titleKanap = document.getElementById("title");
    const affichage_descriptionKanap = document.getElementById("description");
    const affichage_imgKanap = document.getElementsByClassName("item__img")[0];

    // console.log();

    const itemData = reponse.json();

    itemData.then((product) => {
      // console.log(product)

      //--------------------------------------------- affichage des élements du produits
      affichage_priceKanap.innerHTML = product.price;
      affichage_titleKanap.innerHTML = product.name;
      affichage_descriptionKanap.innerHTML = product.description;

      const img_imageUrl = `<img src="${product.imageUrl}" alt ="${product.altTxt}">`;
      affichage_imgKanap.insertAdjacentHTML("afterbegin", img_imageUrl);

      // console.log();
      //----------------------------------------------- affichage des couleurs
      product.colors.forEach((color) => {
        let optionsColors = document.createElement("option");
        optionsColors.innerText = `${color}`;
        optionsColors.value = `${color}`;

        let idColors = document.getElementById("colors");
        idColors.appendChild(optionsColors);
      });
    });
  })
  .catch((erreur) => console.log(erreur));
//--------------------------------- insertion d'une alerte au cas ou la couleur ou la quantité manqueraient
const button = document.getElementById("addToCart");
if (button != null) {
  button.addEventListener("click", () => {
    const color = document.getElementById("colors").value;
    const quantity = document.getElementById("quantity").value;
    if (color == null || color == "" || quantity == null || quantity == 0) {
      alert("merci de sélectionner une couleur et une quantité");
      return;
    }

    // console.log()
    //------------------------------- creation d'une constante pour afficher les elements dans le localstorage
    const data = {
      idProduct: id,
      color: color,
      quantity: quantity,
    };
    //-------------------------------------------- ajout des produits dans le panier
    let productInLocalStorage = JSON.parse (localStorage.getItem("panier"));
    console.log (productInLocalStorage);
    //---------------------------------------------------- si le panier est plein
    if(productInLocalStorage){
        productInLocalStorage.push(data);
        localStorage.setItem("panier",JSON.stringify(productInLocalStorage));
        console.log(productInLocalStorage)
    }
    //---------------------------------------------------- si le panier est vide
    else{
        productInLocalStorage = [];
        productInLocalStorage.push(data);
        localStorage.setItem("panier",JSON.stringify(productInLocalStorage));
        console.log(productInLocalStorage)
    }
    window.location.href = "cart.html";
  });
}
