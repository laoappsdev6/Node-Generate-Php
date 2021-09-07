import { EDirectory, Epath } from "../config/config";
import { ManagerController } from "./manager.contorller";

export class APIController {

    public static makeAPI(tableName: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const myClassName = await ManagerController.getClassNameUper(tableName);
                const myFileName = await ManagerController.getFileNameLower(tableName);

                let content = `
<?php
require_once "../controllers/${myFileName}.controller.php";
require_once "../models/${myFileName}.model.php";

try {

    Initialization();
    $method = GetMethod();

    $json = json_decode(file_get_contents('php://input'), true);
    $control = new ${myClassName}Controller();
    $model = new ${myClassName}Model($json, $method);

    switch ($method) {
        case ${myClassName}method::add:
            $model->validateAll();
            $control->add($model);
            break;
        case ${myClassName}method::update:
            $model->checkId();
            $model->validateall();
            $control->update($model);
            break;
        case ${myClassName}method::delete:
            $model->checkId();
            $control->delete($model);
            break;
        case ${myClassName}method::listAll:
            $control->listALL();
            break;
        case ${myClassName}method::listPage:
            $control->listPage($model);
            break;
        case ${myClassName}method::listOne:
            $control->listOne($model);
            break;
        default:
            PrintJSON("", Message::methodNotFound, 0);
            break;
    }
} catch (Exception $e) {
    $error = $e->getMessage();
    PrintJSON("", "$error", 0);
}
                        `;

                const myPathFile = Epath.pathProject + EDirectory.project + '/' + EDirectory.api + '/' + myFileName + '.api.php';

                await ManagerController.createPhpFile(myPathFile, content);

                resolve(true);

            } catch (error) {
                reject(error);
            }
        })
    }
}