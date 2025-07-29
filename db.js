const mongoose=require("mongoose");



const userSchema=mongoose.Schema({
    username: {type:String, required:true, unique:true},
    password: {type:String, required:true},

    purchasedCourseId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]

})

const adminSchema=mongoose.Schema({
    username: {type:String, required:true, unique:true},
    password: {type: String, require:true}
})


const courseSchema=mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    price: Number,
    imageUrl: String, // list of lesson URLs or descriptions
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
})

const purchaseSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    purchaseDate: { type: Date, default: Date.now }
  });
  


const userModel=mongoose.model('User',userSchema);
const adminModel=mongoose.model('Admin',adminSchema);
const courseModel=mongoose.model('Course',courseSchema);
const purchaseModel=mongoose.model('Purchase',purchaseSchema);


module.exports={
    userModel,
    adminModel, 
    courseModel,
    purchaseModel
}