import { EDirectory, Epath } from "../config/config";
import { ManagerController } from "./manager.contorller";

export class DocumentController {

    public static makeDocument(tableName: string, comlumn: Array<string>): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const myClassName = await ManagerController.getClassNameUper(tableName);
                const myFileName = await ManagerController.getFileNameLower(tableName);
                const pathAPI = `localhost/${EDirectory.project}/${EDirectory.api}/${myFileName}.api.php`
                let objInsert = '';
                let objUpdate = `"id":1,`;

                for (let index = 0; index < comlumn.length; index++) {
                    const element = comlumn[index];

                    if (index === comlumn.length - 1) {
                        objInsert = objInsert + `"${element}":"data"`;
                        objUpdate = objUpdate + `"${element}":"data"`;

                    } else {
                        objInsert = objInsert + `"${element}":"data", \n`;
                        objUpdate = objUpdate + `"${element}":"data", \n`;
                    }

                }



                let content = `
{
    "path":"${pathAPI}",
    "objInsert": {
        "Token": "YOUR Token",
        "Method": "add${myClassName}",
        "Content": {
            ${objInsert}
        }
    },
    "objUpdate": {
        "Token": "YOUR Token",
        "Method": "update${myClassName}",
        "Content": {
            ${objUpdate}
        }
    },
    "objDelete": {
        "Token": "YOUR Token",
        "Method": "delete${myClassName}",
        "Content": {
            "id": 1
        }
    },
    "objListAll": {
        "Token": "YOUR Token",
        "Method": "listAll${myClassName}",
        "Content": {
            
        }
    },
    "objListPage": {
        "Token": "YOUR Token",
        "Method": "listPage${myClassName}",
        "Content": {
            "page": 1,
            "limit":10,
            "keyword":"YOUR keyword"
        }
    },
    "objListOne": {
        "Token": "YOUR Token",
        "Method": "listOne${myClassName}",
        "Content": {
            "id": 1
        }
    }
}
                        `;


                const myPathFile = Epath.pathProject + EDirectory.project + '/' + EDirectory.documents + '/' + myFileName + '.doc.json';

                await ManagerController.createPhpFile(myPathFile, content);

                resolve(true);

            } catch (error) {
                reject(error);
            }
        })
    }
}