const endpointskelp = "http://localhost/wordpresstest"

const endpointhurtownia = "http://192.168.15.7/kgwordpress/wp-json/wc/v3/orders"

const idproduktusklep = 42 
const idproduktuhurtownia = 35
var iloscproduktowsklep = 0
var dane_zam = {}

async function getprodukt(){

    const data = await fetch(endpointskelp+"/wp-json/wc/v3/products/42",{
    headers: {
        Authorization: `Basic ${btoa("FajnyKuba784:Paruwkatoja150")}`
    }
})
    const json = await data.json()
    iloscproduktowsklep = json.stock_quantity
    if(iloscproduktowsklep<=10 && dane_zam.id==undefined){
        console.log("potrzebne zamowienie")
        zamowienie()
    }
    
    if(dane_zam!= undefined){
        checkOrder()
    
    }
    console.log(iloscproduktowsklep)




}

async function zamowienie(){
    const url = new URL(endpointhurtownia)

    var body = {
        "line_items": [
        {"product_id": 35, "quantity": 666}
    ]}

   /* for(let i in params){

        url.searchParams.append(i,params[i])


    }*/
    const data = await fetch(url,{
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            Authorization: `Basic ${btoa("hurtownia:hurtownia")}`,
            "Content-Type": "application/json"
        }
    })
    dane_zam = await data.json()
   

}
async function checkOrder(){
     //console.log( dane_zam.id)
    const url = new URL(endpointhurtownia+"/"+dane_zam.id)
    const data = await fetch(url,{
        headers: {
            Authorization: `Basic ${btoa("hurtownia:hurtownia")}`
        }
    })

   dane_zam = await data.json()
  console.log(dane_zam.status)
  if(dane_zam.status=="completed"){

    const body = {"stock_quantity":iloscproduktowsklep+69}

    const data = await fetch(endpointskelp+"/wp-json/wc/v3/products/42",{
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            Authorization: `Basic ${btoa("FajnyKuba784:Paruwkatoja150")}`,
            "Content-Type": "application/json"
        } 


    })
    const json = await data.json()
    dane_zam = {}
    }
}
setInterval(()=>{
    
    getprodukt()
    
    
},5000)
getprodukt()