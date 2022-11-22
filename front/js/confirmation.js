let orderId = document.querySelector("#orderId")

let str = window.location.href;
let url = new URL(str);
let id = url.searchParams.get("id");
orderId.innerText = id;
