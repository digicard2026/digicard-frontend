import * as Yup from 'yup';

// A function to generate a validation schema dynamically based on field configurations
export const validationSchemaFactory = (fields) => {
    const schema = {};

    fields.forEach((field) => {
        const { name, type, validation } = field;
        let fieldValidation = Yup[type]();

        // Apply custom validation rules for each field
        validation.forEach((rule) => {
            if (rule.type === 'min') {
                fieldValidation = fieldValidation.min(rule.value, rule.message);
            } else if (rule.type === 'max') {
                fieldValidation = fieldValidation.max(rule.value, rule.message);
            } else if (rule.type === 'required') {
                fieldValidation = fieldValidation.required(rule.message);
            } else if (rule.type === 'matches') {
                fieldValidation = fieldValidation.matches(rule.regex, rule.message);
            } else if (rule.type === 'oneOf') {
                fieldValidation = fieldValidation.oneOf(rule.values, rule.message);
            } else if (rule.type === 'email') {
                fieldValidation = fieldValidation.email(rule.message);
            }
        });

        schema[name] = fieldValidation;
    });

    return Yup.object().shape(schema);
};
