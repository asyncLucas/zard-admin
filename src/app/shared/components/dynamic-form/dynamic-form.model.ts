// form-config.model.ts
export type ZFieldType =
  | 'text'
  | 'select'
  | 'text-area'
  | 'radio'
  | 'date-picker'
  | 'switch'
  | 'checkbox'
  | 'decimal'
  | 'file';

export interface FieldOption {
  key: string;
  value: string;
}

export type ValidatorType =
  | 'required'
  | 'requiredTrue'
  | 'minLength'
  | 'maxLength'
  | 'email'
  | 'pattern'
  | 'min'
  | 'max';

export interface ValidatorConfig {
  type: ValidatorType;
  value?: any;
  message?: string; // optional custom error message
}

export interface FieldConfig {
  label?: string;
  type: ZFieldType;
  placeholder?: string;
  initialValue?: any;
  options?: FieldOption[]; // select, radio, checkbox groups
  hidden?: boolean;
  disabled?: boolean;
  validators?: ValidatorConfig[];
  custom?: Record<string, any>;
  helpText?: string;
  size?: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // flex basis size (2-12, defaults to 12 = full width)
}

export interface FormConfig {
  autoSaveKey?: string;      // key used in localStorage
  submitLabel?: string;      // custom label for submit button
  resetLabel?: string;       // custom label for reset button
  gap?: 2 | 3 | 4 | 6 | 8;   // gap between fields (tailwind spacing)
  properties: Record<string, FieldConfig>;
}
