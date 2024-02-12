/**
 * @license
 * Copyright (c) Nelson Dominguez All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that
 * can found in the LICENSE file at the root of this project.
 */

 import {ModuleWithProviders, NgModule} from '@angular/core';
 import {
   NgxDynamicScriptLoaderConfig,
   NGX_DEFAULT_LOAD_SCRIPT_CONFIG,
 } from './ngx-dynamic-script-loader.config';

 /**
  *
  * @publicApi
  */
 @NgModule({
   providers: [NgxDynamicScriptLoaderConfig],
 })
 export class NgxDynamicScriptLoaderModule {
   static withConfig(
     options: Partial<NgxDynamicScriptLoaderConfig>
   ): ModuleWithProviders<NgxDynamicScriptLoaderModule> {
     return {
       ngModule: NgxDynamicScriptLoaderModule,
       providers: [
         {
           provide: NgxDynamicScriptLoaderConfig,
           useValue: {...NGX_DEFAULT_LOAD_SCRIPT_CONFIG, ...options},
         },
       ],
     };
   }
 }
