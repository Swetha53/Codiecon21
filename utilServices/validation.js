export default {
  validatorObject: {},
  isEmpty(anyStr) {
    if (!anyStr || !anyStr.toString().replace(/\s/g, '').length || parseFloat(anyStr) === 0 || !anyStr.toString().replace(/[\u2800\u0020]/g, '').length) {
      return false;
    }
    return true;
  },
  isValid(anyStr) {
    return /^[0-9]+$/.test(anyStr);
  },
  validateFieldData(value1, value2, validationFun) {
    const validationState = 'isValid';
    let isValid = true;
    if (value2 || parseInt(value2, 10) === 0) {
      isValid = this[validationFun](value1, value2);
    } else {
      isValid = this[validationFun](value1);
    }
    return { isValid, validationState };
  },
  validateFormData(validationObj) {
    let formValidationState = true;
    const objectKeys = Object.keys(validationObj);
    for (let i = 0; i < objectKeys.length; i += 1) {
      let validationData = '';
      if (validationObj[objectKeys[i]].value1 && validationObj[objectKeys[i]].value2) {
        validationData = this.validateFieldData(validationObj[objectKeys[i]].value1,
          validationObj[objectKeys[i]].value2, validationObj[objectKeys[i]].validationFun);
      } else {
        validationData = this.validateFieldData(validationObj[objectKeys[i]].value1, '',
          validationObj[objectKeys[i]].validationFun);
      }
      this.validatorObject[objectKeys[i]][validationData.validationState] = validationData.isValid;
      if (!validationData.isValid) {
        formValidationState = false;
      }
    }
    return { validatedData: validationObj, formValidationState };
  },
};
