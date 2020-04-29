import { NgModule, InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export class AppConfig {
    apiEndpoint: string;
    addMissinText: string;
    addProductText: string;
    editProductText: string;
    title: string;
    titleReqiuerdText: string;
    codeReqiuerdText: string;
    description: string;
    descReqiuerdText: string;
    chooseStartDate: string;
    chooseFinishDate: string;
    dateReqiuerdText: string;
    dateMatchErrorText: string;
    edit: string;
    add: string;
    code: string;
    count:string;
    countReqiuerdText:string;
    countOverZeroText:string;
    unitPrice:string;
    unitPriceReqiuerdText:string;
}

export const APP_DI_CONFIG: AppConfig = {
    apiEndpoint: environment.apiUrl,
    addMissinText: environment.addMissinText,
    title: environment.title,
    code: environment.code,
    titleReqiuerdText: environment.titleReqiuerdText,
    description: environment.description,
    descReqiuerdText: environment.descReqiuerdText,
    chooseStartDate: environment.chooseStartDate,
    chooseFinishDate: environment.chooseFinishDate,
    dateReqiuerdText: environment.dateReqiuerdText,
    dateMatchErrorText: environment.dateMatchErrorText,
    edit: environment.edit,
    add: environment.add,
    addProductText: environment.addProductText,
    editProductText: environment.editProductText,
    codeReqiuerdText:environment.codeReqiuerdText,
    count:environment.count,
    countReqiuerdText:environment.countReqiuerdText,
    countOverZeroText:environment.titleReqiuerdText,
    unitPrice:environment.unitPrice,
    unitPriceReqiuerdText:environment.unitPriceReqiuerdText
};

@NgModule({
    providers: [{
        provide: APP_CONFIG,
        useValue: APP_DI_CONFIG
    }]
})
export class AppConfigModule { }
