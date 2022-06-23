/**
 * @license
 * Copyright (c) Nelson Dominguez All Rights Reserved.
 *
 * Use of this source code is governed by a MIT-style license that
 * can found in the LICENSE file at the root of this project.
 */

 import {DOCUMENT} from '@angular/common';
 import {Inject, Injectable, Renderer2, RendererFactory2} from '@angular/core';
 import {forkJoin, Observable} from 'rxjs';
 import {
   NgxDynamicScriptLoaded,
   NgxDynamicScriptLoaderConfig,
   NgxDynamicScriptRef,
 } from './ngx-dynamic-script-loader.config';

 import {NgxDynamicScriptLoaderModule} from './ngx-dynamic-script-loader.module';

 /**
  * An Angular service to dynamically load and insert JavaScript modules into the DOM.
  * This service comes in handy in cases where a one wants to offset loading remote
  * JS modules from a CDN.
  *
  * @example
  * ...
  * ngOnInit() {
  *  const scriptRefs: ScriptRef[] = [
  *   {name: 'MyAwesomeScript', src: 'http://cdn.cloudflare.com/my-awesome-script.js'}
  *   {name: 'AnotherScript', src: 'http://cdn.cloudflare.com/another-script.js'}
  *  ];
  *
  *  // Load the first scriptRef
  *  this.dynamicScriptLoader
  *    .loadScript(scriptRefs[0])
  *    .subscribe((script) => {
  *      console.log(script);
  *      // Output: {name: "MyAwesomeScript", module: function () {}}
  *    });
  *
  *
  *  // Load both script refs
  *  this.dynamicScriptLoader
  *    .loadScript(...scriptRefs)
  *    .subscribe((scripts) => {
  *      console.log(scripts)
  *      // Output: [{name: "MyAwesomeScript", module: function() {}}, {name: "AnotherScript", module: function() {}}]
  *    })
  * }
  *
  *
  * @publicApi
  */
 @Injectable({providedIn: NgxDynamicScriptLoaderModule})
 export class NgxDynamicScriptLoader {
   private readonly renderer2: Renderer2;
   private readonly scripts: Map<string, NgxDynamicScriptLoaded> = new Map();

   /**
    * Initializes an Angular service that provides methods to fetch remote JS script files.
    *
    * @param {RendererFactory2} renderer2Factory Factory to create a custom render.
    * @param {Document} doc Main renderering context.
    */
   constructor(
     renderer2Factory: RendererFactory2,
     private readonly config: NgxDynamicScriptLoaderConfig,
     @Inject(DOCUMENT) private doc: Document
   ) {
     this.renderer2 = renderer2Factory.createRenderer(doc, null);
   }

   /**
    * Load a list of {@link NgxScriptRef} objects.
    * @param scriptRefs A list of script references to fetch.
    * @returns {Observable<NgxScriptLoaded[]>} An observable stream that when subscribed to emits
    *  the loaded script references.
    */
   loadScripts(...scriptRefs: NgxDynamicScriptRef[]): Observable<NgxDynamicScriptLoaded[]> {
     const scriptRefs$ = scriptRefs.map((scriptRef) => this.loadScript(scriptRef));
     return forkJoin<NgxDynamicScriptLoaded[]>(scriptRefs$);
   }

   /**
    * Load a single {@link NgxScriptRef} object.
    * @param {NgxScriptRef} scriptRef Options to customize the script loading process.
    * @returns {Observable<NgxScriptLoaded>} Observable that when subscribed to emits the script object.
    */
   loadScript(scriptRef: NgxDynamicScriptRef): Observable<NgxDynamicScriptLoaded> {
     return new Observable<NgxDynamicScriptLoaded>((subscriber) => {
       const {name, src, ...scriptRefConfig} = scriptRef;
       const {async, skipError, skipAbort, onLoad, onAbort, onError} = {...this.config, ...scriptRefConfig};

       if (this.isLoaded(name)) {
         // The script reference was already fetched from the remote url.
         // We can already next the observable with the script ref object
         // complete the stream.
         const script = this.get(name) ?? this.get(src);
         subscriber.next(script);
         subscriber.complete();
       }

       const onLoadCallback = (evt: Event) => {
         const module = window != null ? self[name as any] : undefined;
         const result: NgxDynamicScriptLoaded = {fetched: true, loaded: true, name, src, module};

         // Trigger provided `onLoad` callback.
         onLoad(result);

         this.scripts.set(name, result);
         subscriber.next(result);
         subscriber.complete();
       };

       const onAbortCallback = (reason: unknown) => {
         if (skipAbort === true) {
           // The user prefers to let the script fail silently `onabort` event.
           const result: NgxDynamicScriptLoaded = {fetched: true, loaded: false, name, src};
           subscriber.next(result);
           subscriber.complete();
         } else {
           // Trigger provided `onAbort` callback.
           onAbort(reason);
           subscriber.error(reason);
         }
       };

       const onErrorCallback = (reason: unknown) => {
         if (skipError === true) {
           const result: NgxDynamicScriptLoaded = {fetched: true, loaded: false, name, src};
           subscriber.next(result);
           subscriber.complete();
         } else {
           // Trigger provided `onError` callback.
           onError(reason);
           subscriber.error(reason);
         }
       };

       const script = this.createScriptElement(src, async);
       script.onload = onLoadCallback;
       script.onabort = onAbortCallback;
       script.onerror = onErrorCallback;
       this.appendScript(script);
     });
   }

   /**
    * Gets the {@link NgxDynamicScriptLoaded} by provided name if it exists - returns undefined otherwise.
    * @param {string} name The script's name to find.
    * @returns {NgxDynamicScriptLoaded | undefined} The script object if it exists, undefined otherwise.
    */
   get(name: string): NgxDynamicScriptLoaded | undefined {
     return this.scripts.get(name);
   }

   /**
    * Verify whether a script was already fetched and/or loaded from a remote server.
    * @param {string} name The name or url of the script to check.
    * @returns {boolean} Whether the script exists and the `loaded` property is set to true.
    */
   isLoaded(name: string): boolean {
     if (!this.exists(name)) return false;
     const script = this.get(name)!;
     return script.loaded === true;
   }

   /**
    * Verify whether a script by provided name exists.
    * @param {string} name The script's name to check.
    * @returns {boolean} Whether script by provided name exist.
    */
   exists(name: string): boolean {
     return this.scripts.has(name);
   }

   private appendScript(script: HTMLScriptElement): HTMLScriptElement {
     return this.doc.getElementsByTagName('head')[0].appendChild(script);
   }

   private createScriptElement(src: string, async = true): HTMLScriptElement {
     const script = this.renderer2.createElement('script') as HTMLScriptElement;
     script.type = 'text/javascript';
     script.src = src;
     script.async = async;
     return script;
   }
 }
