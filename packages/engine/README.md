# Form Engine - Low code forms

Achieve form logic reusage with forms expressed in json format.


1. [Basic setup](#basic-setup)
2. [Step by step](#step-by-step)
3. [Form Features](#available-features)
      1. [Validations - Allow form to run validations in the field](#validations)
          1. [Named Validations](#validations)
          2. [Error Messages](#validations)
          3. [Available Validations](#validations)
      2. [Filters - Allow only what you want in the field](#filters)
          1. [Available formatters](#formatters)
      3. [Formatters - Style your field value with formatters](#formatters)
      4. [Masks - Modify the field value, while maintaining the original with masks](#masks)
          1. [Available Masks](#formatters)
      5. [Visibility conditions - Configure when to show hide/components](#visibility-conditions)
      6. [Clear fields](#clear-fields)
      7. [Api - Make api calls on certain form events](#api)
      8. [Data binding - Allow to have dynamic data in the form, binding and subscribing to form changes](#data-binding)
          1. [Scopes](#scope)
          1. [Templates](#templates)
          2. [varOps](#varops)
      9. [State - Define component state](#state)
      11. [Group](#group)
4. [React](#react-components)
      1. [FormProvider - Provider to configure the form with component mappings](#react-formprovider)
      2. [Form - Component to render a form based on a schema and listen to some events](#react-form)
      3. [useForm hook- Allo to connect to any form in the page](#react-useform)
      4. [asFormField HOC- Leverage form features but keep the control of your component](#react-asFormField-HOC)


# Basic setup

Serve your forms in JSON to your frontend, and allow it to be agnostic of your forms logic.

3 simple steps
1. Map your components to the form (Section - Build your mappers)
2. Build json schema
3. Use it 
  


**1. BUILD MAPPERS**
```javascript
import Input from 'Components/Input';
import Other from 'Components/Other';

const Mappings = {
  input: { component: Input },
  other: { component: Other },
};

const formBuilderPropsMapping = {
  //default prop names
  __default__: {
    getValue: 'onChange',
    setValue: 'value',
  },
  //component specific prop names
  other: {
    getValue: 'onChangeCallback',
    setValue: 'data',
    setErrorMessage: 'errorMessageArray',
    onBlur: 'onBlurCallback',
    onFocus: 'onFocusCallback',
  },
};

export { Mappings, formBuilderPropsMapping };
```

**2. BUILD SCHEMA**
```json
{
  "components": [
    {
      "component": "",
      "name": "",
      "children": [
        {
          "component": "${componentName}",
          "name": "${componentFormName}",
          "props": {
            "fullWidth": true,
          },
        },
      ],
    },
  ],
};
```
**USE IT (React version)**
```javascript
import { Mappings, formBuilderPropsMapping } from './my-component-mappings'
import { getFormSchema } from './my-api-wrapper'
...
const schema = useMemo(() => getFormSchema('myInstanceContext'), [])

...
<Form mappings={Mappings} propsMappings={formBuilderPropsMapping} schema={schema}>
```

Nexts steps ? Checkout what you can do in the storybook with `npm run storybook` or see the best effort readme :( 
# Step by step

## Build your mappers

The form uses mappings to connect to UI components so that its easy to connect to any set of components.

You can build your own mappings file or you can use the `bolttech` and if you want extend it with your set of components.

In the mappings file you need to specify the component definition and a name to refer in the JSON's latter, and how the form will connect to component props.

See this example

```javascript
import Input from '@bit/bolttech.components.ui.input';
import Checkbox from '@bit/bolttech.components.ui.checkbox';
import FormGroup from '@bit/bolttech.components.common.form-group';

const Mappings = {
  input: { component: Input },
  checkbox: { component: Checkbox },
  formGroup: { component: FormGroup },
};

const formBuilderPropsMapping = {
  input: {
    getValue: 'onChange',
    setValue: 'value',
    setErrorMessage: 'errorMessage',
    onBlur: 'onBlur',
    onFocus: 'onFocus',
  },
  checkbox: {
    getValue: 'onChange',
    setValue: 'checked',
  },
};

export { Mappings, formBuilderPropsMapping };
```

Here you say to the form that you can use in your JSON the names `input`, `checkbox` and `formGroup` and you tell the form how to get the props it needs from them.

If you have lots of components with the same prop names, you can, and should use `__default__` key. This key allows to reuse prop names.

Lets say 10 components use to `value` prop name to set the component value, and `onChange` prop name to expose value. You van set your mapper the following way

```javascript
import Input from '@bit/bolttech.components.ui.input';
import Checkbox from '@bit/bolttech.components.ui.checkbox';

const Mappings = {
  input: { component: Input },
  checkbox: { component: Checkbox },
};

const formBuilderPropsMapping = {
  __default____: {
    getValue: 'onChange',
    setValue: 'value',
  },
  checkbox: {
    getValue: 'onChange',
    setValue: 'checked',
  },
};

export { Mappings, formBuilderPropsMapping };
```


## Setup Form provider

After setting your own mappings you encapsulate your app of your form with the provider

```javascript
<FormProvider mapper={Mappings} propsMapping={formBuilderPropsMapping}>
  {children}
</FormProvider>
```

**DONE. NOW build your forms**



# Available Features


Inside the schema you can specify several actions for a field alone or that correlate and have side-effects between them.

Those actions support support multiple lifecycle and this must be on an action item basis:
- ON_FIELD_MOUNT
- ON_FIELD_CHANGE
- ON_FIELD_BLUR
- ON_FIELD_FOCUS

All the actions are typed, so you will have help here seeing which lifecycles you have available

Per action, you will be able to combine multiple lifecycle methods

All the following features can be inserted in the same location on the schema

```json
{
  "component": "input",
  "name": "fieldName",
  "props": {
    "label": "My field",
  },
  //...your feature goes here
},
```

## Validations

Like the name say, this feature lets you validate the form in the several lifecycle events of the form.

```json
"validations": {
  "ON_FIELD_BLUR": {
    "email": true,
  },
  "ON_FIELD_CHANGE": {
    "required": true,
  },
},
```

The above example will let form know that in each change the field must have something in it, and that on blur, the value must be a email.

### Named validations
There are cases where you want to build your own validation, agregating several of giving it a specific name that you can refer later

```json
"validations": {
  "ON_FIELD_BLUR": {
    "blurRequire": {
      "require": true
    }
  },
  "ON_FIELD_CHANGE": {
    "email": true,
    "changeRequire": {
      "require": true
    },
    "changeRestOfValidations": {
      "length": 50,
      //...
    }
  },
},
```

### Error Messages
You can also specify the error messages you want.

```json
"validations": {
  "ON_FIELD_BLUR": {
    "require": true
  },
  "ON_FIELD_CHANGE": {
    "email": true,
  },
},
"errorMessages": {
  "default": "Default error message",
  "email": "Invalid e-mail",
},
```

This schema part, will add messages to validations error.
- Each time the field has an e-mail error it will send the "Invalid e-mail" message to the component
- If there is and field error, but no message is specified, it will send what you have in `default` key. In this example, `required` error does not have message and will send "Default error message"

**With named validations**

If you have a named validation, you can use its name in the error messages, having better granularity on it.

```json
"validations": {
  "ON_FIELD_BLUR": {
    "blurRequire": {
      "require": true
    }
  },
  "ON_FIELD_CHANGE": {
    "email": true,
    "changeRequire": {
      "require": true
    },
    "changeRestOfValidations": {
      "length": 50,
      //...
    }
  },
},
"errorMessages": {
  "default": "Default error message",
  "email": "Invalid e-mail",
  "blurRequire": "When you blur, this component is required",
  "changeRequire": "You should not leave the field blank",
  "changeRestOfValidations": "You are changing into an incorrect state"
},
```



### Available validations (TBD)
Refer to the types on `TSchema`

## Formatters

Formatting a field means mutating the field value to a given... format.

This options will allow you to force a give field to have the format you whant while the user is performing some action on the form.

**NOTE** - When receiving the values of the form, you will have the value with the specified format, not the raw value the user entered

You have several formatters. THe following example shows splitter that is a more generic one, allowing you to split the input text

```json
"formatters": {
  "ON_FIELD_MOUNT": {
    "splitter": [
      {
        "position": 2,
        "value": "/",
      },
      {
        "position": 5,
        "value": "/",
      },
    ],
  },
}

```
The above example will split your word in position 2 and 5, adding there the `/`. This will give you a date format like `10/10/1987` (you would have to limit the input length. More on that on FILTERS)

### Available Formatters (TBD)
Refer to the types on `TSchema`

## Masks
Mask has the same functionality of formatter, but keed the original value for your program. Think of it like the password mask. You input something into your text input, mask that something with `*` but you need to read the original value. FOr Eg.

```json
"masks": {
  "ON_FIELD_BLUR": {
    "replaceAll": "*",
  },
  "ON_FIELD_FOCUS": {
    "cleanMask": true
  }
}
```

In this example, you will
- Mask a given text input from for example `123345` to `******`
- On Focus , you tell form to clean the mask with `cleanMask` directive.

### Available Masks (TBD)
Refer to the types on `TSchema`

## Filters

Filters very predictable and work like the word says, they filter a given word to a given patter/directive.

Lets say you want a field to accept only numbers and with a max length o X.

```json
"filter": {
  "length": 4,
  "isNumber": true
}
```

This example will let you do just that. Only numbers and max length of 4

### Available filters (TBS)
Refer to the types on `TSchema`

## Visibility conditions

Sometimes you want to hide other fields based on certain conditions.

That is what this feature does. 

Eg: You want to hide another field, when a given field `originalField` has a given value on it.

```json
{
  "name": "originalField",
  "component": "checkbox",
  "visibilityConditions": {
    "ON_FIELD_MOUNT": [
      {
        "validations": {
          "value": "Yes",
        },
        "fieldName": "targetField",
      },
    ],
    "ON_FIELD_CHANGE": [
      {
        "validations": {
          "value": "Yes",
        },
        "fieldName": "targetField",
      },
    ],
  },
  "props": {
    //...
  },
},
{
  "name": "targetField",
  "component": "input",
  "props": {
    //...
  }
}
```

This example tells form to
- On mount check if `originalField` has the value `Yes`
- If it put the `targetField` visible
- Ótherwise make it invisible

You can also for each visibility condition, apply it to multiple field names with `fieldNames` key that will accept an array.

```json
"visibilityConditions": {
  "ON_FIELD_MOUNT": [
    {
      "validations": {
        "value": "Yes",
      },
      "fieldNames": ["targetFieldOne", "targetFieldTwo"],
    },
  ]
},
```

**NOTE** - When the field is hidden using this feature, the form will not try to validate it and will not be accounted to the general form state

## Clear Fields

Guess what... THis will clear one or more form fields :)

Uses the same mechanism of VISIBILITY CONDITIONS.

Lets say you want to clear a given field when `originalField` has a given value.

```json
"clearFields": {
  "ON_FIELD_CHANGE": [
    {
      "validations": {
        "value": "Yes",
      },
      "field": "targetValue",
      "clearedValue": false,
    },
  ],
},
```

When form fires ON_CHANGE this will have the effect of having the field `targetValue` with the value `false` if `originalField` has value `Yes`.

Just like before, you can specify multiple fields with `fields` key for the same rule.
```json
"clearFields": {
  "ON_FIELD_CHANGE": [
    {
      "validations": {
        "value": "Yes",
      },
      "fields": ["targetValue"],
      "clearedValue": false,
    },
  ],
},
```

## Api
This one will let you instruct form to call a give API at a given lifecycle method

```json
"api": {
  "ON_FIELD_CHANGE": [
    {
      "blockRequestWhenInvalid": true,
      "method": "GET",
      "url": "https://api.chucknorris.io/jokes/random",
      "scope": "chuck",
    },
  ],
},
```
The above example will make form to call the API specified when the field where we gave the directory changes.

### Keys
| key                     | type    | Description                                                                                                                             |
|-------------------------|---------|-----------------------------------------------------------------------------------------------------------------------------------------|
| blockRequestWhenInvalid | boolean | Specify if this call  should be blocked when the field is invalid (due to validations)                                                  |
| method                  | string  | HTTP verb. Get, Post, Put or delete                                                                                                     |
| url                     | string  | The api url                                                                                                                             |
| scope                   | string  | This lets you put the api result inside the form scope in the given key. THis will allow to use the call result latter on on some field |
| body                    | object  | Body to send to the API                                                                                                                 |
| headers                 | object  | Api headers                                                                                                                             |
| debounceTime            | number  | Allow you to debounce the api call by X seconds                                                                                         |
| preConditions           | TValidations  | Allow you to specify validations that should not fail in order to call the API                                                    |

### PreConditions

You can specify the pre conditions that need to be met, in order for the request to start.

```json
api: {
  "ON_FIELD_CHANGE": [
    {
      "method": "GET",
      "url": "https://api.chucknorris.io/jokes/random",
      "scope": "chuck",
      "preConditions": {
        "required": true,
        "value": "run",
      },
    },
  ],
},
```

In the above example, the api specified will only be called
1. When field has changes
2. When field has values (required validation)
3. When the field value is "run"

## Data binding

Form has a functionality to allow you to build your logic inside the schema via templating. 

You can emit and register to data between fields. For example, in the following example field `one` will register to changes on field `two` and its label will have the field `two` value. This is accomplished with [scopes](#scope).  

```json
{
    "name": "one",
    "component": "input",
    "props": {
      "label": "${fields.two.value}",
  }
},
{
    "name": "one",
    "component": "input",
    "props": {
        //...
    }
},
```

The subscription is done using the template first keys. In this case `fields` and `two`. Telling the engine that anytime the namespace `fields` and key `two` changes it should fire a notification to anyone interested. In this case, field `one` is interested

### Scope
For templating to work, form relies on scope. The definition of scope is just a datastructure that has multiple keys each one with their context. The following table explain the namespaces

| namespace | description                                                                                                                                                                                  |
|-----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| global    | This namespace contains all the data that comes from the client implementing the Form and is injected in iVars                                                                               |
| fields    | Automatically generated scope. This namespace contains all the fields with everything that is done in them per field. Eg: value, errors, visible, mask etc. Refer to the types for more info |
| api       | This scope is where you can store the api responses with the api scope key.                                                                                                                  |
| hooks     | This one is retrieved by the hooks configured on the client                                                                                                                                  |
| configs   | All the configs that the client gave to the form, will be stored here                                                                                                                        |


Templating basically allows a given component to subscribe to any scope change, be notified and changed according to that. In the following example, the component named `make` is subscribed to `api` namespace on `data` key.

```json
{
    "name": "make",
    "component": "dropdown",
    "props": {
      "id": "make",
      "name": "make",
      "label": "Make",
      "placeholder": "",
      "options": "${api.makes.data||[]}",
  }
},
```

This means that, anytime that `api.makes.data` changes (done by api action with scope = data), this component will be injected with it's value on the `options` key. It also has a default value of empty array `...data||[]}`.

If you want you can even nested templating also. Next example we will access to `global` namespace on `name` key. But we will access the prop dynamically from the field named `myfield` value
```json
{
  "component": "input",
  "name": "destination",
  "props": {
    "name": "destination",
    "label": "Dynamic -> ${global.name.${fields.myfield.value||test}}",
  }
},
```
This will result in the following. Assume we have scope like

```json
  "global": {
    "name": {
      "test": "test",
      "other": "other"
    }
  },
```

It will access `global.name.test` since we have the default value as test and there is no data in fields scope. The end result would be *"Dynamic -> test"*

But right after input on the form field named `myfield`, its scope will be populated

```json
  "global": {
    "name": {
      "test": "test",
      "other": "other"
    }
  },
  "fields": {
    "myfield": {
      "value":"other"
      //...
    }
  }
```

In this case would access `global.name.other` and the final result would be *"Dynamic -> other"*

### Templates
We talked about templates, but lets go a step further. THe definition of template, is a just a string that has a given prefix and suffix like `${...}`. 

Whatever comes inside the delimiters will be later extracted by the engine and mapped with the current scope in order to find a replacement value.

The only limitation is that the template must be a string representing an objetct path. That object path will be looked for in the [scope](#scope) like `#{api.myapicall.response.data.value}`. 

**Default values**

You can set template default values with `||` like `${fields.foo.value||default-value}`. This will lead to, if the scope has value in `fields.foo` set the value in template value, otherwise set the string `default-value`

**Template nesting**

You can also nest multiple templates reaching extreme situations. For example

`${fields.${gloval.fieldname||foo}.value||novalue}`

This example will give you the following possible replacements:
- If `global.fieldname` exists and has value `bar` for example, and form `bar` field contains value lets say value 2 - Output will be 2
- If `global.fieldname` exists and has value `bar` for example, and form `bar` field does not contains value - Output will be novalue
- If `global.fieldname` does not exists , and form `foo` field does not contains value - Output will be novalue
- If `global.fieldname` does not exists , and form `foo` field  contains value lets say value 3 - Output will be 3

### VarOps

Templates are already a great power of form-engine, but we can go further allowing operations to be specified in the schema. Those operations are all under `varOps` (variable operations).

```json
{
  "component": "input",
  "name": "password",
  "errorMessages": {
    "required": "Password is required",
    "value": "Error value must be varOps.concatenate(${fields.email.value||0},${fields.email2.value||0})",
  },
  "validations": {
    "ON_FIELD_CHANGE": {
      "required": true,
      "value": "varOps.concatenate(${fields.email.value||0},${fields.email2.value||0})",
    },
  },
  "props": {
    "variants": "default_border",
    "placeholder": "Please enter your password",
    "label": "Password",
  },
},
```
In the example the validation value comes from a `varOps`. This example uses the `concatenate` operations exposed by the engine.

Here this field (`password`) will register with [templating](#templates) to field `email` and `email2`. Meaning, each time they change this field schema will be recomputed with what changed to replace the needed values.

When this happens, lets say `email` has value foo and `email2` value bar. The `varOp` contatenate will be called with the correct field replaced values

```javascript
varOps.concatenate("foo","bar")
```

This will map to a operation function and the function return value will be replaced by the varOps like

```json
  "validations": {
    "ON_FIELD_CHANGE": {
      "required": true,
      "value": "foo_bar",
    },
  },
```

Since we are already using [templates](#templates) to run our varOps and subscribe to changes, also the error message string subscribed to the operation result. In this example we would endup with the following messages.

```json
  "errorMessages": {
    "required": "Password is required",
    "value": "Error value must be foo_bar",
  },
```

PS: Dont's forget that we still have the default values provided with [templates](#templates) and the rules are the same 

#### Available VarOps
- concatenate(arg1,arg2)
- add(arg1,arg2)
- subtract(arg1,arg2)

## State

This key will allow you to setup some initial state on the field.

### hidden
Hidden prop on state, will turn your field visible or invisible
```json
{
  "state": {
    "hidden": true
  }
}
```

This will be reflected on the field scope.


## Rehydrate
**DEPRECATED, you can accomplish it with templating (previous section)**

It lets you rehydrate a given field
```json
{
  "rehydrate": {
    "ON_FIELD_CHANGE": [
      {
        "validations": {
          "required": true,
        },
        "fields": ["destination"],
      },
    ],
  },
  "component": "dropdown",
  "name": "originalField",
}
```

The api is pretty much like visibility conditions. The above example will rehydrate the `destination` field when field with the directive (*originalField*) meets the validations configured

## Group
In form we can correlate fields into a single field name. This is called the group functionality.

Say you have two checkboxes and whant the selected value. You can use `group` for that

```json
{
  "name": "checkOne",
  "group": "checkedGroup",
  "component": "checkbox",
  "props": {
    //...
  },
},
{
  "name": "checkTwo",
  "group": "checkedGroup",
  "component": "checkbox",
  "props": {
    //...
  }
}
```

This example will store the selected value of the checkbox in the `checkedGroup` and will then be send to the client.

# React Components
## React `<FormProvider />`

React context that lets you provide configuration information to your application forms

### Props
| Prop         | Type          | Description                                                   |
|--------------|---------------|---------------------------------------------------------------|
| mapper       | TMapper       | Allow you to map your own components to be used with the form |
| propsMapping | TPropsMapping | Map your component props names with the form functionalities  |
### Example
The following example shows a provider that will provide forms with input and Dropdown component

```javascript
import Input from 'Components/Input';
import Dropdown from 'Components/Dropdown';

const Mappings = {
  inputForm: { component: Input },
  dropdownForm: { component: Dropdown },
};

const propsMapping = {
  inputForm: {
    getValue: 'onChange',
    setValue: 'value',
  },
  dropdownForm: {
    getValue: 'onChangeCallback',
    setValue: 'data',
    setErrorMessage: 'errorMessageArray',
    onBlur: 'onBlurCallback',
    onFocus: 'onFocusCallback',
  },
};

const App = () => {
  return <FormProvider mapper={Mappings} propsMapping={propsMapping} />
}

```

You now can use in your [form](#react-form) the mapped components with names `inputForm` and `dropdownForm`.

Also note the data in `propsMapping`. There you can map up to five form functionalities per component

| Key             | Functionality                                                                                                      |
|-----------------|--------------------------------------------------------------------------------------------------------------------|
| getValue        | The name of your component prop that will give back the selected value.                                            |
| setValue        | Prop name that receives the value                                                                                  |
| setErrorMessage | Component prop name to receive an error message in case this field will have error and error message is configured |
| onBlur          | Prop name that is called when field is blured                                                                      |
| onFocus         | Prop name that is called when field is focused                                                                     |
You can also use default prop names for functionalities like:

```javascript
import Input from 'Components/Input';
import Dropdown from 'Components/Dropdown';

const Mappings = {
  inputForm: { component: Input },
  dropdownForm: { component: Dropdown },
};

const propsMapping = {
  __default__: {
    getValue: 'onChangeCallback',
    setValue: 'data',
    setErrorMessage: 'errorMessageArray',
    onBlur: 'onBlurCallback',
    onFocus: 'onFocusCallback',
  },
};

const App = () => {
  return <FormProvider mapper={Mappings} propsMapping={propsMapping} />
}

```

This will make form search for those names in all your components that do not have splicit mapping.

## React `<Form />`

After configuring the provider, `<Form />` components lets you render a form

### Props
| Prop                  | Type                                                                               | Description                                                                                                                   |
|-----------------------|------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| id                    | string                                                                             | Form identified. One will be generated as default if omitted                                                                  |
| hooks                 | THooks                                                                             | Provide functions to run on certain life-cycle events                                                                         |
| iVars                 | Object                                                                             | One object with internal variables to be used in form with data binding                                                       |
| initialValues         | Object                                                                             | Object with form initial values that will map to a field.                                                                     |
| Schema                | TSchema                                                                            | Form Schema                                                                                                                   |
| autoComplete          | string                                                                             | HTML autocomplete                                                                                                             |
| className             | string                                                                             | Allow to style form                                                                                                           |
| onSubmit              | callback(HTMLFormElement,TFormValues)                                              | Will be called when there is a submit action in the form                                                                      |
| onData                | callback(TFormValues,TComponent, TField)                                           | Will be called when any field data change. The arguments will let you know which field changed and the field configuration    |
| onBlur                | callback(TFormValues,TComponent, TField)                                           | Will be called when any field blured. The arguments will let you know which field blured and the field configuration          |
| onFocus               | callback(TFormValues,TComponent, TField)                                           | Will be called when any field focused change. The arguments will let you know which field focused and the field configuration |
| onFieldMount          | callback(TFormValues,TComponent, TField)                                           | Will be called when some field mounted. Its called with the field that information that mounted.                              |
| onStep                | callback(TFormValues)                                                              | Called when a form step changed                                                                                               |
| onLog                 | callback(TLoggingEvent)                                                            | Called on each log, if the logging is enabled                                                                                 |
| onScopeChange         | onScopeChange?(scope: TScope, namespace: string, key: string): void;               | Called everythime scope change with the changing information (namespace and key) and the changed scope                        |
| onFormRehydrate       | onFormRehydrate(values: TFormValues): void;                                        | This callback is called whenever some form was rehydrated                                                                     |
| onFieldRehydrate      | onFieldRehydrate?(values: TFormValues, component: TComponent, field: TField): void | This callback is called whenever some form field was rehydrated                                                               |
| renderLoading         | renderLoading?(): ReactElement;                                                    | Component to render while the schema has not rendered                                                                         |
| onFormMount           | onFormMount?(values: TFormValues): void;                                           | Called when the form finished mounted                                                                                         |
| formattedDataDefaults | Object                                                                             | Some default data to fields when they are undefined                                                                           |
| submitOnValidOnly     | boolean                                                                            | Boolean indicating if form can be submitted even if it is invalid
| renderFieldWrapper     | renderFieldWrapper(component: TComponent, children: ReactElement[])                                                                            | Function that allows to insert a wrapper in place of a component or wrapping the component               
### Example

A simple example of rendering a basic form
```javascript
<Form schema={schema} />
```

## React `useForm()`

Exposed hook that allows you to connect to any form by the formId in any part of the application, as long as you are inside the form context.

### Props

You can use the following arguments to tho hook

| Prop     | Type     | Description                               |
|----------|----------|-------------------------------------------|
| formId   | string   | The id of the form you want to connect to |
| onValid  | callback | Called whenever form validation changes   |
| onData   | callback | Called whenever data changes              |
| onSubmit | callback | Called whenever form is submitted         |

And it will provide you the following

| Prop     | Type     | Description                                                                                     |
|----------|----------|-------------------------------------------------------------------------------------------------|
| configs  | object   | One object with all the form configurations                                                     |
| submit   | function | Function that lets you call the submit on the form. After, the onSubmit callback will be called |
| formData | function | Lets you get the most up-to-date form date                                                      |

### Example

In the following example `useForm` hooks are used to connect to multiple forms that are inside other components.

```javascript
  const Comp = () => {
    const { submitForm: submitOne } = useForm({
      formId: 'id1'
      onData: (data) => {},
      onSubmit: () => {},
    });
    const { submitForm: submitTwo } = useForm({
      formId: 'id2'
      onData: (data) => {},
      onSubmit: () => {},
    });
    
    return (
      <>
        <button onClick={(() => submitOne())}>
        <button onClick={(() => submitTwo())}>
      </>
    )
  }

  const CompOne = () => {
    return (
      <Form id="id1" {...}/>
    )
  }

  const CompTwo = () => {
    return (
      <Form id="id2" {...} />
    )
  }
```