     var flowers = [{
         name: "Rose",
         image: "roses.jpeg",
         price: 4,
         qtty: 1
     }, {
         name: "Flowers",
         image: "flowers.jpeg",
         price: 6,
         qtty: 1
     }, {
         name: "Lotus",
         image: "kyt.jpeg",
         price: 40,
         qtty: 1
     }];
     for (let val of flowers) {
         document.getElementsByClassName("products")[0].innerHTML += `<div class="product col-12 col-md-6 col-lg-4 text-center fw-bold">
    <p class="product-title h3 m-3">${val.name}</p>
    <img class="product-image" src="${val.image}" width="200" height="200">
    <div class="product-details">
        <p class="product-price h4 m-3">${val.price} €</p>
        <button class="btn btn-primary product-button" type="button">ADD TO CART</button>
    </div>
    </div>
    `


     }
     // tu ide o to aby sme pri kliknuti docielili to ze to prida do karty
     var cart = [];

     function addToCart(flower) {
         let item = cart.find((val) => val.name == flower.name); // provna z arraya val.name s flowerz objektu,aby tam nedavalo pri kliknuti tu istu poloku
         if (item) {
             item.qtty++;
         } else {
             cart.push(flower)
         }
         createRows(); // tu zvolava dve funkcie
         Total();
     }
     let btns = document.getElementsByClassName("product-button"); // mame len tri buttony
     // to vyvtarame preto aby sme kazdemu buttonu vytvorili evenetlistener
     for (let i = 0; i < btns.length; i++) {
         btns[i].addEventListener("click", function() { // index sa zhodovat musia ako keby hovorim ze butn [ten a ten] spusti [tu a tu]
             addToCart(flowers[i]); // ktory produkt pushnem ked zvolam funkciu
             // if i click second button pushin second object
         })
     }

     function createRows() {
         var result = ""; // ten  tu davam pretp aby som potom priradil 7 linia.
         //we need everytime clear when we call the createrows preto je empty
         for (let val of cart) { // loop inside cart
             result += `
        <div class="cart-row row d-flex">
            <div class="cart-item col-6 my-3 ">
                <img class="cart-item-image" src="${val.image}" width="100" height="100">
                <span class="cart-item-title h5 ">${val.name}</span>
            </div>
            
            <span class="cart-price col-3 h4 my-3">${val.price} €</span>
           
            <div class="cart-qtty-action col-3 d-flex">            
            <button class="btn-success plus ">+</button>            
                <div class="cart-quantity p-4 h4">${val.qtty}</div>            
                <button class="btn-primary minus ">-</button>          
                <button class="del btn btn-danger rounded-circle  my-auto ms-3 fw-bold" type="button"> Remove </button>            
            </div>
        </div>
        `;
         }

         document.getElementById("cart-items").innerHTML = result;

         let plus = document.getElementsByClassName("plus"); // toto su pomocne premene
         let minus = document.getElementsByClassName("minus"); // aby sa lepsie pisala
         let del = document.getElementsByClassName("del"); // funkcia uvedena nizsia

         for (let i = 0; i < plus.length; i++) {
             plus[i].addEventListener("click", function() { // index ze ktore plus z tych 3
                 plusQtty(i)
                 Total();
             });
             minus[i].addEventListener("click", function() {

                 minusQtty(i)
                 Total()
             });
             del[i].addEventListener("click", function() {

                 minusQtty(i)
                 Total()
             });
         }
     }

     function Total() {
         var total = 0; // pomocna premena
         for (let val of cart) { // loop potrebujem preto aby som vyratal ceny z kazdej karty !
             total = total + (val.price * val.qtty);
         }
         document.getElementById("price").innerHTML = total.toFixed(2) + " €";
         if (total >= 100) {
             let aktions = total * 0.9;
             document.getElementById("aktion").innerHTML = aktions.toFixed(2) + " €";
         }
     }
     //  did not work
     //let Sum = document.getElementById("price")

     //  function Sale() {
     //      if (Sum >= 100) {
     //          let aktions = Sum * 0.9;
     //          document.getElementById("aktion").innerHTML = aktions.toFixed(2) + " €";
     //      }
     //  }

     function plusQtty(i) { //In order to increase this quantity, we need to know the index of the element.
         cart[i].qtty++; //In order to increase this quantity, we need to know the index[] of the element.
         document.getElementsByClassName("cart-quantity")[i].innerHTML = cart[i].qtty; // tu to zobrzi
     }

     function minusQtty(i) {
         if (cart[i].qtty == 1) {
             cart.splice(i, 1);
             createRows();
         } else {
             cart[i].qtty -= 1;
             document.getElementsByClassName("cart-quantity")[i].innerHTML = cart[i].qtty;
         }
     }

     function deleteItem(i) {
         cart[i].qtty = 1;
         cart.splice(i, 1);
         createRows();
     }


     /// sort function
     function sortCart() {
         cart.sort(function(a, b) { return (b.price * b.qtty) - (a.price * a.qtty) }); // tu potrebujes usporiadat cart ! a nie flowers ako si mal pred tym
         //  document.getElementById("cart-items").innerHTML = "";
         createRows();
     }
     document.getElementById("sort").addEventListener("click", sortCart);