import { EDirectory, Epath } from "../config/config";
import { ManagerController } from "./manager.contorller";

export class MyController {

    public static makeController(tableName: string, comlumn: Array<string>): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const myClassName = await ManagerController.getClassNameUper(tableName);
                const myFileName = await ManagerController.getFileNameLower(tableName);

                let columnInsert = '';
                let myValue = '';
                let myUpdate = '';
                let myKeyWord = '';

                for (let index = 0; index < comlumn.length; index++) {
                    const element = comlumn[index];

                    if (index === comlumn.length - 1) {
                        columnInsert = columnInsert + element
                        myValue = myValue + `'` + '$data->' + element + `'`;
                        myUpdate = myUpdate + element + '=' + `'` + '$data->' + element + `'`;
                        myKeyWord = myKeyWord + element + ` like '%$data->keyword%'`
                    } else {
                        columnInsert = columnInsert + element + ','
                        myValue = myValue + `'` + '$data->' + element + `',`;
                        myUpdate = myUpdate + element + '=' + `'` + '$data->' + element + `',`;
                        myKeyWord = myKeyWord + element + ` like '%$data->keyword%' or \n`


                    }


                }



                let content = `
<?php

class ${myClassName}Controller
{
    public $conn;
    public function __construct()
    {
        $this->conn = new PDODBController();
    }
    public function add(object $data)
    {
        $sql = "insert into ${tableName} (${columnInsert}) 
                values (${myValue})";
        $this->conn->insert($sql);
    }
    public function update(object $data)
    {
        $sql = "update ${tableName} set ${myUpdate} where id='$data->id'";
        $this->conn->update($sql);
    }
    public function delete(object $data)
    {
        $sql = "delete from ${tableName} where id='$data->id'";
        $this->conn->delete($sql);
    }
    public function listAll()
    {
        $sql = "select * from ${tableName}";
        $this->conn->selectAll($sql);
    }
    public function listPage(object $data)
    {
        $sqlCount = "select count(*) as num from ${tableName}";

        $sqlPage = "select * from ${tableName} ";
        if (isset($data->keyword) && !empty($data->keyword)) {
            $sqlPage .= " where (
                        ${myKeyWord}
                        )
                        ";

            $sqlCount .= " where (
                        ${myKeyWord}
                        )
                        ";
        }
        $orderBy = "id";
        $this->conn->selectPage($data, $sqlCount, $sqlPage, $orderBy);
    }
    public function listOne(object $data)
    {
        $sql = "select * from ${tableName} where id='$data->id'";
        $this->conn->selectOne($sql);
    }
}
                        `;

                const myPathFile = Epath.pathProject + EDirectory.project + '/' + EDirectory.controllers + '/' + myFileName + '.controller.php';

                await ManagerController.createPhpFile(myPathFile, content);

                resolve(true);

            } catch (error) {
                reject(error);
            }
        })
    }
}
