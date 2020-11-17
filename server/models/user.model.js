const mongoose =require('mongoose') ;

const Schema=mongoose.Schema;

let userSchema =new Schema({
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    role: { type: String, required: true },
    tasks:[{
        type:mongoose.Schema.Types.ObjectId,
    ref:'Task',
    }]
})
userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.passwordHash;
    }
});

module.exports=mongoose.model('User',userSchema);