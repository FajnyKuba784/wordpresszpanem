const endpointskelp = "http://localhost/wordpresstest"

const endpointhurtownia = "http://192.168.15.7/kgwordpress/wp-json/wc/v3/orders"

const idproduktusklep = 42 
const idproduktuhurtownia = 35
var dane_zam = {}

async function getprodukt(){

    const data = await fetch(endpointskelp+"/wp-json/wc/v3/products/42",{
    headers: {
        Authorization: `Basic ${btoa("FajnyKuba784:Paruwkatoja150")}`
    }
})
    const json = await data.json()
    const iloscproduktowsklep = json.stock_quantity
    if(iloscproduktowsklep<=10 && dane_zam.id==undefined){
        console.log("potrzebne zamowienie")
        zamowienie()
    }
    console.log(iloscproduktowsklep)




}

async function zamowienie(){
    const url = new URL(endpointhurtownia)

    var body = {
        "line_items": [
        {"product_id": 35, "quantity": 69}
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

setInterval(()=>{
    
    getprodukt()
    
    
},5000)
getprodukt()