import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [ formValidation, setFormValidation ] = useState({});

  useEffect(() => {
    createValidators();
  }, [ formState ]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }

    return true;
  }, [formValidation]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues = {};
    Array.from(Object.keys(formValidations)).forEach(item => {
      const [fn, errorMessage] = formValidations[item];
      formCheckedValues[`${item}Valid`] = fn(formState[item]) ? null : errorMessage;
    });

    setFormValidation(formCheckedValues);
  };

  return {
    ...formState,
    ...formValidation,
    formState,
    isFormValid,
    onInputChange,
    onResetForm
  }
};