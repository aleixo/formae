import { ReactElement } from 'react';
import { ICustomValidationValue } from './apis/validations';
import { EEVents, TEventInformation } from './events';
export type { TEventsKeys, TObserverData } from 'core/events/events.types';

export type TScopeNamespaces = 'global' | 'api' | 'hooks' | 'fields' | 'configs';

export type TSetGlobalScope = {
  namespace: TScopeNamespaces;
  key?: string;
  data: any;
  merge?: boolean;
};
export type TScope = {
  global?: any;
  api?: any;
  hooks?: any;
  configs?: any;
  fields?: any;
};

export type TMapper = Record<string, Record<string, unknown>>;

export type TMaskGeneric = {
  to: number;
  from: number;
  mask: string;
}[];

type TCurrencyMask = {
  locale: string;
  currency: string;
};

export type TComponentMasks = {
  generic?: TMaskGeneric;
  cardNumber?: boolean;
  hideCardNumber?: boolean;
  cardMask?: boolean;
  cardDate?: boolean;
  currencyMask?: TCurrencyMask;
  feinMask?: boolean;
  replaceAll?: string | number;
};

type TFormMessages = Record<string, { name: string; value?: any; values?: string[]; required?: boolean }>;

export type TChildRefActions = {
  fieldHasError(errors?: TErrors): boolean;
  value(): TFormData;
  validate(errors?: TErrors): boolean;
  fieldValidationsHaveError(setErrorMessages?: boolean): boolean;
  setFieldData(value: TField): void;
  component: TComponent;
  rehydrate(component: TComponent): void;
};

export type TProvider = {
  children?: ReactElement | ReactElement[] | string;
  mapper: TMapper;
  propsMapping: Record<string, Record<string, unknown>>;
};
export type TChildrenOptions = {
  childrenScope?: string[];
  blurredChildren?: string[];
  changedChildren?: string[];
  scopeBlurredChildren?: boolean;
  scopeChangedChildren?: boolean;
};

export type TContext = {
  mapper: TMapper;
  propsMapping: Record<string, Record<string, unknown>>;
};

export type TFieldData = Record<string, TField>;

export type TChildWrapperProps = {
  children: ReactElement;
  component: TComponent;
  wrapper: new () => React.Component;
  propsMapping: Record<string, string>;
  onMount(values: TField): void;
  onChange(values: TField): void;
  onBlur?(values: TField): void;
  errors?: TErrors;
  value?: string;
  visible?: boolean;
  formId: string;
};

export type TFormRefActions = {
  submit(): void;
  stepForward(): TFormValues;
  stepBack(): TFormValues;
  validateForm(opts?: TChildrenOptions): Promise<TFormValues>;
  values(opts: Pick<TChildrenOptions, 'scopeBlurredChildren' | 'scopeChangedChildren' | 'childrenScope'>): TFormValues;
};

export type THookPayload = {
  setScope(data: TSetGlobalScope): void;
};

export type THookFunction = (formData: TFormValues) => Record<string, unknown>;

export type THooks = {
  preMount?: () => Record<string, unknown>;
  preUnmount?: () => Record<string, unknown>;
  preSubmit?: (formData: TFormValues) => Record<string, unknown>;
  posSubmit?: (formData: TFormValues) => Record<string, unknown>;
};

export type Obj = { [key in string]: Obj };
export type TIVars = Record<string, unknown>;
export enum TAvailableHooks {
  'preMount' = 'preMount',
  'preUnmount' = 'preUnmount',
  'preSubmit' = 'preSubmit',
  'postSubmit' = 'postSubmit',
}
export type TField = {
  value?: string | number | boolean;
  errors?: TErrors;
  visible?: boolean;
  failedErrorMessages?: string[];
  mask?: string;
  changed?: boolean;
  blured?: boolean;
  focused?: boolean;
  name: string;
  mounted: boolean;
  metadata?: any;
  schemaLocation?: {
    step: number;
    depth: number;
    index: number;
  };
};

export type TFormData = {
  value: string;
  errors: Record<string, TErrors>;
  visible: boolean;
};

type TPathError = Omit<TSchemaValidation, 'path'> & {
  path?: string;
  paths?: string[];
  preventUnMountValidation?: boolean;
};

export type TValidationDateFormats = 'MMDDYYYY' | 'DDMMYYYY' | 'YYYYMMDD' | 'YYYYDDMM' | 'timestamp';
export type TValidationDateOperators = '<' | '>' | '===' | '>=' | '<=' | '!==';

export type TVAvailableValidations = {
  /**
   * Validation based on conditions
   *
   * @example - Compare own field to two. Origin and target default to field value
   * ```
   * conditions: {
      rule: 'and',
      set: [
        {
          condition: '===',
          target: '2',
        },
        {
          origin: '2',
          condition: '===',
        },
      ],
    },
   * ```
   * @example - Binded to Postcode field value. Must be greater than or equal two
   * ```
   * conditions: {
      rule: 'or',
      set: [
        {
          origin: '${fields.postcode.value}',
          condition: '>',
          target: '2',
        },
        {
          origin: '${fields.postcode.value}',
          condition: '===',
          target: '2',
        },
      ],
    },
   * ```
   * @example - Binded to Postcode field value. Must be equal to two
   * ```
   * conditions: {
      rule: 'or',
      set: [
        {
          origin: '${fields.postcode.value}',
          condition: '===',
          target: '2',
        },
      ],
    },
   * ```
   */
  conditions?: {
    rule: 'and' | 'or';
    set: {
      forceDefinedOrigin?: boolean;
      forceDefinedTarget?: boolean;
      origin?: string | number | boolean;
      condition: TValidationDateOperators;
      target?: string | number | boolean;
    }[];
  };
  /**
   * Dates validations
   *
   * @example - Dates should be different
   * ```
   * date: {
      operator: '!==',
      origin: {
        format: 'DDMMYYYY',
      },
      target: {
        format: 'DDMMYYYY',
        value: '10/10/2001',
      },
    },
   * ```
   * 
   * @example - Compare only valid dates using intervals
   * ```
   *  date: {
   *    onlyValidDate: true,
   *    operator: '<',
   *    origin: {
   *      format: 'DD/MM/YYYY',
   *      intervals: {
   *        years: 1,
   *      },
   *    },
   *  },
   *  ```
   *
   * @example - Should have at max 85 years
   * ```
   * {
        operator: '>',
        origin: {
          format: 'DDMMYYYY',
          value: eightyFiveYearsDate,
          intervals: {
            years: 85,
          },
        },
      }
   * }
   *
   * ```
   */
  date?: {
    /**
     * Flag to force only valid dates. Valid dates must be of min length of 8
     */
    onlyValidDate?: boolean;
    /**
     * List of operations you can do
     * - between origin and target dates
     * - Betweeen origin and intervals
     */
    operator: TValidationDateOperators;
    /**
     *  The origin configurations
     */
    origin: {
      /**
       * Origin date value
       */
      value?: string | number;
      /**
       * The available date formats
       */
      format: TValidationDateFormats;
      /**
       * Intervals to compare with the original date.
       *
       * It will use todays date for comparison.
       *
       * @example
       *
       * origin date = 10/10/2022
       * interval.year = 1
       * operator = '==='
       *
       * It will compare (10/10/2022 + 1) with the current date and check if they are the same
       */
      intervals?: {
        years?: number;
        months?: number;
        days?: number;
      };
    };
    target?: {
      value: string | number;
      format: TValidationDateFormats;
    };
  };
  /**
   * Allow to define a maximum length for the input to have no error
   */
  length?: number;
  /**
   * Will look into the input length and send an error if if not greater than this value
   */
  greaterThan?: number | string;
  regex?: string;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  onlyLetters?: boolean;
  value?: string | number | boolean;
  notEmpty?: boolean;
  callback?(value: string | number): { fail: boolean; errorMessage?: string };
  numericRange?: { start: number | string; end: number | string };
  isNumber?: boolean;
  hasNoExtraSpaces?: boolean;
  email?: boolean;
  lessThan?: number | string;
  sequentialNumber?: boolean;
  repeatedNumbers?: boolean;
  url?: boolean;
  path?: TPathError;
  isCreditCard?: string[];
  isCreditCardAndLength?: string[];
  isCreditCodeMatch?: { numberCard: string; availableOptions: string[] };
  customValidation?: ICustomValidationValue[];
  notAllowSpaces?: true;
  isInTheList?: string[] | number[] | string;
  fields?: {
    rule: 'every';
    set: {
      bind: string;
      fieldName: string;
      validations: Omit<TVAvailableValidations, 'fields'>;
    }[];
  };
};

export type TGenericValidationRule = {
  [key: string]: TVAvailableValidations;
};

export type TSchemaValidation = TVAvailableValidations | TGenericValidationRule;

export type TStepData = {
  navigated: boolean;
  index: number;
  data: Record<number, Pick<TFormValues, 'fields' | 'erroredFields' | 'formatted' | 'filteredFields'>>;
  currentStepSchema?: TComponent;
  isValid: boolean;
  numSteps?: number;
};

export type TFormValues = {
  predictableErroredFields: string[];
  erroredFields: string[];
  fields: TFieldData;
  formatted: Record<string, unknown>;
  filteredFields?: Record<string, unknown>;
  form: {
    steps: TStepData;
    isValid: boolean;
    messages: string[];
    scope: TScope;
  };
};

export type TError = {
  value: unknown;
  message?: string;
  fail: boolean;
};

export type TErrors = Record<string, TError> | undefined;

// TODO - object with the available errors has props
export type TErrorMessages = Record<string, string>;

export type TSchemaValidations = TSchemaHandler<TSchemaValidation>;

export type TOptions = {
  id: string;
  label: string;
  value: string;
};

type TSchemaHandler<T> = Partial<
  Record<
    | EEVents.ON_FIELD_REHYDRATE
    | EEVents.ON_FIELD_CHANGE
    | EEVents.ON_FIELD_BLUR
    | EEVents.ON_FIELD_MOUNT
    | EEVents.ON_FIELD_FOCUS,
    T
  >
>;

export type TSchemaRehydrate = {
  validations: TSchemaValidation;
  fields: string[];
}[];

export type TSchemaVisibilityConditions = {
  /**
   * The validations that will say if the target field will be visible or not
   *
   * Those validations will run against your field (the one that has this directive)
   */
  validations: TSchemaValidation;
  /**
   * Target field that will have the visibility toggled
   */
  fieldName?: string;
  /**
   * Target fields that will have the visibility toggled
   */
  fieldNames?: string[];
}[];

export type TSchemaClearFields = {
  /**
   * Validations to run for the target field
   */
  validations?: TSchemaValidation;
  /**
   * target fields that will be used in the validation specified
   */
  fields: string[];
  /**
   * The cleared values on the fields in case they do no pass the validation
   */
  clearedValue: string | number | boolean;
}[];

export type TSchemaApi = {
  /**
   * Specify a debounce time in miliseconds for your call
   */
  debounceTime?: number;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH';
  url: string;
  headers?: HeadersInit | undefined;
  body?: Record<string, any>;
  scope?: string;
  blockRequestWhenInvalid?: boolean;
  preConditions?: TSchemaValidation;
}[];

export type TSchemaMasks = { cleanMask?: boolean } & TComponentMasks;

export type TEventReducedSchema = {
  api: TSchemaApi;
  clearFields: TSchemaClearFields;
  /**
   *
   * @deprecated - Rehydrate can be accomplished with template binding (eg: ${targetvalue})
   */
  rehydrate: TSchemaRehydrate;
  formatters: TSchemaFormatters;
  masks: TSchemaMasks;
  validations: TSchemaValidation;
  visibilityConditions: TSchemaVisibilityConditions;
};

export type TComponent = {
  /**
   * This name will be used latter to corelate the field with the value and you will be able to read it
   *
   * You can also mount here complex objects like
   *
   * name={a.b.c}
   *
   * that will result in
   * a: {
   *  b: {
   *    c: 'field_value'
   *  }
   * }
   */
  name: string;
  /**
   * A component name that should map to the one you gave in the from mappings
   *
   * @example - For React
   * ```
   *  const mappings: TMapper = {
   *     input: { component: Input },
   *     formGroup: { component: FormGroup },
   *   };
   * ```
   *
   * The component name for the Input element will be "input" ending up like
   * ```
   * {
   *  component: 'input'
   * }
   * ```
   */
  component: string;
  /**
   * You can attach metadata to your component that will be forwarded to you after on your frontend
   * callback methods link `onData`, `onBlur` etc
   */
  metadata?: Record<string, any>;
  /**
   * This property allows you to specify a virtual fieldName that can be in several fields
   *
   * USAGE - You have two fields but you want to have the value stored only under one name
   *
   */
  group?: string;
  wrapper?: new () => React.Component;
  children?: TComponent[];
  /**
   * Field error messages in case any validation fails
   *
   * @example - Set a default error message for all the validations
   *
   * ```
   * {
   *  errorMessages: {
   *    default: 'default error message'
   *  }
   * }
   * ```
   *
   * @example - Set error message for a given validation
   *
   * ```
   * {
   *  validations: {
   *    ON_FIELD_CHANGE: {
   *      required: true
   *    }
   *  },
   *  errorMessages: {
   *    required: 'This field is required'
   *  }
   * }
   * ```
   *
   */
  errorMessages?: TErrorMessages;
  type?: 'text' | 'number' | string;
  /**
   * Allow you to set a initial state for this field
   */
  state?: {
    /**
     * Hide the field
     */
    hidden?: boolean;
  };
  /**
   * This key lets you inject props directly into the component
   */
  props?: Record<string, unknown>;
  /**
   * Setup validations to be used in the field.
   *
   * You can setup validations in several life-cycle methods
   * 
   * @example - Required validation
   * ```
   * validations: {
        ON_FIELD_CHANGE: {
          required: true,
        },
      },
   * ```
   */
  validations?: TSchemaHandler<Pick<TEventReducedSchema, 'validations'>['validations']>;
  filter?: Pick<TEventReducedSchema, 'validations'>['validations'];
  /**
   * @deprecated - Use data binding instead
   */
  rehydrate?: TSchemaHandler<Pick<TEventReducedSchema, 'rehydrate'>['rehydrate']>;
  /**
   * Allows you to specify the conditions a given field will be visible
   * what will run when this field meets the specified life-cycle
   */
  visibilityConditions?: TSchemaHandler<Pick<TEventReducedSchema, 'visibilityConditions'>['visibilityConditions']>;
  /**
   * Will clear target fields in case they do not pass with the specified validations
   */
  clearFields?: TSchemaHandler<Pick<TEventReducedSchema, 'clearFields'>['clearFields']>;
  api?: TSchemaHandler<Pick<TEventReducedSchema, 'api'>['api']>;
  masks?: Partial<
    Record<
      EEVents.ON_FIELD_BLUR | EEVents.ON_FIELD_MOUNT | EEVents.ON_FIELD_FOCUS,
      Pick<TEventReducedSchema, 'masks'>['masks']
    >
  >;
  formatters?: TSchemaHandler<Pick<TEventReducedSchema, 'formatters'>['formatters']>;
};

export type TStep = {
  component: string;
  name: string;
  children: TComponent[];
  props?: Record<string, string>;
};

export type TComponentPropsMapping = {
  getValue?: string;
  setValue?: string;
  setErrorMessage?: string;
  setErrorState?: boolean;
  onBlur?: string;
};

export type TPropsMapping = Record<string, TComponentPropsMapping>;

export type TSchema = {
  /**
   * Give some configurations to the form
   */
  configs?: TConfigs;
  /**
   * Allows you to expose some messages to the outside world when something happen
   */
  messages?: TFormMessages;
  /**
   * Specify some static field defaults before rendereing the form.
   *
   * If you have initialValues in the frontend setted, those will ovewride this
   */
  formattedDataDefaults?: Record<string, unknown>;
  /**
   * Form level props mapping
   */
  propsMapping?: TPropsMapping;
  /**
   * Entry point for the form should be a step (even if you have only one)
   */
  components: TStep[];
  /**
   * You can have many fields in the form, but be interested only in some
   *
   * You can put here the fields you want to read onSubmit for example
   *
   * You will receive those in TFormValues.filteredFields
   */
  filteredFields?: string[];
  /**
   * Schema level iVars.
   *
   * These iVars will go to the global scope namespace
   */
  iVars?: TIVars;
};

export type TSplitterFormatterValue = {
  value: string;
  position: number;
}[];

export type TSchemaFormatters = {
  splitter?: TSplitterFormatterValue;
  capitalize?: boolean;
  upperCase?: boolean;
  gapsCreditCard?: string[];
};

export type TConfigs = {
  observables?: { templates?: { exclude?: string[] } };
};

export type TFlowType = {
  [x: string]: {
    events: (component?: TComponent) => EEVents[];
    handler: (args: TEventInformation) => void;
  }[];
};
