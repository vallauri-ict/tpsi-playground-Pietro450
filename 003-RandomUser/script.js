//il codice commentato è quello iniziale fatto solo in JavaScript
//la secoda parte è quello implmentato in JQuery
"use strict"
let i =0;
let nUser=0;
let data=null;
let gender;
let nat;

function genera() {
    gender=$("#TendinaGender option:selected").text();
    //gender=document.getElementById("TendinaGender").options[document.getElementById("TendinaGender").selectedIndex].innerText;
    nat=$("#TendinaNationality option:selected").text();
    //nat=document.getElementById("TendinaNationality").options[document.getElementById("TendinaNationality").selectedIndex].innerText;
    nUser=$("#txtUtenti").val();
     //nUser= document.getElementById("txtUtenti").value;
    let parameters= '/?results=' + nUser + "&gender=" + gender + "&nat=" + nat + "&noinfo"; //con il no info non richiedo informazioni aggiuntive
    let finalUrl='https://randomuser.me/api' + parameters;
    //chiamata ajax
    $.ajax({
        url: finalUrl,
        dataType: 'json',
        success: function (usersData) {
            data = usersData;
            CreaImg();
        }
    });
}

function nationality() {
    let nationality= "AU, BR, CA, CH, DE, DK, ES, FI, FR, GB, IE, IR, NO, NL, NZ, TR, US".split(',');
    for (let i=0; i<nationality.length;i++)
    {
        //document.getElementById("TendinaNationality").innerHTML+="<option>" + nationality[i].trim() + "</option>";
        $("#TendinaNationality").append("<option>" + nationality[i].trim() + "</option>");
    }
}

//metodo per inserire l'immagine dell'utente generato
function CreaImg() {
    //let Img= document.getElementById("imgUtente");
    //Img.setAttribute("src", data.results[i].picture.large);
    $("#imgUtente").attr("src", data.results[i].picture.large);
    //document.getElementById("1").innerText=data.results[i].name.last+" "+data.results[i].name.first;
    $("#1").text(data.results[i].name.last+" "+data.results[i].name.first);
}

//funzione che mi permette di farevedere gli elementi richiesti alla pressione del bottone
function Vedi(puntatore) {
    //in questa funzione utilizzo tutti if perchè webstorm mi dava problemi con gli else if non facendo vedere gli elementi richiesti premendo il bottone
    if (puntatore.id=="Nome")
    {
        $("#1").text(data.results[i].name.last + " " + data.results[i].name.first); //nome e cognome
        //document.getElementById("1").innerText=data.results[i].name.last+" "+data.results[i].name.first;
    }
    if (puntatore.id=="Indirizzo")
    {
        $("#1").text(data.results[i].location.street.number + " " + data.results[i].location.city); //indirizzo
        //document.getElementById("1").innerText=data.results[i].location.street.number+" "+data.results[i].location.city;
    }
    if (puntatore.id=="Mail")
    {
        $("#1").text(data.results[i].email); //email
        //document.getElementById("1").innerText=data.results[i].email;
    }
    if(puntatore.id=="Telefono")
    {
        $("#1").text(data.results[i].phone); //telefono
        //document.getElementById("1").innerText=data.results[i].phone;
    }
    //else//document.getElementById("1").innerText=data.results[i].mappa;
    // $("#1").text(data.results[i].mappa); //mappa
}

//bottone avanti
function avanti() {
    i++;
    if (i==nUser)
        i=0;
    CreaImg();
    }

//bottone indietro
function indietro() {
    i--;
    if (i==-1)
        i=nUser-1;
    CreaImg();
    }
