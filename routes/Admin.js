const AdminMiddleware = require("../middlewares/AdminMiddleware");
const expressFileUpload = require("express-fileupload")
const path = require("path")

const router = require("express").Router();


router.get("/admin", AdminMiddleware, async (req, res) => {
    let data = await req.db.books.find().toArray(); 

    data = data.reverse()
 
    res.render("admin", {
        user: req.user,
        data,
    })
});

router.post("/admin", [AdminMiddleware, expressFileUpload()], async (req, res) => {
    try {
        const {photo} = req.files;
        const {
            name,
            author,
            price,
        } = req.body;

        let currentdate = new Date(); 
        let datetime =  currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " "
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();

        if (!(name && price && photo && author)) {
            throw new Error("Fill all inputs!")
        }

        const photo_ext = photo.name.split(".")[photo.name.split(".").length - 1];


        const book = await req.db.books.insertOne({
            name,
            author,
            price,
            photo_ext,
            datetime,
        })

        console.log(book);

        await photo.mv(path.join(__dirname, "..", "public", "uploads", book.insertedId + "." + photo_ext));
        res.json({
            ok: true,
        })

    } catch (error) {
        console.log(error);
        res.json({
            error: error,
        })
    }
})


module.exports = {
    router,
    path: "/"
}