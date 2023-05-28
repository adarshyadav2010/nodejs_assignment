const fs = require('fs/promises')

const myFileWriter = async (fileName, fileContent) => {
	try {
		await fs.writeFile('file.txt', 'Hello')
		console.log('file is created')
	}catch(err){
		console.log(err)
	}
	
}
console.log("hi")
console.log("Hello")
const myFileReader = async (fileName) => {
	// write code here
	// dont chnage function name
	try{
		await fs.readFile('File.txt')
		console.log('read the file')
	}catch(err){
		console.log(err)
	}
}


const myFileUpdater = async (fileName, fileContent) => {
	// write code here
	// dont chnage function name
	try{
		await fs.appendFile('File.txt', 'World')
		console.log('update the file')
	}catch(err){
		console.log(err)
	}
}

const myFileDeleter = async (fileName) => {
	// write code here
	// dont chnage function name
	try{
		await fs.unlink('File.txt')
		console.log('Delete the file')
	}catch(err){
		console.log(err)
	}
}


myFileWriter()
myFileUpdater()
myFileReader()
myFileDeleter()
// module.exports = { myFileWriter, myFileUpdater, myFileReader, myFileDeleter }