exports.imageSaveCropped = async (req, res) =>{
    try{

        const imgname = new Date().getTime().toString();

        // to declare some path to store your converted image
        const path = './uploads/cropped/'+imgname+'.'+req.body.type;    

        // image takes from body which you uploaded
        const imgdata = req.body.base64image;    

        // to convert base64 format into random filename
        const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        require("fs").writeFile(path, base64Data, 'base64', (err) => {
            console.log(err);
        });

        return res.status(200).json({
            'status': 'success',
            'data': 'success'
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

        const imgname = new Date().getTime().toString();

        // to declare some path to store your converted image
        const path = './uploads/canvased/'+imgname+'.'+req.body.type;    

        // image takes from body which you uploaded
        const imgdata = req.body.base64image;    

        // to convert base64 format into random filename
        const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        require("fs").writeFile(path, base64Data, 'base64', (err) => {
            console.log(err);
        });

        return res.status(200).json({
            'status': 'success',
            'data': 'success'
        });
    }catch(err){
        return res.status(404).json({
            'status': 'error',
            'message': err
        });
    }
}