//Exercitiul 3 - Nivelul 2

const titlu = document.querySelector("h1");       //selectez titlul
const strTitlu = titlu.innerText;
const splitTitlu = strTitlu.split("") 
titlu.innerHTML= "";

for (let i = 0; i < splitTitlu.length; i++ )
    titlu.innerHTML += "<span>" + splitTitlu[i] + "</span>";    //punem fiecare litera intr-un span

let st = 0, dr = splitTitlu.length - 1;
let timer = setInterval(execution, 100) ;          //la fiecare 100 ms apelam functia pentru apartia a 2 litere

function execution()
{
  const span1 = titlu.querySelectorAll("span")[st];        //litera din stanga
  span1.classList.add("culoare"); 

  const span2 = titlu.querySelectorAll("span")[dr];          //litera din dreapta
  span2.classList.add("culoare");
 
  st++; 
  dr--;

  if(st > dr)          //cand am trecut de jumatate oprim functia setInterval
  {
    clearInterval(timer);
    timer = null;         
    return;
  } 
} 


//Exercitiul 1 - Nivelul 2

const trimite = document.querySelector("#trimite");
submit_data = async function (event){
  let data = document.getElementById('birthday').value;
  let day = Number(data[8] + data[9]);
  let month = Number(data[5] + data[6]);
  let year = Number(data[0] + data[1] + data[2] + data[3]);
  console.log("An:", data[8]);
  let today = new Date();

  let varsta = String(today.getFullYear() - year - 1) + " Ani " + String(today.getMonth() + month - 11) +" Luni "+ String(today.getDate() - 
  day) + " Zile "+ String(today.getHours()) + " Ore " + String(today.getMinutes()) + " Minute "+ String(today.getSeconds()) + " Secunde";

  document.getElementById("varsta").innerHTML = varsta;
  setTimeout(submit_data, 1000);
}

trimite.addEventListener("click", submit_data);


//Exercitiul 8 - Nivelul 1

const buttonImages = document.getElementById("buttonImages");
let statusButton = false;

buttonImages.addEventListener("click", function() {
    let imagini = document.getElementsByTagName("img");

    console.log(imagini);
        for(let i = 0; i < imagini.length; i++) {
            if(imagini[i].style.display == "none") {
                imagini[i].style.display = "inline-block";
            }
            else {
                imagini[i].style.display = "none";
            }
        }
    if(statusButton == false) {
        buttonImages.innerHTML = "Arata Imaginile";
    }
    else {
        buttonImages.innerHTML = "Ascunde Imaginile";
    }
    statusButton = !statusButton;
});


//Exercitiul 15 - Nivelul 1
let x = 100;

setInterval(function() {
    document.body.style.backgroundPosition = x + "px";
    x -= 10;
    if(x <= 0){
        x = 100;
    }
}, 200);


//Exercitiul 9 - Nivelul 1

const staticButton = document.querySelector("#static");
const dinamicButton = document.querySelector("#dinamic");

//Elementele din lista sunt selectate dupa clasa si puse intr-un vector.
//Pentru ca am folosit "querySelector" colectia este statica
let colectieStatica = document.querySelectorAll(".S");
staticButton.addEventListener("click", function(event) {
    //Facem sa dispara elementele de pe pozitii divizibile cu 3
    for (let i = 0; i < colectieStatica.length; i++) {
        if ((i + 1) % 3 == 0)
            colectieStatica[i].style.display = "none";
    }
})

//Pentru ca am folosit "getElementsByClassName" colectia este dinamica
let colectieDinamica = document.getElementsByClassName("D");
dinamicButton.addEventListener("click", function(event) {
    for (let i = 0; i < colectieDinamica.length; i++) {
        if ((i + 1) % 3 == 0)
            colectieDinamica[i].style.display = "none";
    }
})


//Exercitiul 4 - Nivelul 1
document.addEventListener('DOMContentLoaded', function(){ time();}, false);
function time(){
    let petrcut = document.getElementById('trimite');
    let data  = new Date();
    if(petrcut){
        petrcut.addEventListener('click', function(){
            let miliSec = new Date() - data;
            alert('Au trecut ' + miliSec/1000 + ' milisecunde');
        })
    }
}