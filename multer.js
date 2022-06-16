
const multer = require('multer')

const MINE_TYPES = {
    'image/jpg':'jpg',
    'image/jpeg':'jpeg',
    'image/png':'png',
    'image/gif':'gif'
    
}

const storage = multer.diskStorage({

    destination : (requ,file,callback)=>{
        callback(null,'assets/avatars')
    },
    filename : (requ,file,callback)=>{
        const name = file.originalname.split(' ').join('_')
        const extension = MINE_TYPES[file.mimetype]
        callback(null,name + Date.now() + '.' + extension)
    }
})

module.exports = multer({storage}).single('image')