const fs           = require("fs");
const azureStorage = require('azure-storage');
const creds        = require('../constants');

/**
 * File Upload Process
 * */

const imageName  = "";
const imagePath  = "";
const imagePath1 = "";
const imageSize  = "";

const azureStorageConfig = {
    accountName: creds.account_name,
    accountKey: creds.key,
    blobURL: creds.url,
    containerName: creds.container
};

uploadFileToBlob = async (directoryPath) => {

    return new Promise((resolve, reject) => {

        // var stats      = fs.statSync(this.imagePath);
        // console.log(stats)
        // 200 MB
        this.imageSize     = '200000';

        const blobName     = getBlobName(this.imageName);
        const stream       = fs.createReadStream(this.imagePath);
        const streamLength = this.imageSize;
        const blobService  = azureStorage.createBlobService(azureStorageConfig.accountName, azureStorageConfig.accountKey); 
        blobService.createBlockBlobFromStream(azureStorageConfig.containerName, `${directoryPath}/${blobName}`, stream, streamLength, err => {
            if (err) {
                reject(err);
            } else {
                resolve({ filename: blobName, 
                    originalname: this.imageName, 
                    size: streamLength, 
                    path: `${azureStorageConfig.containerName}/${directoryPath}/${blobName}`,
                    url: `${azureStorageConfig.blobURL}/${directoryPath}/${blobName}` });
            }
        });
    });
};

const getBlobName = originalName => {
    const identifier = Math.random().toString().replace(/0\./, ''); // remove "0." from start of string
    return `${identifier}-${originalName}`;
};

exports.imageSaveCropped = async (req, res) =>{
    try{
        this.imageName = new Date().getTime().toString() + '.' + req.body.type;    

        // to declare some path to store your converted image
        this.imagePath  = './uploads/cropped/' + this.imageName;
        this.imagePath1 = '/uploads/cropped/' + this.imageName;

        // image takes from body which you uploaded
        const imgdata = req.body.base64image;    

        // to convert base64 format into random filename
        const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        require("fs").writeFile(this.imagePath, base64Data, 'base64', (err) => {
            console.log(err);
        });

        // Azzure upload
        const uploadStatus = await uploadFileToBlob('uploads-cropped').catch(error => {
            console.log(error)
            return res.status(error.code).json({
                'status': 'error',
                'message': 'Something went wrong...'
            });
        })

        return res.status(200).json({
            'status': 'success',
            'message': 'Cropped image Saved successfully',
            'data': uploadStatus
        });
    }catch(err){
        console.log(err)
        return res.status(404).json({
            'status': 'error',
            'message': err
        });
    }
}

exports.imageSaveCanvased = async (req, res) =>{
    try{
        this.imageName = new Date().getTime().toString()  + '.' + req.body.type;      

        // to declare some path to store your converted image
        this.imagePath = './uploads/canvased/' + this.imageName; 
        this.imagePath1 = '/uploads/canvased/' + this.imageName; 

        // image takes from body which you uploaded
        const imgdata = req.body.base64image;    

        // to convert base64 format into random filename
        const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        require("fs").writeFile(this.imagePath, base64Data, 'base64', (err) => {
            console.log(err);
        });

        // Azzure upload
        const uploadStatus = await uploadFileToBlob('uploads-canvased').catch(error => {
            console.log(error)
            return res.status(error.code).json({
                'status': 'error',
                'message': 'Something went wrong...'
            });
        })

        return res.status(200).json({
            'status': 'success',
            'message': 'Canvased image Saved successfully',
            'data': uploadStatus
        });
    }catch(err){
        return res.status(404).json({
            'status': 'error',
            'message': err
        });
    }
}