import {
  TErrorMessages,
  TError,
  TErrors,
  TGenericValidationRule,
  TVAvailableValidations,
  TFieldData,
  TValidationDateFormats,
  TValidationDateOperators,
} from 'core/types';
import * as utils from 'core/utils';

type TRuleValue = string | number | boolean | undefined;
type TValidationValue = string | number | boolean | (() => boolean);
type TRuleFunction = (data: TErrorArgumentsGeneric) => TError;

type TValidationArguments<T, I> = {
  value: T;
  values?: Record<string, unknown>;
  validationValue: I;
  errorMessage?: string;
};

type TErrorArgumentsGeneric = {
  value: TRuleValue;
  values?: Record<string, unknown>;
  validationValue: TValidationValue;
  errorMessage: string;
};

interface TCallback {
  value: string;
  validationValue: (value: string | number) => {
    errorMessage: string;
    fail: boolean;
  };
}

export interface ICustomValidationValue {
  from: number;
  to: number;
  validations: Record<string, any>;
}

type TErrorReturn = {
  fail: boolean;
  message?: string;
  metadata?: Record<string, unknown>;
};
// ERROR HELPERS
const searchFailedError = (errors: TErrors) => {
  const defaultResponse = { fail: false };

  if (!errors) return defaultResponse;
  return Object.keys(errors).reduce((acc, key) => {
    return errors[key].fail ? errors[key] : acc;
  }, defaultResponse);
};

// VALIDATIONS

const length = ({ value, validationValue }: TErrorArgumentsGeneric): TErrorReturn => {
  let targetValue = value;
  // We want length even if it is a numeric
  if (typeof targetValue !== 'string') {
    targetValue = value?.toString();
  }

  return { fail: !value || targetValue?.length === validationValue };
};

const greaterThan = ({ value, validationValue }: TValidationArguments<string, string>): TErrorReturn => {
  return { fail: !value || parseInt(value) <= parseInt(validationValue) };
};

const lessThan = ({ value, validationValue }: TValidationArguments<string, string>): TErrorReturn => {
  return { fail: !value || parseInt(value) >= parseInt(validationValue) };
};

const maxLength = ({ value = '', validationValue }: TValidationArguments<string, number>): TErrorReturn => {
  let targetValue = value;
  // We want length even if it is a numeric
  if (Number.isInteger(targetValue)) {
    targetValue = value.toString();
  }

  return {
    fail: targetValue.length > validationValue,
  };
};

const minLength = ({ value = '', validationValue }: TValidationArguments<string, number>): TErrorReturn => {
  let targetValue = value;
  // We want length even if it is a numeric
  if (Number.isInteger(targetValue)) {
    targetValue = value.toString();
  }

  return {
    fail: targetValue.length < validationValue,
  };
};

const required = ({ value, validationValue }: TValidationArguments<string, boolean>): TErrorReturn => {
  return {
    fail: validationValue && !value,
  };
};

const value = ({ value, validationValue }: TValidationArguments<TRuleValue, TValidationValue>): TErrorReturn => {
  return { fail: value !== validationValue };
};

const regex = ({ value, validationValue }: TValidationArguments<string, string>): TErrorReturn => {
  const regex = new RegExp(validationValue);
  const fail = !regex.test(value);

  return { fail };
};

const email = ({ value }: TValidationArguments<string, string>): TErrorReturn => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const fail = !regex.test(value as string);

  return { fail };
};

const url = ({ value }: TValidationArguments<string, string>): TErrorReturn => {
  const regex = /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi;
  const fail = !regex.test(value as string);

  return { fail };
};

const onlyLetters = ({ value }: TValidationArguments<string, string>): TErrorReturn => {
  const fail = !/^[a-zA-Z\s]*$/.test(value);

  return { fail };
};

const customValidation = ({
  value,
  validationValue,
}: TValidationArguments<string, ICustomValidationValue[]>): TErrorReturn => generic({ value, validationValue });

/*   - Allow to use specific validations for specific position caracters
 *
 *    customValidation: [
 *     {
 *       from: 0,
 *       to: 2,
 *       validations: {
 *         greaterThan: date.getMonth(),
 *         lessThan: '13',
 *       }
 *     },
 *     {
 *       from: 3,
 *       to: 5,
 *       validations: {
 *         greaterThan: date.getFullYear().toString().substr(-2) - 1,
 *       }
 *     },
 *    ],
 */

const generic = ({
  value = '',
  validationValue,
}: TValidationArguments<string, ICustomValidationValue[]>): TErrorReturn => {
  const fail = validationValue.some((item) => {
    const { to, from, validations } = item;

    const substring = value.substring(to, from);
    return hasError(run(substring, validations));
  });
  return { fail };
};

const notAllowSpaces = ({ value }: TValidationArguments<string, boolean>): TErrorReturn => {
  const fail = /\s/.test(value);
  return { fail };
};

const callback = ({ value, validationValue }: TCallback): TErrorReturn => {
  const result = validationValue(value);

  return {
    message: result.errorMessage,
    fail: result.fail,
  };
};

const isNumber = ({ value }: TValidationArguments<string, boolean>): TErrorReturn => {
  const fail = !!value && !/^[0-9\s]*$/.test(value);
  return { fail };
};

const notEmpty = ({ value }: TValidationArguments<string, boolean>): TErrorReturn => {
  return { fail: !value.trim().length };
};

/**
 * Check if has tralling/landing spaces.
 */
const hasNoExtraSpaces = ({ value }: TValidationArguments<string, boolean>): TErrorReturn => {
  const regexToCheckTrailingSpaces = '^[A-Za-z0-9.-]+(?: +[A-Za-z0-9.-]+)*$';

  const { fail } = regex({
    value,
    validationValue: regexToCheckTrailingSpaces,
    errorMessage: '',
  });

  return { fail };
};

const numericRange = ({
  value,
  validationValue,
}: TValidationArguments<number, { start: number; end: number }>): TErrorReturn => {
  const replacedValue = String(value).replace(/[^0-9]/g, '');
  const fail =
    !replacedValue ||
    !Number.isInteger(parseInt(replacedValue.toString())) ||
    +replacedValue > validationValue.end ||
    +replacedValue < validationValue.start;

  return {
    fail,
  };
};

const isInTheList = ({
  value,
  validationValue,
}: TValidationArguments<string | number, string[] | number[]>): TErrorReturn => {
  if (!value || !Array.isArray(validationValue)) return { fail: true };
  return { fail: !validationValue.some((code) => code === value || JSON.stringify(code) === value) };
};

const sequentialNumber = ({ value }: TValidationArguments<TRuleValue, boolean>) => {
  const numbers = '0123456789';
  const numbersRev = '9876543210';
  const replacedValue = String(value).replace(/[^0-9]/g, '');
  const fail = !(numbers.indexOf(replacedValue) === -1 && numbersRev.indexOf(replacedValue) === -1);

  return { fail };
};

const repeatedNumbers = ({ value }: TValidationArguments<TRuleValue, boolean>) => {
  const replacedValue = String(value).replace(/[^0-9]/g, '');
  const regex = /\b(\d)\1+\b/gm;
  const fail = regex.test(replacedValue);

  return { fail };
};

const path = ({
  value,
  validationValue,
}: TValidationArguments<Record<string, unknown>, Record<string, unknown>>): TErrorReturn => {
  const searchErrorInPath = (path: string) => {
    const valueForPath = utils.object.getValueByPath(value, path as string);
    if (validationValue.preventUnMountValidation && !(path in value)) {
      return { fail: false };
    }

    const validationsResult = run(valueForPath as string, validationValue);

    const res = searchFailedError(validationsResult);
    return res;
  };
  if (Array.isArray(validationValue.paths)) {
    return validationValue.paths.reduce((acc, path) => {
      const res = searchErrorInPath(path);
      if (res.fail) {
        return res;
      }
      return acc;
    }, {});
  }

  return searchErrorInPath(validationValue.path as string);
};

const fields = ({
  values,
  validationValue,
}: {
  validationValue: Pick<TVAvailableValidations, 'fields'>['fields'];
  values: TFieldData;
}) => ({
  fail: validationValue?.set[validationValue.rule]((validation) => {
    return hasError(run(values[validation.fieldName]?.value as string, validation.validations));
  }),
});

const customNameRule = ({ value, validationValue }: TValidationArguments<TRuleValue, TGenericValidationRule>) => {
  if (typeof validationValue !== 'object') return { fail: false };
  return {
    fail: hasError(run(value, validationValue)),
  };
};

const date = ({
  value = '',
  validationValue,
}: TValidationArguments<string, Pick<TVAvailableValidations, 'date'>['date']>): TErrorReturn => {
  if (!validationValue?.target?.value && !validationValue?.origin?.intervals) {
    return {
      fail: false,
    };
  }
  const dateRearangeMapper: Record<TValidationDateFormats, (value: string) => string> = {
    DDMMYYYY: (value: string) => {
      const dateParts = value.split(value.includes('/') ? '/' : '-');
      return `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`;
    },
    YYYYMMDD: (value: string) => {
      const dateParts = value.split(value.includes('/') ? '/' : '-');
      return `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
    },
    YYYYDDMM: (value: string) => {
      const dateParts = value.split(value.includes('/') ? '/' : '-');
      return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    },
    MMDDYYYY: (value: string) => value,
    timestamp: (value: string) => new Date(value).toString(),
  };

  const getIntervalsDate = (date, intervals: any) => {
    const intervalsMapper = {
      years: (date: Date, value: number) => new Date(date.setUTCFullYear(date.getUTCFullYear() + value)),
      months: (date: Date, value: number) => new Date(date.setUTCMonth(date.getUTCMonth() + value)),
      days: (date: Date, value: number) => new Date(date.setDate(date.getUTCDate() + value)),
    };
    return Object.keys(intervals).reduce(
      (acc, interval) => intervalsMapper[interval](acc, intervals[interval]),
      new Date(date),
    );
  };

  const originValue = (validationValue.origin.value || value) as string;
  let originDate = new Date(dateRearangeMapper[validationValue?.origin.format](originValue).toString());

  let targetDate = validationValue?.target?.format
    ? new Date(dateRearangeMapper[validationValue?.target?.format](validationValue.target.value as string).toString())
    : new Date();

  if (validationValue.origin.intervals) {
    targetDate = getIntervalsDate(originDate, validationValue.origin.intervals);
    const date = new Date();
    originDate = new Date(`${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getUTCFullYear()}`);
  }
  if (
    validationValue.onlyValidDate &&
    (!(targetDate instanceof Date && isFinite(targetDate as unknown as number)) ||
      !(targetDate instanceof Date && isFinite(originDate as unknown as number)) ||
      originValue.length < 8)
  ) {
    return {
      fail: true,
    };
  }

  const originTimestamp = originDate.getTime();
  const targetTimestamp = targetDate.getTime();

  const operationsMapper: Record<TValidationDateOperators, boolean> = {
    '>': originTimestamp > targetTimestamp,
    '>=': originTimestamp >= targetTimestamp,
    '<': originTimestamp < targetTimestamp,
    '<=': originTimestamp <= targetTimestamp,
    '===': originTimestamp === targetTimestamp,
    '!==': originTimestamp !== targetTimestamp,
  };

  return {
    fail: operationsMapper[validationValue?.operator as string],
  };
};

const conditions = ({
  value = '',
  validationValue,
}: TValidationArguments<string, Pick<TVAvailableValidations, 'conditions'>['conditions']>) => {
  if (!validationValue) return { fail: false };

  const conditionResult = (rule) => {
    if (
      (rule.forceDefinedOrigin && rule.origin === undefined) ||
      (rule.forceDefinedTarget && rule.target === undefined)
    )
      return { fail: false };

    const origin = rule.origin === undefined ? value : rule.origin;
    const target = rule.target === undefined ? value : rule.target;
    const conditionMapper = {
      '!==': (origin || value) !== (target || value),
      '===': (origin || value) === (target || value),
      '<': (origin || value) < (target || value),
      '>': (origin || value) > (target || value),
      '<=': (origin || value) <= (target || value),
      '>=': (origin || value) >= (target || value),
    };

    return conditionMapper[rule.condition];
  };
  const rulesMapper = {
    and: () => !!validationValue.set.every(conditionResult),
    or: () => !!validationValue.set.some(conditionResult),
  };

  return {
    fail: rulesMapper[validationValue.rule](),
  };
};

const validations: Record<string, unknown> = {
  conditions,
  date,
  length,
  greaterThan,
  maxLength,
  minLength,
  required,
  value,
  regex,
  hasNoExtraSpaces,
  onlyLetters,
  notAllowSpaces,
  callback,
  isNumber,
  customValidation,
  notEmpty,
  numericRange,
  email,
  lessThan,
  sequentialNumber,
  repeatedNumbers,
  url,
  path,
  isInTheList,
  fields,
  customNameRule,
};

const run = (
  value: TRuleValue,
  rules: TVAvailableValidations,
  errorMessages: TErrorMessages = {},
  formData: TFieldData = {},
): TErrors => {
  let result = {};
  Object.keys(rules).forEach((key): void => {
    const validationValue = rules[key] as TValidationValue;
    let validationFN = validations[key] as TRuleFunction;
    if (!validationFN) {
      validationFN = validations.customNameRule as TRuleFunction;
    }

    const errorMessage = errorMessages[key] || errorMessages.default;
    const ruleResult = validationFN({
      value,
      validationValue,
      errorMessage: errorMessage,
      values: formData,
    });
    result = {
      ...result,
      [key]: { ...ruleResult, validationValue, message: errorMessage },
    };
  });
  return result;
};

const generateCustomError = (name: string, message: string): TErrors => {
  return {
    [name]: {
      fail: true,
      message,
      value: undefined,
    },
  };
};

const hasError = (errors?: TErrors) => {
  if (!errors) {
    return false;
  }
  return !!Object.keys(errors).find((key) => errors && errors[key].fail, []);
};

export { run, generateCustomError, hasError };
