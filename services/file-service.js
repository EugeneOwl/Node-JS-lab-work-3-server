import { FILES_UPLOAD_DIRECTORY } from "../consts/files-const";

const fs = require('fs');

class FileService {

    uploadFile(fileName, fileBuffer) {
        const path = FILES_UPLOAD_DIRECTORY + fileName;

        fs.open(path, 'w', function(err, fd) {
            if (err) {
                throw 'error opening file: ' + err;
            }

            fs.write(fd, fileBuffer, 0, fileBuffer.length, null, function(err) {
                if (err) throw 'error writing file: ' + err;
                fs.close(fd, function() {
                    console.log('file written');
                })
            });
        });
    }
}

const fileService = new FileService();

export {fileService}
