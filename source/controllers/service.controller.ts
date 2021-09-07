import { EDirectory, Efile, Epath } from "../config/config";
import { ManagerController } from "./manager.contorller";

export class ServiceController {

    public static makeRequest(tableName: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const myClassName = await ManagerController.getClassNameUper(tableName);

                let content = `
class ${myClassName}Method
{
    const add = "add${myClassName}";
    const update = "update${myClassName}";
    const delete = "delete${myClassName}";
    const listAll = "listAll${myClassName}";
    const listPage = "listPage${myClassName}";
    const listOne = "listOne${myClassName}";
}
                        `;

                const myPathFile = Epath.pathProject + EDirectory.project + '/' + EDirectory.services + '/' + Efile.request;

                await ManagerController.pushDataFile(myPathFile, content);

                resolve(true);

            } catch (error) {
                reject(error);
            }
        })
    }
}