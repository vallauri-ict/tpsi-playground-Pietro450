"use strict";
let txtUtenti;
let sliderUtenti;
let chkFiltri;
let val=0;
let naz=["CH", "BR", "NL", "IT", "FI","US"];
let genere=["MASCHIO","FEMMINA"];
let password=["C. SPECIALI","MAIUSCOLA","MINUSCOLA","NUMERI"];
let dati;
let nGenerati;
let cont=1;
window.onload = function () {
    nGenerati=document.getElementsByClassName("generati");
    txtUtenti=document.getElementById("numeroUtenti");
    sliderUtenti=document.getElementById("sliderUtenti");
    chkFiltri=document.getElementsByClassName("checkBoxFiltri");
    for(let i=0; i<chkFiltri.length; i++)
    {
        caricaCheck(chkFiltri[i].value,chkFiltri[i]);
        cambiaStatoCheck(chkFiltri[i].value,chkFiltri[i])
    }
}
function generateUsers() {
    if(txtUtenti.value!="")
    {
    let numUsers=txtUtenti.value;
    let param="?results="+numUsers+"&&"+aggiungiFiltri();
    let finalUrl="https://randomuser.me/api"+param;
    console.log(finalUrl);
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    $.ajax({
        url:finalUrl,
        dataType: 'json',
        success:function (usersData) {
            cont=1;
            console.log(usersData);
            dati=usersData.results;
            caricaDati(0,dati);
            document.getElementById("labelMax").innerText="di "+dati.length;
        }
    })
    }else{
        alert("inserire numero");
    }
}
function aggiungiFiltri() {
    let filtri="";
    for(let i=0; i<chkFiltri.length; i++){
        if (chkFiltri[i].checked)
        {
            filtri+=chkFiltri[i].value+"=";
            let array=document.getElementsByClassName(chkFiltri[i].value);
            let primoFiltro=true;
            for(let j=0;j<array.length;j++){
                if(array[j].checked){
                    let filtro="_"+array[j].id;
                    if(primoFiltro)
                        primoFiltro=false;
                    else{
                        filtri+=",";
                    }
                    filtri+=document.getElementById(filtro).innerText;
                }
            }
            filtri+="&&";
        }
    }
    return filtri;
}
//-----------------------------------------------------
//-----------------------------------------------------
function testoCambiato() {
    console.log(sliderUtenti.max);
    if (parseInt(txtUtenti.value)>sliderUtenti.max||(txtUtenti.value<sliderUtenti.min&&txtUtenti.value!=""))
    {
        txtUtenti.value=val;
    }else{
        val=txtUtenti.value;
        sliderUtenti.value=val;
    }
}
//--------------------------------------------------------
//--------------------------------------------------------
//carico utenti
function caricaCheck(tipo, checkAbilitaFiltro)
{
    switch (tipo)
    {
        case "nat":
            generaRadioOcheck(naz,"checkbox","nat",checkAbilitaFiltro.parentNode);
            break;
        case "gender":
          generaRadioOcheck(genere,"radio","gender",checkAbilitaFiltro.parentNode);
            break;
        case "password":
            generaRadioOcheck(password,"checkbox","password",checkAbilitaFiltro.parentNode);
            break;
    }
}
function generaRadioOcheck(array,tipo,name,doveInserire)
{
    for (let i=0;i<array.length;i++)
    {
        let labelRadioOCheck=document.createElement("label");
        labelRadioOCheck.innerText=array[i];
        labelRadioOCheck.for=array[i];
        labelRadioOCheck.id="_"+array[i];
        doveInserire.appendChild(labelRadioOCheck);
        let radioOCheck=document.createElement("input");
        radioOCheck.id=array[i];
        radioOCheck.type=tipo;
        radioOCheck.value=array[i];
        radioOCheck.name=name;
        radioOCheck.checked=false;
        radioOCheck.setAttribute("class",name);
        doveInserire.appendChild(radioOCheck);
    }
}
//carico i dati
//--------------------------------------------------------------------
function caricaDati()
{
    let indice=cont-1;
    pulisciDati();
    document.getElementById("labelContatore").innerText="elemento "+cont;
    nGenerati[0].src=dati[indice].picture.thumbnail;
  nGenerati[1].innerText+=" "+ dati[indice].name.first;
  nGenerati[2].innerText+=" "+dati[indice].name.last;
  nGenerati[3].innerText+=" "+ dati[indice].gender;
    nGenerati[4].innerText+=" "+ dati[indice].nat;
  nGenerati[5].innerText+=" "+dati[indice].email;
    nGenerati[6].innerText+=" "+dati[indice].login.password;
}

//----------------------------------------------------------------------
function pulisciDati(){
 for(let i=0; i<nGenerati.length; i++)
 {
     nGenerati[i].innerText=nGenerati[i].id+": ";
 }
}
//-----------------------------------------------------------------------------
function cambiaStatoCheck(tipo,chkMaster) {
    switch (tipo)
    {
        case "nat":
            cambiaStato(naz,chkMaster.checked);
            break;
        case "gender":
            cambiaStato(genere,chkMaster.checked);
            break;
        case "password":
            cambiaStato(password,chkMaster.checked);
            break;
    }
}
//scegliere naz
function cambiaStato(array,valore) {
    for (let i=0;i<array.length;i++){
        let chkOradio=document.getElementById(array[i]);
        chkOradio.disabled=!valore;
    }
}
function cambiaIndice(step){
    step=parseInt(step);
    if((cont+step)>0&&(cont+step)<(dati.length+1)){
    cont+=step;
 caricaDati();
    }
}