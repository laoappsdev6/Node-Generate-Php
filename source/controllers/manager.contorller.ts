import fs, { fstatSync } from 'fs';
import fse from 'fs-extra'
import replace from 'replace-in-file';

export class ManagerController {

    public static replaceFile(getFile: string) {
        try {
            var option1 = {
                files: getFile,
                from: /,/g,
                to: ';',
            }
            var option2 = {
                files: getFile,
                from: /ext. batt/g,
                to: 'ext_batt',
            }
            const results1 = replace.sync(option1);
            const results2 = replace.sync(option2);
            // console.log('Replace file successfully:');
        }
        catch (error) {
            console.error('Replace file error:' + error);
        }
    }

    public static pushDataFile(fileName: string, content: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {

            try {
                var logger = await fs.createWriteStream(fileName, {
                    flags: 'a'
                })

                console.log('File => ' + fileName + ' push data successfully.');
                await logger.write(content)
                await logger.close();

                resolve(true);


            } catch (error) {
                reject(error);
                console.log(error);
            }
        })
    }

    public static createPhpFile(fileName: string, content: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {

            try {

                if (!fs.existsSync(fileName)) {

                    var logger = await fs.createWriteStream(fileName, {
                        flags: 'a'
                    })

                    console.log('File => ' + fileName + ' create successfully.');
                    await logger.write(content)
                    await logger.close();

                    resolve(true);
                } else {
                    resolve(true);
                }

            } catch (error) {
                reject(error);
                console.log(error);
            }
        })
    }


    public static copyFile(firstPath: string, lastPath: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                if (!fs.existsSync(lastPath)) {
                    await fs.copyFile(firstPath, lastPath, (err) => {
                        if (err) throw err;
                        console.log('copy file Successfully');
                        resolve(true);
                    });
                } else {
                    resolve(true);
                }
            } catch (e) {
                reject(e)
                console.log("getFileCSV error: " + e);
            }
        })
    }

    public static copyDirectory(firstPath: string, lastPath: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                if (!fs.existsSync(lastPath)) {

                    await fse.copy(firstPath, lastPath, (err) => {
                        if (err) throw err;
                        console.log('copy file Successfully');
                        resolve(true);
                    });
                } else {
                    resolve(true);
                }
            } catch (e) {
                reject(e);
                console.log("getFileCSV error: " + e);
            }
        });
    }

    public static getClassNameUper(data: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {

            try {
                const isUnder = data.includes("_");

                if (isUnder) {
                    const mySplice = data.split("_");
                    let myCalss = '';
                    for (let index = 0; index < mySplice.length; index++) {
                        const element = mySplice[index];
                        const first = element.substr(0, 1);
                        const last = element.substr(1, element.length - 1)

                        const className = first.toUpperCase() + last;

                        myCalss = myCalss + className
                    }
                    resolve(myCalss);
                } else {
                    const first = data.substr(0, 1);
                    const last = data.substr(1, data.length - 1)

                    const className = first.toUpperCase() + last;

                    resolve(className);
                }
            } catch (error) {
                reject(error);
            }
        })
    }

    public static getFileNameLower(data: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {

            try {
                const isUnder = data.includes("_");

                if (isUnder) {
                    const mySplice = data.split("_");
                    let myFile = '';
                    for (let index = 0; index < mySplice.length; index++) {
                        const element = mySplice[index];
                        const first = element.substr(0, 1);
                        const last = element.substr(1, element.length - 1)

                        const fileName = first.toUpperCase() + last;

                        myFile = myFile + fileName
                    }

                    const first = myFile.substr(0, 1);
                    const last = myFile.substr(1, myFile.length - 1)
                    const phpFileName = first.toLowerCase() + last;
                    resolve(phpFileName);

                } else {
                    const first = data.substr(0, 1);
                    const last = data.substr(1, data.length - 1)
                    const phpFileName = first.toLowerCase() + last;
                    resolve(phpFileName);

                }
            } catch (error) {
                reject(error);
            }
        })
    }
}