import { documentMock } from "./document-mock"

export const Form = (function(){

    let validationMsg = document.querySelector('.validation-msg');

    function createLabel(field) {
        let label = document.createElement('label');
        label.setAttribute('for',field['id']);
        label.textContent = field['titleLabel'];
        return label;
    }

    function createInput(field) {
        let inputField = document.createElement('input');
        inputField.id = field['id'];
        inputField.setAttribute('name',field['name']);
        inputField.setAttribute('type',field['inputType']);
        console.log()
        field['required']?inputField.setAttribute('required','required'):null;
        return inputField;
    }

    function createTextArea(field) {
        let textareaField = document.createElement('textarea');
        textareaField.id = field['id'];
        textareaField.setAttribute('name',field['name']);
        textareaField.setAttribute('rows',field['rows']);
        field['required']?textareaField.setAttribute('required','required'):null;
        return textareaField;
    }

    function createSelect(field) {
        let selectField = document.createElement('select');
        selectField.id = field['id'];
        selectField.setAttribute('name',field['name']);
        field['required']?selectField.setAttribute('required','required'):null;

        field['options'].forEach(option => {
            let selectOption = document.createElement('option');
            selectOption.textContent = option['title'];
            selectOption.setAttribute('value',option['value']);
            option['selected']?selectOption.setAttribute('selected','selected'):null;
            selectField.append(selectOption);
        })
        return selectField;
    }

    function validate(form) {
        let requiredFields = form.querySelectorAll('[required]');
        console.log(requiredFields);
        let valid = true;
        requiredFields.forEach(field => {
            if(field.value.trim() == '') {
                valid = false;
            }
        })
        if(!valid) {
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
    }

})(document||documentMock)