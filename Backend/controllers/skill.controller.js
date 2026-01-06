import Skill from "../models/skill.module.js";


export const addSkill = async(req, res)=>{

    const {name , category} = req.body;
    const isExist = await Skill.findOne({ name:name});
    
    if(isExist){
        return res.status(409).json({ message: "this skill alredy exist" });
    }
    
    await Skill.create({name:name,category:category??null});
    return res.status(200).json({message: "skill added complitly"})
}