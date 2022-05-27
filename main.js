/*  Steps JS
1  => get Total
2  => create prouduct
3  => save localStorage 
4  => clear Data 
5  => Read Data
6  => Delete One Item 
7  => Count 
8  => Delet All 
9  => Update Data
10 => Search Data (Search Title , Search Category)
11 => Clean Data (هذا الي بيعمللك تاكد من انه البيانات تكون موجودة قبل ما اعمل انشاء)
12 => Dark And White Mode
*/

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create'; 
let tmp; //هذا متغير فارغ حطيته علشان اقدر استخدمه باي مكان عندي

// get Total
function getTotal(){

    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }
    else{
        total.innerHTML = '';
        total.style.background = '#bd1c1c'
    }
}

// create prouduct
let dataPro;

if(localStorage.prouduct != null){
    dataPro = JSON.parse(localStorage.prouduct);
}else{
    dataPro = [];
}

submit.onclick = function(){

    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }

    //Count 

    if(title.value != '' && price.value != '' && category.value != '' && newPro.count < 100){ /*Clean Data*/

        if(mood === 'create'){ /* create */

            if(newPro.count > 1){ 
                for(i = 0; i < newPro.count; i++){
                    dataPro.push(newPro);
                }
            }else{
                dataPro.push(newPro);
            }
        
        }else{ /* update */
            dataPro[tmp] = newPro;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
    
    // عملت استدعاء للفنكش تبعت حذف البيانات علشان اول ما اضغط انشاء بيانات يحذفلي الإن بت 
    clearData();

    }

    // save localStorage 
    localStorage.setItem('prouduct', JSON.stringify(dataPro));

    //عكلت استدعاء للفنكشن انه لما اضغط انشاء يظهرلي البيانات الي ضفتها
    showData();
}

// clear Data 
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// Read Data
function showData(){
    let table = '';
    for(let i = 1; i < dataPro.length; i++){
        table += `
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>

            <td><button onclick="updateData(${i})"  id="update">Update</button></td>
            <td><button onclick="deleteData(${i})"  id="delete">Delete</button></td>
        </tr>
        
        `
    }
    document.getElementById('tbody').innerHTML = table;

    getTotal(); //هذا علشان لما اعمل انشاء يرجعلي لون الزر للون الاحمر 

    // Delet All 
    let btnDeletAll = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDeletAll.innerHTML = `
        <button onclick="deleteAllPro()"  id="submit">Delet All Prouduct (${dataPro.length})</button>`;
    }else{
        btnDeletAll.innerHTML = '';
    }
}

showData();

// Delete One Item 
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.prouduct = JSON.stringify(dataPro);

    // هذا استدعيتها علشان لما اضغط على حذف يحدثلي البيانات اول باول 
    showData();
}

// Delet All 
function deleteAllPro(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

// Update Data
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'Update'

    mood = 'update';
    tmp = i;

    scroll({
        top: 0,
        behavior: "smooth",
    })
}

// Search Data 
let searchMood = 'title';

function getSearchMood(id){

    let search = document.getElementById('search');

    if(id == 'searchTitle'){
        searchMood = 'title';
        search.placeholder = 'Search By Title';
    }
    else{
        searchMood = 'category';
        search.placeholder = 'Search By Category';
    }

    search.focus();
    search.value = '';
    showData();

};

function searchData(value){

    let table = '';

    // Search Title
    if(searchMood == 'title'){

        for(i = 1; i < dataPro.length; i++ ){
            if(dataPro[i].title.includes(value.toLowerCase())){

                table += `
                            <tr>
                                <td>${i}</td>
                                <td>${dataPro[i].title}</td>
                                <td>${dataPro[i].price}</td>
                                <td>${dataPro[i].taxes}</td>
                                <td>${dataPro[i].ads}</td>
                                <td>${dataPro[i].discount}</td>
                                <td>${dataPro[i].total}</td>
                                <td>${dataPro[i].category}</td>

                                <td><button onclick="updateData(${i})"  id="update">Update</button></td>
                                <td><button onclick="deleteData(${i})"  id="delete">Delete</button></td>
                            </tr>
                            
                            `
            }
        }
    }

    // Search Category
    else{
        for(i = 1; i < dataPro.length; i++ ){
            if(dataPro[i].category.includes(value.toLowerCase())){

                table += `
                            <tr>
                                <td>${i}</td>
                                <td>${dataPro[i].title}</td>
                                <td>${dataPro[i].price}</td>
                                <td>${dataPro[i].taxes}</td>
                                <td>${dataPro[i].ads}</td>
                                <td>${dataPro[i].discount}</td>
                                <td>${dataPro[i].total}</td>
                                <td>${dataPro[i].category}</td>

                                <td><button onclick="updateData(${i})"  id="update">Update</button></td>
                                <td><button onclick="deleteData(${i})"  id="delete">Delete</button></td>
                            </tr>
                            
                            `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

// Mode
function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}