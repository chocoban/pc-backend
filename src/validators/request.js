import { check, validationResult } from 'express-validator';

const requestFormValidation = (req, formData) => {
  check(formData).isLength({ min: 3 });

  const errors = validationResult(req);
  if (errors) {
    console.log('ERRORS', errors);
    return { errors: errors.array() };
  }
};

export default requestFormValidation;
