const {Products}=require("../db");
const {Op}=require("sequelize")

const search=async(req,res)=>{
const {name}=req.query;
try {
    const searchP=await Products.findAll({
        where:{
            name:{
                [Op.substring]:name,
            },
        },
    });
    if(searchP.length){
    return res.status(200).json(searchP);
    }else{
        return res.status(400).send("unmatch search");
    }
} catch (error) {
    return res.status(400).send("search failed");
}
}

module.exports={search,}