const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/playground')
    .then(() => console.log('Connected To the MongoDb'))
    .catch( err => console.log('Could Not Connect', err))

    const courseSchema = new mongoose.Schema({
        name: { 
            type: String, 
            required: true,
            minlength: 10,
            maxlength: 255,
            // match: /pattern/
        },
        category: {
            type: String,
            required:true,
            enum: ['web','network','mobile'],
            lowercase: true,
            uppercase:true
        },
        author: String,
        tags: {
            type: Array,
            validate: {
                isAsync: true,
                validator: function(value){
                    return value && value.length > 0;
                },
                message : "A Course should have at least one tag."
            }
        },
        date: {type: Date, default: Date.now},
        isPublished: Boolean,
        price: {
            type: Number,
            min: 10,
            max: 200,
            required: function() {return this.isPublished;},
            get: v => Math.round(v),
            set: v => Math.round(v)
        }
    })

    //Query Operators
        //eq (equal to)
        //ne (not equal to)
        //gt (greater than)
        //gte (greater than equal to)
        //lt (less than)
        //lte (less than equal to)
        //in (like whereIn function)
        //nin (not in)

    const Course = mongoose.model('Course', courseSchema)
    async function createCourse(){
        const course = new Course({
            name: "React Js Course",
            category: "web",
            author: "Zaid Shaikh",
            tags: ['Programm'],
            isPublished: false,
            price: 10.6
        })

        try{
            const result = await course.save();
            console.log(result)
        }
        catch(err){
            for(field in err.errors){
                console.log(err.errors[field].message)
            }
        }
        
    }

    async function getCourse(){
        const courses = await Course
            .find({ _id: "62a2faca9eb6da661bce9312"})
            // .find({price: {$gte:10, $lte:20 })
            // .find({ price: {$in: [10, 20, 30]}})
            // .or([{author: "Eric Eagle"},{isPublished: true}])
            // .and([])
            // .limit(10).sort({name: 1})
            .select({name: 2, author:1, price: 1})
            console.log(courses[0].price)
    }

    async function updateCourse(id){
        const course = await Course.findById(id)
        if(!course){
            return console.log('Course Not Found') 
        }
        course.set({
            isPublished : true,
            name : "Mongo DB",
            author : "Manish Mhaskar"
        })
        const result = await course.save()
        console.log(result)
    } 

    async function removeCourse(id){
        const course = await Course.findByIdAndRemove(id)
        console.log(course);
    }
    
    getCourse();