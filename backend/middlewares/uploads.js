// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// // Ensure the upload directory exists
// const uploadDir = './public/uploads';
// if (!fs.existsSync(uploadDir)) {
//    fs.mkdirSync(uploadDir, { recursive: true }); // Create directory if it doesn't exist
// }

// // Set up storage for uploaded files
// const storage = multer.diskStorage({
//    destination: function(req, file, cb) {
//       cb(null, uploadDir); // Save files in the 'uploads' folder
//    },
//    filename: function(req, file, cb) {
//       cb(null, `${Date.now()}_${file.originalname}`); // Create unique filenames
//    }
// });

// // Set up multer to accept multiple files for specific fields
// const uploads = multer({
//    storage,
//    limits: { fileSize: 1024 * 1024 * 10 } // Max file size: 10MB (optional)
// });

// export default uploads;

import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure the upload directory exists
const uploadDir = './public/uploads';
if (!fs.existsSync(uploadDir)) {
   fs.mkdirSync(uploadDir, { recursive: true }); // Create directory if it doesn't exist
}

// Set up storage for uploaded files
const storage = multer.diskStorage({
   destination: function(req, file, cb) {
      cb(null, uploadDir); // Save files in the 'uploads' folder
   },
   filename: function(req, file, cb) {
      const uniqueFileName = `${Date.now()}_${file.originalname}`; // Create unique filenames
      cb(null, uniqueFileName); // Pass the unique filename to multer
       
      // Store only the relative path in the request body
      req.body[file.fieldname] = `uploads/${uniqueFileName}`; // Store relative path for saving to the database
   }
});

// Set up multer to accept multiple files for specific fields
const uploads = multer({
   storage,
   limits: { fileSize: 1024 * 1024 * 10 } // Max file size: 10MB (optional)
});

export default uploads;
