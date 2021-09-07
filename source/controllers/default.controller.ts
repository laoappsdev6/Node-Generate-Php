import path from 'path';
import { EDirectory, Efile, Epath } from '../config/config';
import { ManagerController } from './manager.contorller';

export class DeFaultFileController {

    public static apiFile(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const oldPath = path.join(__dirname, Epath.pathPhp + Efile.login);
                const newPath = Epath.pathProject + EDirectory.project + '/' + EDirectory.api + '/' + Efile.login;
                await ManagerController.copyFile(oldPath, newPath);
                resolve(true);
            } catch (error) {
                console.log("copy file error: " + error);
                reject(error);
            }
        })
    }

    public static configFile(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const oldPath = path.join(__dirname, Epath.pathPhp + Efile.config);
                const newPath = Epath.pathProject + EDirectory.project + '/' + EDirectory.config + '/' + Efile.config;
                await ManagerController.copyFile(oldPath, newPath);
                resolve(true);
            } catch (error) {
                console.log("copy file error: " + error);
                reject(error);
            }
        })
    }

    public static controllerFile(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const oldPath1 = path.join(__dirname, Epath.pathPhp + Efile.database);
                const newPath1 = Epath.pathProject + EDirectory.project + '/' + EDirectory.controllers + '/' + Efile.database;

                const oldPath2 = path.join(__dirname, Epath.pathPhp + Efile.validCon);
                const newPath2 = Epath.pathProject + EDirectory.project + '/' + EDirectory.controllers + '/' + Efile.validCon;

                const oldPath3 = path.join(__dirname, Epath.pathPhp + Efile.authorize);
                const newPath3 = Epath.pathProject + EDirectory.project + '/' + EDirectory.controllers + '/' + Efile.authorize;

                await ManagerController.copyFile(oldPath1, newPath1);
                await ManagerController.copyFile(oldPath2, newPath2);
                await ManagerController.copyFile(oldPath3, newPath3);

                resolve(true);
            } catch (error) {
                console.log("copy file error: " + error);
                reject(error);
            }
        })
    }

    public static modelFile(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const oldPath1 = path.join(__dirname, Epath.pathPhp + Efile.validMo);
                const newPath1 = Epath.pathProject + EDirectory.project + '/' + EDirectory.models + '/' + Efile.validMo;

                const oldPath2 = path.join(__dirname, Epath.pathPhp + Efile.loginMo);
                const newPath2 = Epath.pathProject + EDirectory.project + '/' + EDirectory.models + '/' + Efile.loginMo;

                await ManagerController.copyFile(oldPath1, newPath1);
                await ManagerController.copyFile(oldPath2, newPath2);
                resolve(true);
            } catch (error) {
                console.log("copy file error: " + error);
                reject(error);
            }
        })
    }

    public static serviceFile(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const oldPath1 = path.join(__dirname, Epath.pathJwt + Efile.service);
                const newPath1 = Epath.pathProject + EDirectory.project + '/' + EDirectory.services + '/' + Efile.service;

                const oldPath2 = path.join(__dirname, Epath.pathJwt + Efile.request);
                const newPath2 = Epath.pathProject + EDirectory.project + '/' + EDirectory.services + '/' + Efile.request;

                const oldPath3 = path.join(__dirname, Epath.pathJwt + Efile.jwt);
                const newPath3 = Epath.pathProject + EDirectory.project + '/' + EDirectory.services + '/' + Efile.jwt;

                const oldPath4 = path.join(__dirname, Epath.pathJwt + Efile.vendor);
                const newPath4 = Epath.pathProject + EDirectory.project + '/' + EDirectory.services + '/' + Efile.vendor;

                await ManagerController.copyFile(oldPath1, newPath1);
                await ManagerController.copyFile(oldPath2, newPath2);
                await ManagerController.copyFile(oldPath3, newPath3);
                await ManagerController.copyDirectory(oldPath4, newPath4);

                resolve(true);
            } catch (error) {
                console.log("copy file error: " + error);
                reject(error);
            }
        })
    }

}