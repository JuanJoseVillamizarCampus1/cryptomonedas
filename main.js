//5.Selectores
const cryptoMonedas=document.querySelector('#monedaVirtual')
const monedaLocal=document.querySelector('#monedaLocal')
const precio = document.querySelector('.precio')
const inputCantidad=document.querySelector('#inputCantidad')
const compra= document.querySelector('#compra')
const tbdoy=document.querySelector('tbody')
let compras= 0
let cantidad = inputCantidad.value;

//4.Evento principal
document.addEventListener('DOMContentLoaded',getData)
//3..URL APIs
const url= `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`

//1.Funcion traer API y gestionar datos
async function getData() {
    try{
        //2.Fetch API
        const response = await fetch(url)
        const result = await response.json();
        showCrytoMonedas (result)
        EventosCrytos(result)
        
    }
    catch(error)
    {
        console.log(error);
    }
}
//6.Funcion para mostrar en html cryptomonedas
function showCrytoMonedas(result) {
    result.Data.forEach(element => {
        let monedas = element.CoinInfo.FullName
        let name=element.CoinInfo.Name
        let id=element.CoinInfo.Id
        let opcionCryto= document.createElement('option')
              opcionCryto.value=name
              opcionCryto.textContent=monedas
              opcionCryto.setAttribute('id', id)
              const compraHTML=document.createElement('tr')
              compraHTML.classList.add('cantidadComprada')
            compraHTML.innerHTML=`
      <td>${monedas}</td>
     <td class="cantidad"></td>
      `

      cryptoMonedas.appendChild(opcionCryto)
      tbdoy.appendChild(compraHTML)
    });
      
    
}
//Eventos 
  function EventosCrytos(result) {
    let monedaLocalValor = monedaLocal.value;
  //Evento para cambiar la moneda local
    monedaLocal.addEventListener("input", (e) => {
      monedaLocalValor = e.target.value;
      showValor(cryptoMonedas.value, monedaLocalValor, cantidad);
    });
  //Evento para cambiar la cypto
    cryptoMonedas.addEventListener("change", (e) => {
      showValor(e.target.value, monedaLocalValor, cantidad);
    });
  //Evento para cambiar la cantidad de moneda local
    inputCantidad.addEventListener("input", (e) => {
      cantidad = parseFloat(e.target.value);
      showValor(cryptoMonedas.value, monedaLocalValor, cantidad);
    });
    
  }
 
  function showValor(selectedCrypto, monedaLocalValor,cantidad) {
    console.log(selectedCrypto);
    const url2 = `https://min-api.cryptocompare.com/data/price?fsym=${selectedCrypto}&tsyms=${monedaLocalValor}`;
  
    fetch(url2)
      .then((response) => response.json())
      .then((respuesta) => {
        const valor = parseFloat(respuesta[`${monedaLocalValor}`]);
        const total = cantidad / valor;
        precio.textContent = parseFloat(total.toFixed(4));
      });
     
//Comprar
  }
  function showCantidadComprada(total){
    const cantidadComprada=compraHTM.querySelector('.cantidad')
    cantidadComprada.textContent=`${total}holi`
    tbdoy.appendChild(cantidadComprada)
    
  }
 
    
    
    
  
