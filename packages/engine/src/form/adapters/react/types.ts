import { ReactElement } from 'react';
import {
  TComponent,
  TErrorMessages,
  TSchemaValidation,
  TSchemaValidations,
  TSchema,
  THooks,
  TIVars,
  TFormValues,
  TField,
  TChildrenOptions,
  TPropsMapping,
  TComponentPropsMapping,
  TScope,
} from 'core/types';
import { TLoggingEvent } from 'core/events/events.types';

type TFormProps = {
  /**
   * Allow to set the form as read only mode.
   *
   * This will prevent any interaction with the form whatsoever
   */
  disable?: boolean;
  /**
   * Hooks to run on some life-cycles
   */
  hooks?: THooks;
  /**
   * Form id. Will default to a internal one in case not given
   */
  id?: string;
  /**
   * Internal variables. This object will be used in the global scope
   * namespace
   */
  iVars?: TIVars;
  /**
   * Form initial values. This must map into form known fields
   */
  initialValues?: Record<string, unknown>;
  /**
   * Form schema that should contain form definition
   */
  schema?: TSchema;
  /**
   * HTML autocomplete form prop
   */
  autoComplete?: string;
  /**
   * ClassName in case you want to style form
   */
  className?: string;
  /**
   *
   * Callback function that will run on each submit.
   *
   * NOTE: By default this function only runs if the form has no errors. If you
   * want different behaviour, use submitOnValidOnly and set to false
   *
   * @param form - HTML original event
   * @param values - Form generated value. Refer to its type
   */
  onSubmit?(
    form: React.FormEvent<HTMLFormElement>,
    values: TFormValues,
  ): Promise<Record<string, unknown> | void> | Record<string, unknown> | void;
  /**
   *
   * Callback function that runs on each data change.
   *
   * You can who changed the data accessing to the arguments
   *
   * @param values - Form generated values
   * @param component - The component configuration of the field that changed
   * @param field - The current state of the changing field
   */
  onData?(values: TFormValues, component?: TComponent, field?: TField): void;
  /**
   *
   * Callback function that runs on each blur.
   *
   * You can what field was blurred accessing to the arguments
   *
   * @param values - Form generated values
   * @param component - The component configuration of the field that was blurred
   * @param field - The current state of the blurred field
   */
  onBlur?(values: TFormValues, component?: TComponent, field?: TField): void;
  /**
   *
   * Callback function that runs on each focus.
   *
   * You can what field was focused accessing to the arguments
   *
   * @param values - Form generated values
   * @param component - The component configuration of the field that was focused
   * @param field - The current state of the focused field
   */
  onFocus?(values: TFormValues, component?: TComponent, field?: TField): void;
  /**
   *
   * Callback that tells you when a given field was mounted
   *
   * @param values - Form generated values
   * @param component - The component configuration of the field that was mounted
   * @param field - The current state of the mounted field
   */
  onFieldMount?(values: TFormValues, component?: TComponent, field?: TField): void;
  /**
   *
   * This callback will be fired in each step change
   *
   * @param values - Form generated values
   */
  onStep?(values: TFormValues): void;
  /**
   * Enables you to see what is happening under the hood. Subscribing the callback will enable logging
   *
   * @param log - Logging event
   */
  onLog?(log: TLoggingEvent): void;
  /**
   *
   * Notifies you about each form scope change and about who changed it
   *
   * @param scope - Form current scope with the update
   * @param namespace - The namespace that was updated
   * @param key - The key responsible for the update
   */
  onScopeChange?(scope: TScope, namespace: string, key: string): void;
  /**
   *
   * When a given field is rehydrated, this callback will be called
   *
   * @param values - Form generated values
   * @param component - The component configuration of the field that was mounted
   * @param field - The current state of the mounted field
   */
  onFieldRehydrate?(values: TFormValues, component: TComponent, field: TField): void;
  /**
   * Allows you to pass a JSX so that the form shows it before rendering your schema
   *
   * @returns JSX
   */
  renderLoading?(): ReactElement;
  /**
   * Called when the form was mounted
   *
   * @param values - Form generated values
   */
  onFormMount?(values: TFormValues): void;
  children?: ReactElement | ReactElement[];
  /**
   * Object to be used if you want to control the default values of the form.
   *
   * InitialValues will take precedence over this
   */
  formattedDataDefaults?: Record<string, unknown>;
  /**
   * Override the default form behaviour witch is to prevent submit when there is an error
   */
  submitOnValidOnly?: boolean;
  /**
   * Allows to insert a wrapper for each field or replace the field rendering
   */
  renderFieldWrapper?(component: TComponent, children: ReactElement[]): ReactElement;
};

type TMapper = Record<string, Record<string, unknown>>;
type TProvider = {
  children?: ReactElement | ReactElement[] | string;
  mapper: TMapper;
  propsMapping: TPropsMapping;
};
type TContext = {
  mapper: TMapper;
  propsMapping: TPropsMapping;
};

type TChildWrapperProps = {
  children: ReactElement | ReactElement[];
  component: TComponent;
  wrapper: new () => React.Component;
  propsMapping: TComponentPropsMapping;
  formId?: string;
  onMount(values: TField): void;
  onChange(values: TField): void;
  onRehydrate(values: TField): void;
  onFocus(values: TField): void;
  onBlur(values: TField): void;
};

type TFormRefActions = {
  submit(): void;
  stepForward(): TFormValues;
  stepBack(): TFormValues;
  validateForm(opts?: TChildrenOptions): TFormValues;
  values(opts: Pick<TChildrenOptions, 'scopeBlurredChildren' | 'scopeChangedChildren' | 'childrenScope'>): TFormValues;
};

export type {
  TComponent,
  TMapper,
  TChildrenOptions,
  TFormValues,
  TFormRefActions,
  TChildWrapperProps,
  TContext,
  TFormProps,
  TProvider,
  TErrorMessages,
  TSchemaValidation,
  TSchemaValidations,
};
