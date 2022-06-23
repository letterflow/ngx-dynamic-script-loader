# NgxDynamicScriptLoader

Small Angular library to dynamically load and inject remote JS scripts into the DOM on-demand.

## **Install**

Using **yarn**:

```bash
yarn add @letterflow/ngx-dynamic-script-loader
```

Using **npm**:

```bash
npm install --save @letterflow/ngx-dynamic-script-loader
```

## **Usage**

### Using the library with default configuration:

```ts
import {NgxDynamicScriptLoaderModule} from '@letterflow/ngx-dynamic-script-loader';

@NgModule({
  imports: [..., NgxDynamicScriptLoaderModule]
})
export class ExampleModule {}
```

### Using the library with custom configuration:

```ts
import {NgxDynamicScriptLoaderModule} from '@letterflow/ngx-dynamic-script-loader';

@NgModule({
  imports: [
    ...,
    NgxDynamicScriptLoaderModule.withConfig({
      async: false,
      skipError: false,
    })
  ]
})
export class ExampleModule {}
```

### Providing configuration using `NgxDynamicScriptLoaderConfig` InjectionToken:

```ts
import {
  NgxDynamicScriptLoaderModule,
  NgxDynamicScriptLoaderConfig,
} from "@letterflow/ngx-dynamic-script-loader";

@NgModule({
  imports: [NgxDynamicScriptLoaderModule],
  providers: [
    {
      provide: NgxDynamicScriptLoaderConfig,
      useValue: {
        async: false,
        skipAbort: false,
        skipError: false,
        onLoad(script) {
          console.log(script);
        },
      },
    },
  ],
})
export class ExampleFeatureModule {}
```

## **Configuration**

When calling `NgxDynamicScriptLoader#loadScript`, configuration provided in the methods argument,
will be merged with the current value provided by the `NgxDynamicScriptLoaderConfig` InjectionToken.

Here is a list of possible configuration fields in `NgxDynamicScripLoaderConfig`:

- **async**: _boolean_

  Value to use for the _async_ attribute in the injected HTMLScriptElement.
  Defaults to `true`.

- **skipAbort**: _boolean_

  Whether to throw an error when the `onabort` event fires on the HTMLScriptElement.

- **skipError**: _boolean_

  Whether to throw an error when the `onerror` event fires on the HTMLScriptElement.
  Note: When loading a list of scripts and this field is set to _true_, all subsequent scripts will not be loaded.

- **onLoad**: (reason) => void

  Callback that fires when the `onload` event occures.

- **onAbort**: (reason) => void

  Callback that fires when the `onabort` event occures.

- **onError**: (reason) => void

  Callback that fires when the `onerror` event occures.
