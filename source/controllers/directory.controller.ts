import fs from 'fs';
import { EDirectory, Epath } from '../config/config';

export class DirectoryController {

    public static makeDirectory(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {

                const project = Epath.pathProject + EDirectory.project;
                const api = Epath.pathProject + EDirectory.project + '/' + EDirectory.api;
                const controllers = Epath.pathProject + EDirectory.project + '/' + EDirectory.controllers;
                const models = Epath.pathProject + EDirectory.project + '/' + EDirectory.models;
                const config = Epath.pathProject + EDirectory.project + '/' + EDirectory.config;
                const image = Epath.pathProject + EDirectory.project + '/' + EDirectory.image;
                const documents = Epath.pathProject + EDirectory.project + '/' + EDirectory.documents;
                const services = Epath.pathProject + EDirectory.project + '/' + EDirectory.services;


                if (!fs.existsSync(project)) {
                    await fs.mkdirSync(project);
                    console.log("Make folder project successfully!");
                }

                if (!fs.existsSync(api)) {
                    await fs.mkdirSync(api);
                    console.log("Make folder api successfully!");
                }

                if (!fs.existsSync(controllers)) {
                    await fs.mkdirSync(controllers);
                    console.log("Make folder controllers successfully!");
                }

                if (!fs.existsSync(models)) {
                    await fs.mkdirSync(models);
                    console.log("Make folder models successfully!");
                }
                if (!fs.existsSync(config)) {
                    await fs.mkdirSync(config);
                    console.log("Make folder config successfully!");
                }
                if (!fs.existsSync(image)) {
                    await fs.mkdirSync(image);
                    console.log("Make folder image successfully!");
                }
                if (!fs.existsSync(documents)) {
                    await fs.mkdirSync(documents);
                    console.log("Make folder documents successfully!");
                }
                if (!fs.existsSync(services)) {
                    await fs.mkdirSync(services);
                    console.log("Make folder services successfully!");
                }
                resolve(true);
            } catch (e) {
                console.log("make directory error: " + e);
                reject(false);

            }
        })

    }
}