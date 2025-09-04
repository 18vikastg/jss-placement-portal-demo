import multer from "multer";

const storage = multer.memoryStorage();

export const singleUpload = multer({storage}).single("file");

// For enhanced profile updates that can handle resume uploads
export const enhancedUpload = multer({storage}).fields([
    { name: 'file', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
    { name: 'profilePhoto', maxCount: 1 }
]);