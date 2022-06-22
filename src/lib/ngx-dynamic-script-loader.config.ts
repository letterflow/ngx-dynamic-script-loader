/**
 * @license
 * Copyright (c) Nelson Dominguez All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that
 * can found in the LICENSE file at the root of this project.
 */

 import {Injectable} from '@angular/core';

 /**
  * Interface representing properties used to load a remote JavaScript file.
  *
  * @publicApi
  */
 export interface NgxDynamicScript {
   /** An unique name for the script. */
   name: string;
 
   /** The script's URL to fetch. */
   src: string;
 }
 
 /**
  * Interface representing the underlying object used when attempting to load
  * a remote JavaScript module.
  *
  * @publicApi
  */
 export interface NgxDynamicScriptLoaded extends NgxDynamicScript {
   /**
    * Whether the script referred to is loaded.
    */
   loaded: boolean;
 
   /**
    * Whether the script referred to was already fetched from remote server.
    */
   fetched: boolean;
 
   /**
    * Whether the script referred to is loaded.
    */
   module?: Function | object;
 }
 
 /**
  * Options passed to {@link NgxDynamicScriptLoader#loadScript} method.
  *
  * @publicApi
  */
 export interface NgxDynamicScriptConfig {
   /**
    * Value for the `async` attribute of the target {@link HTMLScriptElement}.
    *
    * @default true
    */
   async: boolean;
   /**
    * Whether to throw an error when loading a {@link NgxDynamicScript} failed.
    * `true` for throwing an error; `false` for skipping throwing the error.
    *
    * @note
    * When this field is set to `true` using the {@link NgxDynamicScriptLoader#loadScripts} method,
    * and loading a single script fails, all other queued scripts are stopped from loading.
    *
    * @default true
    */
   skipError: boolean;
 
   /**
    * Whether to throw an error when loading a {@link NgxDynamicScript} failed.
    * `true` for throwing an error; `false` for skipping throwing the error.
    *
    * @note
    * When this field is set to `true` using the {@link NgxDynamicScriptLoader#loadScripts} method,
    * and loading a single script fails, all other queued scripts are stopped from loading.
    *
    * @default true
    */
   skipAbort: boolean;
 
   /**
    * Callback that fires when an error occures while loading the script.
    *
    * @default noop
    */
   onError(error: any): void;
 
   /**
    * Callback that fires when an error occures while loading the script.
    *
    * @default noop
    */
   onAbort(error: any): void;
 
   /**
    * Callback that fires when script reference was loaded successfully.
    *
    * @default noop
    */
   onLoad(script: NgxDynamicScriptLoaded): void;
 }
 
 function noop(...args: any[]): void {
   return undefined;
 }
 
 /**
  *
  * @publicApi
  */
 export interface NgxDynamicScriptRef extends NgxDynamicScript, Partial<NgxDynamicScriptConfig> {}
 
 export const NGX_DEFAULT_LOAD_SCRIPT_CONFIG: NgxDynamicScriptConfig = {
   async: true,
   skipError: true,
   skipAbort: true,
   onError: noop,
   onLoad: noop,
   onAbort: noop,
 };
 
 /**
  * Configuration service to
  *
  * @publicApi
  */
 @Injectable()
 export class NgxDynamicScriptLoaderConfig {
   /**
    * Value for the `async` attribute of the target {@link HTMLScriptElement}.
    *
    * @default true
    */
   async: boolean = NGX_DEFAULT_LOAD_SCRIPT_CONFIG.async;
 
   /**
    * Whether to throw an error when loading a {@link NgxDynamicScript} failed.
    * `true` for throwing an error; `false` for skipping throwing the error.
    *
    * @note
    * When this field is set to `true` using the {@link NgxDynamicScriptLoader#loadScripts} method,
    * and loading a single script fails, all other queued scripts are stopped from loading.
    *
    * @default true
    */
   skipError: boolean = NGX_DEFAULT_LOAD_SCRIPT_CONFIG.skipError;
 
   /**
    * Whether to throw an error when loading a {@link NgxDynamicScript} failed.
    * `true` for throwing an error; `false` for skipping throwing the error.
    *
    * @note
    * When this field is set to `true` using the {@link NgxDynamicScriptLoader#loadScripts} method,
    * and loading a single script fails, all other queued scripts are stopped from loading.
    *
    * @default true
    */
   skipAbort: boolean = NGX_DEFAULT_LOAD_SCRIPT_CONFIG.skipAbort;
 
   /**
    * Callback that fires when an error occures while loading the script.
    *
    * @default noop
    */
   onError: (reason: any) => void = NGX_DEFAULT_LOAD_SCRIPT_CONFIG.onError;
 
   /**
    * Callback that fires when canceling loading the script.
    *
    * @default noop
    */
   onAbort: (reason: any) => void = NGX_DEFAULT_LOAD_SCRIPT_CONFIG.onAbort;
 
   /**
    * Callback that fires when script reference was loaded successfully.
    *
    * @default noop
    */
   onLoad: (script: NgxDynamicScriptLoaded) => void = NGX_DEFAULT_LOAD_SCRIPT_CONFIG.onLoad;
 }
 