
const {Products}=require("../db")

const getProduct= async(req,res)=>{//consultar si se puede llegar a buscar por nombre e id a la vez, raro la verdad
    const name=req.query.name;
    let reqProd=[];
try {
    if(name){
        try {
            let nameP=await Products.findAll()
           for(let i of nameP){
            if(i.name.includes(name)){
                reqProd.push(i);
            }
           }
            if(reqProd.length){
                return res.status(200).send(reqProd)
            }else{
                return res.status(400).send("unmatched product name")
            }
        } catch (error) {
            return res.status(400).send("error searching product by name")
        }
      
    }else{
        try {
            let aux2=await Products.findAll();
            reqProd.push(aux2);
            return res.status(200).send(reqProd)
        } catch (error) {
            return res.status(400).send("error searching all products")
        }
        
    }
} catch (error) {
    return res.status(400).send("error controller getProduct")
}
   
 
}

const ProductsId= async(req,res)=>{
    const {id}=req.params;
    
    try {
        let aux3=await Products.findByPk(id)
        return res.status(200).json(aux3)
    } catch (error) {
        return res.status(400).send("unmatch id")
    }
   /*  try {
        if(id){
            try {
                let aux3=await Products.findByPk(id)
            if(aux3){
                idSearch.push(aux3);
                return res.status(200).send(idSearch)
            }else{
                return res.status(400).send("unmatched product id")
            }
            } catch (error) {
               return res.status(400).send("error searching product by id") 
            }
            
        }
    } catch (error) {
        return res.status(400).send("error controller ProductsId")
    }
    */

}


const postProducts= async(req,res)=>{//rating va?
    const {name,description,img,stock,price,rating}=req.body;
    try {
       let newProd=await Products.create({name,description,img,stock,price,rating});
       return res.status(200).send("product added successfully"); 
    } catch (error) {
        return res.status(400).send("problems loading the product")
    }
}

module.exports={postProducts,getProduct,ProductsId,};