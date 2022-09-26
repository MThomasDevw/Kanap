var str = "http://localhost:3000/api/products";
var url = new URL(location.href);
var id = url.searchParams.get("id");
// console.log(id);


fetch(`http://localhost:3000/api/products/${id}`)
 .then((reponse) => {
    // console.log(reponse)

    const affichage_priceKanap = document.getElementById("price");
    const affichage_titleKanap = document.getElementById("title");
    const affichage_descriptionKanap = document.getElementById("description");
    const affichage_colorsKanap = document.querySelector("option");
    const affichage_imgKanap = document.getElementsByClassName("item__img")[0];

    console.log(affichage_colorsKanap);

    const itemData = reponse.json();
 
    itemData.then((product) => {
        // console.log(product)

        affichage_priceKanap.innerHTML = product.price;
        affichage_titleKanap.innerHTML = product.name;
        affichage_descriptionKanap.innerHTML =  product.description;
        affichage_colorsKanap.innerHTML = product.colors;
 
        const img_imageUrl = `<img src="${product.imageUrl}" alt ="${product.altTxt}">`;
       
        affichage_imgKanap.insertAdjacentHTML("afterbegin", img_imageUrl);
 
        // console.log();
 
    })
})
.catch((erreur) => console.log(erreur))