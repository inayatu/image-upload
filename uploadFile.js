const router = require('express').Router()
const multer = require('multer')
const path = require('path')

const maxSize = 10*1024*1024; // 1MB

// check file type
checkFileType = (file, cb) => {
	// Allowed ext
	const allowedFTypes = /jpeg|jpg|png|gif/

	// check ext
	const extname = allowedFTypes.test(path.extname(file.originalname).toLowerCase())

	// check mime type
	const mimeType = allowedFTypes.test(file.mimetype)

	if(allowedFTypes && mimeType) return cb(null, true)
	return cb('This file type not allowed, only images allowed!	')
}		

const storage = multer.diskStorage({
	destination: './public/uploads',
	filename: (req, file, cb)=>{
		cb(null, Date.now()+'_'+file.originalname)
	}
})

const upload = multer({
	storage: storage, 
	limits:{ fileSize: maxSize },
	fileFilter: (req, file, cb)=>{
		checkFileType(file, cb)
	}
}).single('uploadme')

router.post('/', upload, (req, res)=>{
	console.log('uploading ....')
	console.log('file: ', req.file)
	
	if(!req.file) return res.status(400).send({msg: 'file not attached'});
	upload(req, res, (err) =>{
		if(err)return res.send('err')
		res.status(200).send({msg: 'file uploaded'})
	})
})


/*router.route('/').post(upload, (req, res)=>{
	if(!req.file) return res.status(400).send({msg: 'file not attached'});
	upload(req, res, (err) =>{
		if(err)return res.send('err')
		res.status(200).send({msg: 'file uploaded'})
	})
})*/

module.exports = router;