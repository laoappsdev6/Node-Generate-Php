import { APIController } from "./controllers/api.controller";
import { MyController } from "./controllers/controller.controller";
import { DeFaultFileController } from "./controllers/default.controller";
import { DirectoryController } from "./controllers/directory.controller";
import { DocumentController } from "./controllers/documents.controller";
import { ModelController } from "./controllers/model.controller";
import { ServiceController } from "./controllers/service.controller";
import { DataBases } from "./databases/databases";

try {

    (async () => {
        console.log("🚀 Starting 🚀");

        //make directory my structure project 
        await DirectoryController.makeDirectory();

        //coppy default file to project 
        await DeFaultFileController.apiFile();
        await DeFaultFileController.configFile();
        await DeFaultFileController.controllerFile();
        await DeFaultFileController.modelFile();
        await DeFaultFileController.serviceFile();

        //get list table all
        const myTable = await DataBases.tableListAll();

        for (let index = 0; index < myTable.length; index++) {
            const element = myTable[index];

            //get column by table
            const myColumn = await DataBases.columnTable(element);

            // create file php 
            await APIController.makeAPI(element);
            await MyController.makeController(element, myColumn);
            await ModelController.makeModel(element, myColumn);
            await ServiceController.makeRequest(element);
            await DocumentController.makeDocument(element, myColumn);
        }
        console.log("✅ End ✅");
    })();

} catch (error) {
    console.log("Process error: ", error);
}
