//----------------------------------------------------- recupération id
let str = "http://localhost:3000/api/products";
let url = new URL(location.href);
let id = url.searchParams.get("id");

// console.log(id);

fetch(`http://localhost:3000/api/products/${id}`)
  .then((reponse) => {
    // console.log(reponse)

    //-------------------------------- création constente pour recuperer les id a afficher
    const affichagePriceKanap = document.getElementById("price");
    const affichageTitleKanap = document.getElementById("title");
    const affichageDescriptionKanap = document.getElementById("description");
    const affichageImgKanap = document.getElementsByClassName("item__img")[0];

    // console.log();

    const itemData = reponse.json();

    itemData.then((product) => {
      // console.log(product)

      //--------------------------------------------- affichage des élements du produits
      affichagePriceKanap.innerHTML = product.price;
      affichageTitleKanap.innerHTML = product.name;
      affichageDescriptionKanap.innerHTML = product.description;

      const imgImageUrl = `<img src="${product.imageUrl}" alt ="${product.altTxt}">`;
      affichageImgKanap.insertAdjacentHTML("afterbegin", imgImageUrl);

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
    if (color == null || color == "" || quantity == null || quantity == 0 ) {
      alert("merci de sélectionner une couleur et une quantité");
      return;
    }
    if (quantity < 0){
      alert("veuillez renseigner un nombrer superieur a 0")
      return
    }
    // console.log()
    //------------------------------- creation d'une constante pour afficher les elements dans le localstorage
    const data = {
      id: id,
      color: color,
      quantity: quantity,
    };
    //-------------------------------------------- ajout des produits dans le panier
    let productInLocalStorage = JSON.parse (localStorage.getItem("panier"));
    
    // let produitExistant = productInLocalStorage.find(product=>(product.id==data.id && product.color==data.color));
    if (!productInLocalStorage){
      productInLocalStorage = []
    }
    const foundProduct = productInLocalStorage.find((product)=>{
      if (product.color == data.color && product.id == data.id)
      {
        return product
      }
    })
    if (foundProduct)
    {
      foundProduct.quantity = parseInt(foundProduct.quantity) + parseInt(data.quantity);
    }
    else 
    {  
        productInLocalStorage.push(data)
    }
    localStorage.setItem("panier",JSON.stringify(productInLocalStorage));

    alert("produit ajouté au panier");
  });
}
