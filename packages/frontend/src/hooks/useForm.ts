import { useState } from "react";

export type FormValue = string | number | Date | boolean;

export interface IFormItem {
    value?: FormValue;
    required?: boolean;
    validate?: {
        fn: (params: { value?: FormValue; formState: IFormState }) => boolean;
    };
    hasError?: boolean;
}

export interface IFormItemProps {
    [key: string]: IFormItem;
}

export interface IFormProps {
    items: IFormItemProps;
    onSubmit: (state: IFormState) => Promise<void>;
}

export interface IFormState {
    items: IFormItemProps;
    formHasError: boolean;
}

export interface IFormReturn extends IFormState {
    reset: () => void;
    submit: () => Promise<void>;
    validateField: (fieldName: string) => void;
    registerValue: (field: string, value: FormValue) => void;
    loading: boolean;
}

export default ({ items, onSubmit }: IFormProps): IFormReturn => {
    const [loading, setLoading] = useState<boolean>(false);

    const [formState, setFormState] = useState<IFormState>({
        items: items,
        formHasError: false,
    });

    const reset = () => {
        setFormState({
            items: items,
            formHasError: false,
        });
    };

    const validateField = (item: IFormItem): IFormItem => {
        let itemHasError = false;

        if (item.required && (item.value === null || item.value === undefined)) {
            itemHasError = true;
        }

        if (
            item.required &&
            typeof item.value === "string" &&
            (item.value ).length === 0
        ) {
            itemHasError = true;
        }

        if (item.validate) {
            const validationResult = item.validate.fn({ value: item.value, formState });
            itemHasError = !validationResult;
        }

        return { ...item, hasError: itemHasError };
    };

    const validateFields = (fields: IFormItemProps): IFormState => {
        // Validating form fields.

        const newItems = Object.entries(fields).reduce<IFormItemProps>(
            (newState, current) => {
                const [key, item] = current;
                newState[key] = validateField(item);
                return newState;
            },
            {}
        );

        return {
            formHasError: Object.values(newItems).some((field) => field.hasError),
            items: newItems,
        };
    };

    const submit = async () => {
        const newState = validateFields(formState.items);
        if (!newState.formHasError) {
            setLoading(true);
            await onSubmit(newState);
            setLoading(false);
        }
        setFormState(newState);
    };

    const validateAndSaveFieldState = (fieldName: string) => {
        setFormState((prevState) => {
            const field = prevState.items[fieldName];
            if (field && field.validate) {
                const validationResult = validateField(field);
                return {
                    ...prevState,
                    items: { ...prevState.items, [fieldName]: validationResult },
                };
            } return prevState;
        });
    };

    const registerValue = (field: string, value: FormValue) => {
        setFormState((prevState) => {
            if (Object.keys(prevState.items).includes(field)) {
                const newField = validateField({
                    ...prevState.items[field],
                    value: value,
                });

                return {
                    ...prevState,
                    items: { ...prevState.items, [field]: newField },
                };
            } return prevState;
        });
    };

    return {
        ...formState,
        submit,
        validateField: validateAndSaveFieldState,
        registerValue,
        reset,
        loading
    };
};

// Custom Validators.

export const validateEmail = (value?: FormValue): boolean => {
    if (value) {
        const exp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return exp.test(value as string);
    } return false;
};

export const validateURL = (value?: FormValue): boolean => {
    if (value) {
        const exp = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
        return exp.test(value as string);
    } return false;
};
