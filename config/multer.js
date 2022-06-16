
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-key.json");
const multer = require('multer');
const BUCKET = 'zeko-app-1b172.appspot.com'
const MINE_TYPES = {
    'image/jpg':'jpg',
    'image/jpeg':'jpeg',
    'image/png':'png',
    'image/gif':'gif'
    
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket : BUCKET
});
// const bucket = admin.storage().bucket()
// exports.uploadAvatars = (requ,resp,next)=>{

//     if(requ.files){
//         const name = requ.files.originalname.split(' ').join('_').replace(`${'.'+ MINE_TYPES[file.mimetype]}`,'')
//         const extension = MINE_TYPES[requ.files.mimetype]
//         const finalName = name + Date.now() + '.' + extension
//         const avatarsName = bucket.file(finalName)
//         requ.body.imgName = BUCKET/finalName
        
//     }
// }

const storage = multer.diskStorage({
    destination : (requ,file,callback)=>{
        
        callback(null,'./assets/avatars')
    },
    filename : (requ,file,callback)=>{
        
        const name = file.originalname.split(' ').join('_').replace(`${'.'+ MINE_TYPES[file.mimetype]}`,'')
        const extension = MINE_TYPES[file.mimetype]
        const finalName = name + Date.now() + '.' + extension
        callback(null,finalName)
        requ.body.imgName = finalName
        
    }
})

module.exports = multer({storage}).single('image')