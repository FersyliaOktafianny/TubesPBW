import http from 'http';
import fs from 'fs'
import formidable from 'formidable'

http.createServer(function (req, res){
const form = new formidable.IncomingForm();
    form.parse(req, function(error, fields, file){
        const filepath = file.fileupload.filepath;
        const newpath ='';
        newpath += file.fileupload.originalFilename;
        fs.rename(filepath,newpath, function(){
            res.write('File Upload sukses');
            res.end();
        });

    }); 

});


