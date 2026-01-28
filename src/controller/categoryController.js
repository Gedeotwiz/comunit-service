import Category from "../model/category.js"

class CategoryController{
    static createCategory = async(req,res)=>{
      const categoryName = req.body
      const category = await Category.findOne(categoryName)
      if(category){
        return res.status(403).json({message:"Category already exist"})
      }
       const newCategory = await Category.create(categoryName)
       if(!newCategory){
         return res.status(404).json({message:"category not created"})
       }else{
         return res.status(201).json({message:'category successfuly created',newCategory})
       }
    }
    static findAllCategory = async(req,res)=>{
       const category = await Category.find()
        if(!category){
         return res.status(404).json({message:"category no found"})
       }else{
         return res.status(200).json({message:'category successfuly displayed',category})
       }
    }

    static deleteAllCategory = async (req,res)=>{
      const categories = await Category.find()
      if(!categories){
        return res.status(404).json({message:"category not found"}) 
      }else{
          const category = await Category.deleteMany()
          return res.status(200).json({message:"category deleted"})
      }
    }
}
export default CategoryController