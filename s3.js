// const aws = require('aws-sdk');
// const fs = require('fs');

// let secrets;
// if (process.env.NODE_ENV == 'production') {
//     secrets = process.env;
// } else {
//     secrets = require('./secrets');
// }

// const s3 = new aws.S3({
//     accessKeyId: secrets.AWS_KEY,
//     secretAccessKey: secrets.AWS_SECRET,
// });

// module.exports.delete = (req, res, next) => {
//     const url = req.body.params.url;
//     const filename = url.substring(url.length - 36, url.length);
//     const promise = s3
//         .deleteObject({
//             Bucket: 'aloha.shop',
//             Key: filename,
//         })
//         .promise();
//     promise
//         .then(() => {
//             console.log('amazon deletion successful');
//             next();
//         })
//         .catch((err) => {
//             // uh oh
//             console.log(
//                 'Something went wrong with the image upload to S3',
//                 err
//             );
//             res.sendStatus(500);
//         });
// };

// module.exports.uploadFromUrl = (path, cb) => {
//     // Read content from the file
//     const fileContent = fs.readFileSync(path);
//     console.log('path', path);
//     const filename = path.substring(path.length - 22, path.length);
//     console.log('filename: ', filename);

//     // Setting up S3 upload parameters
//     const params = {
//         Bucket: 'aloha.shop',
//         ACL: 'public-read',
//         Key: filename, // File name you want to save as in S3
//         ContentType: 'image/png',
//         Body: fileContent,
//     };

//     // Uploading files to the bucket
//     s3.upload(params, function (err, data) {
//         if (err) {
//             throw err;
//         }
//         console.log(`File uploaded successfully. ${data.Location}`);
//         fs.unlink(path, () => {}); // noop function
//         cb(data.Location);
//     });
// };
