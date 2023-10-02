import multer from "multer";
import fs from "fs";

const configureMulter = () => {

    const uploadsFolderPath = './uploads';

    // Check if the "uploads" folder exists, create it if not
    if (!fs.existsSync(uploadsFolderPath)) {
        fs.mkdirSync(uploadsFolderPath);
    }

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            return cb(null, uploadsFolderPath);
        },
        filename: function (req, file, cb) {
            return cb(null, `${Date.now()}-${file.originalname}`);
        }
    });


    const upload = multer({ storage: storage })

    return upload

}

export default configureMulter;