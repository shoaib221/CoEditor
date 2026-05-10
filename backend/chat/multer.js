// import multer from "multer";
// import fs from "fs";
// import path from "path";


// const uploadDir = path.resolve("uploads");
// fs.mkdirSync(uploadDir, { recursive: true });


// const storage = multer.diskStorage({
//     destination: uploadDir,
//     filename: (req, file, cb) => {
//         const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
//         cb(null, uniqueName + path.extname(file.originalname));
//     },
// });



// export const multer_uploader = multer({ storage });


// export const TestMulter = async ( req, res, next ) => {

//     try {
//         console.log( "test multer" );
//         console.log("Content-Type:", req.headers["content-type"]);
//         if( req.file ) console.log("file received");
//         if( req.files ) console.log("files received");
//         res.status(200).json( { message: "success" } );
//     } catch(err) {
//         console.log(err.message);
//         res.status(400).json( { error: err.message } )
//     }
// }






