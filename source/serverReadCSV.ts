import { Application } from 'express';
import express from 'express';
import { ManagerController } from './controllers/manager.contorller';
import path from 'path';
import { Eservice } from './config/config';
import chokidar from 'chokidar';
import moment from 'moment';
import { HttpClientController } from './controllers/httpClient';


export let app: Application = express();

let PORT = 9581;

function copyFile() {

    try {

        let pathOriginal = path.join(Eservice.pathOriginal);
        let myPathCSV = path.join(Eservice.myPathCSV);


        chokidar.watch(pathOriginal).on('all', async (event, path) => {


            if (event === 'add') {

                const type = ManagerController.getFileType(path);

                if (type === 'csv') {

                    const date = ManagerController.getDateFromFile(path)
                    const startDate = moment(Eservice.date, "YYYY-MM-DD");
                    const allDate = moment(date, "YYYY-MM-DD");

                    if (allDate > startDate) {

                        const filename = await ManagerController.getFileName(path);

                        await ManagerController.copyFile(path, myPathCSV + filename + '.csv');

                    }

                } else {
                    console.log(path + " File type error");
                }
            }
        });
    } catch (err) {
        console.log("Process Error: ", err);
    }
}

app.listen(PORT, '0.0.0.0', () => {

    try {
        copyFile();


        // let myPathCSV = path.join('D:/MyCSV/CSVFile/');
        let myPathCSV = path.join(Eservice.myPathCSV);
        let myPathWatcher = path.join(Eservice.myPathWatcher);
        var myHttpServer = Eservice.myPathAPI;

        // create folder 
        ManagerController.makeDirectory(myPathWatcher);

        var LIST = [];
        var T: any = null;

        chokidar.watch(myPathCSV).on('all', async (event, path) => {


            if (event === 'add') {


                const type = ManagerController.getFileType(path);

                if (type === 'csv') {

                    const date = ManagerController.getDateFromFile(path)
                    const startDate = moment(Eservice.date, "YYYY-MM-DD");
                    const allDate = moment(date, "YYYY-MM-DD");

                    if (allDate > startDate) {
                        LIST.push(path);
                    }

                    if (!T) {
                        T = setInterval(async v => {
                            if (!LIST.length) { clearInterval(T); T = null; } else {
                                const va = [];
                                for (let index = 0; index < 10; index++) {
                                    if (LIST[index]) {
                                        va.push(...LIST.splice(LIST[index], 1));
                                    }
                                    // console.log(list.length);
                                }
                                for (let index = 0; index < va.length; index++) {
                                    const element = va[index];
                                    try {
                                        await HttpClientController.client(element, myPathWatcher, myHttpServer);
                                    } catch (error) {
                                        console.log(error);
                                    }
                                }
                            }
                        }, 1000)
                    }
                } else {
                    console.log(path + " File type error");
                }
            }
        });
    } catch (err) {
        console.log("Process Error: ", err);
    }
});





