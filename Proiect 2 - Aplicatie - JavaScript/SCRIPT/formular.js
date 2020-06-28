let email = document.getElementById('email').value;
let password = document.getElementById('password').value;
let emailInput = document.getElementById('email');
let passwordInput = document.getElementById('password');
let buttonLogin = document.getElementById('login');

let email_error = document.getElementById('email_error');
let pass_error = document.getElementById('pass_error');

function email_Verify(){
    if(email.value.lenght >= 8){
       email.style.border = "1px solid silver";
       email_error.style.display = "none";
        return true;
    }
}

function pass_Verify(){
    if(password.value.lenght >= 5){
       password.style.border = "1px solid silver";
        pass_error.style.display = "none";
        return true;
    }
}

emailInput.addEventListener('textInput', () => email_Verify());
passwordInput.addEventListener('textInput', () => pass_Verify());
buttonLogin.addEventListener('click', () => validated());



async function validated(){
    function check_radio_gender() {
        if(document.getElementById('male').checked == true)
            {return 'male';}
        else if(document.getElementById('female').checked == true)
            {return 'female';}
    }

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let pass_verify = document.getElementById('password2').value;
    let sex = check_radio_gender();
    let locatie = document.getElementById('city').value;
    let ora = document.getElementById('hour').value;

    let regex1 = new RegExp('[a-z]+');    //parola sa contina litere mici
    let regex2 = new RegExp('[A-Z]+');    //parola sa contina litere mari
    let regex3 = new RegExp('[0-9]+');    //parola sa contina cifre
    let regex4 = new RegExp('[@#$%^&*_-~?!/.><}{]');        //parola sa contina caractere speciale
    let answer = regex1.test(password) && regex2.test(password) && regex3.test(password) && regex4.test(password);
    let regexEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

    document.getElementById('password').onkeyup = function(){
        let password = document.getElementById('password').value;
        let answer = regex1.test(password) && regex2.test(password) && regex3.test(password) && regex4.test(password);
        console.log("Raspunsul 2:", answer);
        if(answer){
            document.getElementById('password').style.color = 'green';
        }
        else{
            document.getElementById('password').style.color = 'red';
        }
    }

    if(email && password && pass_verify && check_terms)
    {   
        if(answer)
        {   
            if(password == pass_verify)
            {
                if(regexEmail.test(email)){
                    let user={
                    email,
                    password,
                    sex,
                    locatie,
                    ora
                    }

                    const newUsersList = await postDataForm('http://localhost:7000/adauga-user', user)
                    document.querySelector('form').reset();

                    console.log("Data", newUsersList)
                }
                else{
                    Swal.fire({
                        title: 'Email ivalid',
                        text: 'Introduceti un email valid',
                        icon: 'error',
                        confirmButtonText: 'Super!'
                    })
                }
            }
            else{
                Swal.fire({
                    title: 'Parola nu se potriveste',
                    text: 'Introduceti o parola valida',
                    icon: 'error',
                    confirmButtonText: 'Super!'
                })
                window.location.href = "../HTML/error.html";
            }
            window.location.replace('../HTML/index.html');
        }
        else{
            Swal.fire({
                title: 'Parola nu este suficient de puternica',
                text: 'Parola trebuie sa contina litera mare, litera mica, cifra si caractere speciale',
                icon: 'error',
                confirmButtonText: 'Super!'
            })
        }
    }

    console.log(email)
    if(email.length < 9){
        emailInput.style.border = "1px solid red";
        console.log("Am intrat")
        email_error.style.display = "block";
        emailInput.focus();
        return false;
    }
    if(password.length < 6){
        passwordInput.style.border = "1px solid red";
        pass_error.style.display = "block";
        passwordInput.focus();
        return false;
    }
}

async function postDataForm(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
        return response.json();
}

function checkBox() {
    let checkBox = document.getElementById("myCheck");
    let text = document.getElementById("text");
  
    if (checkBox.checked == true){
      text.style.display = "block";
    } else {
      text.style.display = "none";
    }
} 

function check_terms(){
    if(document.getElementById('myCheck').checked== true)
        {return true;}
}

let slider = document.getElementById("hour");
let output = document.getElementById("ora");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}



//Conectare

// const LogBtn = document.querySelector("");

// LogArray=JSON.parse(localStorage.getItem('')) || [];
// console.log(LogArray);
// LogBtn.addEventListener("click", async function (event) {
//     event.preventDefault();
//     const email= document.getElementById('email').value;
//     const parola= document.getElementById('password').value;
//     let user={
//         email,
//         parola
//     };
//     localStorage.setItem("User curent", email);
//     const array = await findUser('http://localhost:7000/find-user');
//     console.log("UsersArray", array)
        
//     array.forEach(data=>{
//         console.log("User: ", user.email);
//         console.log("Data", data.email);
//         if(user.email===data.email && user.parola===data.parola && user.email &&user.parola){
//             LogArray.push(data);
//             localStorage.removeItem('log in');
//             localStorage.setItem('log in', JSON.stringify(LogArray));
//             window.location.replace('../HTML/index.html');
//         }
//     })
// });

// async function findUser(url = '') {
//     const response = await fetch(url);
//     //console.log("response", response)
//     const UsersArray= await response.json();
//     return UsersArray;

// }


