import { EDirectory, Epath } from "../config/config";
import { ManagerController } from "./manager.contorller";

export class ModelController {

    public static makeModel(tableName: string, comlumn: Array<string>): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const myClassName = await ManagerController.getClassNameUper(tableName);
                const myFileName = await ManagerController.getFileNameLower(tableName);

                let property = '';
                let validate = '';

                for (let index = 0; index < comlumn.length; index++) {
                    const element = comlumn[index];

                    property = property + 'public string $' + element + ';\n';
                    validate = validate + `case '${element}': \n validateEmpty($value, $key); \n break; \n`

                }



                let content = `
<?php

require_once "../controllers/validate.controller.php";
require_once "validate.model.php";
require_once "../services/services.php";

class ${myClassName}Model
{
    public int $id = 0;
    ${property}
    public $page;
    public $limit;
    public $keyword;

    public function __construct(array $object, string $method)
    {
        if ($method !== ${myClassName}method::listAll) {
            validateEmptyObject($object, "Data");
        }

        foreach ($object as $property => $value) {
            if (property_exists('${myClassName}Model', $property)) {
                $this->$property = $value;
            }
        }
    }

    public function validateAll()
    {
        foreach ($this as $key => $value) {
            $this->validate($key, $value);
        }
    }

    public function validate($key, $value)
    {
        switch ($key) {
           ${validate}
        }
    }

    public function checkId()
    {
        $sql = "select * from ${tableName} where id='$this->id'";
        validateNotAvailable($sql, "${tableName} ID", $this->id);
    }

}
                
                        `;


                const myPathFile = Epath.pathProject + EDirectory.project + '/' + EDirectory.models + '/' + myFileName + '.model.php';

                await ManagerController.createPhpFile(myPathFile, content);

                resolve(true);

            } catch (error) {
                reject(error);
            }
        })
    }
}