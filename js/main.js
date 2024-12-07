var productTitleInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productImageInput = document.getElementById("productimge");
var productDecInput = document.getElementById("productdescription");
var addbtn = document.getElementById("addbtn");
var updatebtn = document.getElementById("updatebtn");
var productsearchInput = document.getElementById("productsearch");




var productlist = [];


if(JSON.parse(localStorage.getItem("allproducts") == null)){

    productlist=[];

}

else{
    productlist = JSON.parse(localStorage.getItem("allproducts"));
displayProducts(productlist);

}

// =======================================================
function addProduct(){
if(validatForm(productTitleInput) && 
validatForm(productPriceInput)&& 
validatForm(productCategoryInput)&&
validatForm(productDecInput)&&
validatForm(productImageInput)

)
{
    var product = {
        title:  productTitleInput.value,
        price: productPriceInput.value,
        Category : productCategoryInput.value,
        image : `imges/${productImageInput.files[0]?.name}`,
        description : productDecInput.value
     };
    
     productlist.push(product);
    
    localStorage.setItem("allproducts",JSON.stringify(productlist));
      console.log(productlist);
      clearForm();
      displayProducts(productlist);
    
    }
}
// ====================================================

function clearForm(){
    productTitleInput.value="";
    productPriceInput.value="";
    productCategoryInput.value="";
    productImageInput.value="";
    productDecInput.value="";

    productTitleInput.classList.remove("is-valid");
    productPriceInput.classList.remove("is-valid");
    productCategoryInput.classList.remove("is-valid");
    productImageInput.classList.remove("is-valid");
    productDecInput.classList.remove("is-valid");

}

// =====================================================
function displayProducts(list){
    var blackBox =``;

    for( var i=0; i < list.length;i++ ){

        blackBox +=`<div class="col-lg-4 col-md-3 col-sm-6 gy-4">
                    <div class="product">
                        <img src="${list[i].image}" class="img-fluid img-card" alt="">
                        <h3 class=" p-2">${list[i].new ? list[i].new:list[i].title}</h3>
                        <div>
                            <div><span class=" p-2">${list[i].Category}</span></div>
                            <span class=" p-2">${list[i].price}</span>
                        </div>
                        <p class=" p-2">${list[i].description}</p>
                            <div class="card-footer text-body-secondary d-flex justify-content-between p-2">
                            <button class="btn btn-danger class=" p-2"" onclick="deletProduct(${productlist.indexOf(list[i])})">Delete</button>
                            <button class="btn btn-primary class=" p-2"" onclick="editProduct(${productlist.indexOf(list[i])})">Edit</button>
                            </div>
                    </div>
                </div>`;
    }
    document.getElementById("prouductrow").innerHTML = blackBox;
}
// =========================================
var updatedindex ;

function editProduct(editedindex){
    console.log(productlist[editedindex]);

    productTitleInput.value= productlist[editedindex].title;
    productPriceInput.value= productlist[editedindex].price;
    productCategoryInput.value= productlist[editedindex].Category;
    // productImageInput.value= productlist[editedindex].image;
    productDecInput.value= productlist[editedindex].dec;

addbtn.classList.add("d-none");
updatebtn.classList.remove("d-none"); 

updatedindex = editedindex;

}
// =========================
function updateProduct(){
// console.log(productTitleInput.value,updatedindex);

productlist[updatedindex].title =productTitleInput.value;
productlist[updatedindex].price =productPriceInput.value;
productlist[updatedindex].Category =productCategoryInput.value;
productlist[updatedindex].image =`imges/${productImageInput.files[0]?.name}`;
productlist[updatedindex].dec =productDecInput.value;

localStorage.setItem("allproducts",JSON.stringify(productlist));
displayProducts(productlist);

}
// ==========================================

function searchProductByTitle(keyword){


        var matchedsearch =[];

    for(var i=0; i< productlist.length; i++){

    if(productlist[i].title.toUpperCase().includes(keyword.toUpperCase())){
    //   blackBox +=`<div class="col-lg-4 col-md-3 col-sm-6">
    //                 <div class="product">
    //                     <img src="${list[i].image}" class="img-fluid" alt="">
    //                     <h3>${list[i].new ? list[i].new:list[i].title}</h3>
    //                     <div>
    //                         <span>${list[i].Category}</span>
    //                         <span>${list[i].price}</span>
    //                     </div>
    //                     <p>${list[i].description}</p>
    //                         <div class="card-footer text-body-secondary d-flex justify-content-between">
    //                         <button class="btn btn-danger" onclick="deletProduct(${list.indexof(list[i])})">Delete</button>
    //                         <button class="btn btn-primary" onclick="editProduct(${list.indexof(list[i])})">Edit</button>
    //                         </div>
    //                 </div>
    //             </div>`;

    productlist[i].new = productlist[i].title.toLowerCase().replaceAll(keyword, `<span class="text-danger">${keyword}</span>`)
        
        matchedsearch.push(productlist[i]);
    }
          
        
        else{
            console.log(" not matched");
             };
    }
        

    if(matchedsearch.length !=0){
        displayProducts(matchedsearch);

    }
    else{
        document.getElementById("prouductrow").innerHTML=`<div class="text-center"><h3 class="text-bg-danger text-black">no product found</h3></div>`
    }
    
    };

    
    // displayProducts(matchedsearch);
;


// searchProductByTitle("p");



// ===================================
function deletProduct(deletedindex){
    productlist.splice( deletedindex,  1);
    localStorage.setItem("allproducts", JSON.stringify(productlist));
    displayProducts(productlist);
}

// ================================================

function validatForm (input){
   


    var regex ={
        productName: /^[a-z0-9_-]{3,15}$/ ,
        productPrice:/^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/ ,
        productCategory:/^(Electronics |tv|Phone)$/,
        productimge: /^.{1,}\.(png|jpg|webp){1}$/,
        productdescription:/^\w{0,250}$/,
    };
    
    var isvalid = regex[input.id].test(input.value);
    console.log( isvalid);

if(isvalid){
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    input.nextElementSibling.classList.replace("d-block","d-none");

}
else{
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    input.nextElementSibling.classList.replace("d-none","d-block");
}

return isvalid;

}