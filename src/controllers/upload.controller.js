const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");

const db = require('../models');
const Upload = db.uploads;

const KEY_FILE_PATH = path.join("repository-smk-aa-08931e69431f.json");

const SCOPES = ["https://www.googleapis.com/auth/drive"];

// const SCOPES = ["https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable"];

// const SCOPES = ["https://www.googleapis.com/upload/drive/v3/files"];

// const SCOPES = ["https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable"];

const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: SCOPES,
})

var status = 0;

const uploadFiles = async (req, res) => {
    try {
        // console.log(req.drive_file)
        // console.log(req.body.test);
        // console.log(req.file)

        req.socket.setTimeout(10 * 60 * 1000);

        const { file } = req;

        if (file == undefined) {
            return res.send(`You must select a file.`)
        }

        const fileSize = file.size;
        const convertSize = fileSize / 1024 / 1024
        const size = convertSize.toFixed(2) + ' MB'

        console.log(fileSize);
        console.log(size + ' MB');

        const upload_to_server = Upload.create({
            type: file.mimetype,
            name: file.originalname,
            data: size
        })

        // return res.send(`File has been uploaded.`)

        const { data } = await google.drive({ version: "v3", auth: auth }).files
            .create({
                media: {
                    mimeType: file.mimeType,
                    body: fs.createReadStream(file.path),
                    resumable: true
                },
                requestBody: {
                    name: file.originalname,
                    // parents: ["1TO3kG0dU_VY55IQjIHFO47p4N22XERyu"]   //folder id in which file should be uploaded

                    parents: ["1yXY_TxpFl-fxM0OTB98r5GNggxstusYz"]
                },
                fields: "id,name"
            },
                {
                    onUploadProgress: function (e) {
                        process.stdout.clearLine();
                        process.stdout.cursorTo(0);
                        process.stdout.write("Upload progress is running on : ");
                        process.stdout.write(e.bytesRead.toString());
                        process.stdout.write(" bytes");
                        process.stdout.write("\n");
                    },
                });

        // status = 0;
        // var outputFile = fs.createWriteStream('output');
        // var total = req.headers['content-length'];
        // var progress = 0;

        // req.on(data, function (chunk) {
        //     progress += chunk.length;
        //     var perc = parseInt((progress / total) * 100);
        //     console.log('percent complete: ' + perc + '%\n');
        //     status = perc;
        // });

        // req.pipe(outputFile);


        if (upload_to_server) {
            console.log(`Uploaded to server is successfully`)
        }

        console.log(`File uploaded successfully to Repository -> ${JSON.stringify(data)}`);

        res.json({ status: 1, message: "success", file_id: data.id, file_name: data.name });

    } catch (error) {
        console.log(error);
        res.json({ status: -1, message: "failure", err: error.message });
    }
}


const getListFiles = async (req, res) => {
    const data = await Upload.findAll({});

    console.log(data);

    if (data) {
        let fileInfos = [];

        // data.forEach((data) => {
        //     fileInfos.push({
        //         name: name,
        //         size: data
        //     })
        // })

        data.forEach(function (item, index) {
            // data['name'] = item.name;
            // data['size'] = item.data;

            fileInfos.push({
                name: item.name,
                size: item.data
            });
        })

        res.status(200).send(fileInfos);
    }

    // res.status(200).json({
    //     data: data
    // })
}

module.exports = {
    uploadFiles,
    getListFiles
}