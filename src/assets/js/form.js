import { documentMock } from "./document-mock.js";

export const Form = (function(){

    const validationMsg = document.querySelector('.validation-msg');

    function createLabel(field) {
        const label = document.createElement('label');
        label.setAttribute('for', field['id']);
        label.textContent = field['titleLabel'];
        return label;
    }

    function createInput(field) {
        const inputField = document.createElement('input');
        inputField.id = field['id'];
        inputField.setAttribute('name', field['name']);
        inputField.setAttribute('type', field['inputType']);
        if (field['required']) { 
            inputField.setAttribute('required', 'required');
        }
        return inputField;
    }

    function createTextArea(field) {
        const textareaField = document.createElement('textarea');
        textareaField.id = field['id'];
        textareaField.setAttribute('name', field['name']);
        textareaField.setAttribute('rows', field['rows']);
        if (field['required']) { 
            textareaField.setAttribute('required', 'required');
        }
        return textareaField;
    }

    function createSelect(field) {
        const selectField = document.createElement('select');
        selectField.id = field['id'];
        selectField.setAttribute('name', field['name']);
        if (field['required']) { 
            selectField.setAttribute('required', 'required');
        }

        field['options'].forEach(option => {
            const selectOption = document.createElement('option');
            selectOption.textContent = option['title'];
            selectOption.setAttribute('value', option['value']);
            if (option['selected']) {
                selectOption.setAttribute('selected', 'selected');
            }
            selectField.append(selectOption);
        });
        return selectField;
    }

    function validate(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let valid = true;
        requiredFields.forEach(field => {
            if (field.value.trim() === '') {
                valid = false;
            }
        });
        if (!valid) {
            validationMsg.classList.add('show');
            setTimeout(() => {
                validationMsg.classList.remove('show');
            }, 6000);
        }
        return valid;
    }

    return {
        createLabel,
        createInput,
        createTextArea,
        createSelect,
        validate
    };

})(document||documentMock);