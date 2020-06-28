const container = document.querySelector("#lista-produse");
const adaugaBtn = document.querySelector("#adauga-btn");


function initMenuItems() {
    const starsArray = document.querySelectorAll(".fa-star");  //lista produse favorite
    const trashArray = document.querySelectorAll(".fa-trash"); //lista cu produse de sters
    const buyArray = document.querySelectorAll("#Cumpara");    //lista cu produse de cumparat
    const updateArray = document.querySelectorAll(".fa-refresh"); //lista cu elemente de updatat
    //console.log(updateArray);
    starsArray.forEach(star => {
        star.addEventListener("click", function () {
            star.classList.toggle("favourite");      //facem steluta rosie
        })
    });

    let cumparaturi = [];      //array in care retin cumparaturile
    let produs = [];           //pentru concat

    buyArray.forEach(obiect => {
        obiect.addEventListener("click", function () {
            if(cumparaturi.includes(obiect.parentElement.parentElement.dataset.id))   //daca elementul se afla deja in cumparaturi
            {
                let confirm = window.confirm("Adaugati din nou acest produs?");
                if(confirm)
                {
                    produs.push(obiect.parentElement.parentElement.dataset.id);
                    cumparaturi = cumparaturi.concat(produs);
                    produs.pop();
                    alert("Produs adaugat!");
                }
                else{
                    alert("Comanda anulata!");
                }
            }
            else
            {
                cumparaturi.push(obiect.parentElement.parentElement.dataset.id);
                let confirm = window.confirm("Adaugati in cosul de cumparaturi?");
                
                if(confirm) {
                    alert('Produs adaugat!');
                }
                else
                    {
                        cumparaturi.pop();
                        alert('Comanda anulata!');
                    }
                }
            cumparaturi.sort();
            console.log("Cumparaturi: ", cumparaturi);
        })
    });

    trashArray.forEach(trash => {
        trash.addEventListener("click", async function () {
            let id = trash.parentElement.parentElement.dataset.id;
            console.log("id-ul este", trash.parentElement.parentElement.dataset);
            let URL = "http://localhost:7000/sterge-produs/" + id;
            const newObjectList = await deleteProdus(URL);
            afiseazaProduse(newObjectList);
        })
    });

    updateArray.forEach(obiect => {
        obiect.addEventListener("click", async function(){
            let id = obiect.parentElement.parentElement.parentElement.dataset.id;
            console.log("id-ul este", obiect.parentElement.parentElement.parentElement.dataset.id);
            let URL = "http://localhost:7000/update-produs/";
            const updateBtn=document.querySelector(".update-btn");
            console.log(this);
            console.log(updateBtn);

            updateBtn.addEventListener("click", async function () {
                console.log(updateBtn);
                const updatenume = document.querySelector("#upnume").value;
                const updatepret = document.querySelector("#uppret").value;
                //console.log(updatenume);
            
                const UpdateProdus = {
                    id: id,
                    updatenume,
                    updatepret
                }
                console.log("Produs: ", UpdateProdus);
                const newObjectList = await updateProdus(URL, UpdateProdus);
                afiseazaProduse(newObjectList);
            })
        })
    });   
}


async function afiseazaProduse() {

    const response = await fetch("http://localhost:7000/lista-produse");

    //console.log("response", response)

    const ProduseArray = await response.json();
    console.log("ProduseArray", ProduseArray)

    container.innerHTML = ''

    ProduseArray.forEach(produs => {
        console.log(produs)
        const tempProdus = `<div class="item" data-id=${produs.id}>
        <h3>Nume: ${produs.nume}</h3>
        <h3>Pret: ${produs.pret}</h3>
        <img src="../images/pizza1.jpg" alt="imagine-caine">
        <div class="menu">
            <button id="Cumpara">Cumpara</button>
            <img src="../images/star.svg" alt="trash" class="fa fa-star" width="10" height="15" title="Bootstrap">
            <img src="../images/trash.svg" alt="trash" class="fa fa-trash" width="32" height="32" title="Bootstrap">
            <div class="dropdown">
                <i class="fa fa-refresh" aria-hidden="true"></i>
                <div class="dropdown-form">
                    <span class="label">Nume:</span> <input type="text" id="upnume" /><br>
                    <span class="label">Pret:</span><input type="text" id="uppret"/><br>
                    <br>
                    <button class="update-btn">Update produs</button>
                </div>
                </div>
        </div>`

        container.insertAdjacentHTML("beforeend", tempProdus);
    });

    initMenuItems();
}

adaugaBtn.addEventListener("click", async function () {
    const nume = document.querySelector("#nume").value;
    const pret = document.querySelector("#pret").value;

    const newProdus = {
        nume,
        pret
    }

    const newObjectList = await postData('http://localhost:7000/adauga-produs', newProdus)

    console.log("Data", newObjectList)

    afiseazaProduse(newObjectList)

});

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if(response.status == 400){
        swal.fire({
            title: 'Camp necompletat!',
            text: 'Va rugam sa completati toate campurile',
            icon: 'warning',
            confirmButtonText: 'Got it'
        });
    }
    else{
        return response.json();
    }
}

async function deleteProdus(url = '') {
    const response = await fetch(url, {
        method: 'DELETE'
    });
    return response.json();
}

afiseazaProduse()

async function updateProdus(url='', data={}){
    const response = await fetch(url, {
        method:'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if(response.status == 400){
        swal.fire({
            title: 'Camp necompletat!',
            text: 'Va rugam sa completati cel putin un camp',
            icon: 'warning',
            confirmButtonText: 'Got it'
        });
    }
    else{
        return response.json();
    }
}
