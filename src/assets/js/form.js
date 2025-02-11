import { documentMock } from "./document-mock"

export const Form = (function(){

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
        inputField['required']?inputField.setAttribute('required','required'):null;
        return inputField;
    }

    function createTextArea(field) {
        let textareaField = document.createElement('textarea');
        textareaField.id = field['id'];
        textareaField.setAttribute('name',field['name']);
        textareaField.setAttribute('rows',field['rows']);
        textareaField['required']?textareaField.setAttribute('required','required'):null;
        return textareaField;
    }

    function createSelect(field) {
        let selectField = document.createElement('select');
        selectField.id = field['id'];
        selectField.setAttribute('name',field['name']);
        selectField['required']?selectField.setAttribute('required','required'):null;

        field['options'].forEach(option => {
            let selectOption = document.createElement('option');
            selectOption.textContent = option['title'];
            selectOption.setAttribute('value',option['value']);
            option['selected']?selectOption.setAttribute('selected','selected'):null;
            selectField.append(selectOption);
        })
        return selectField;
    }

    return {
        createLabel,
        createInput,
        createTextArea,
        createSelect
    }

})(document||documentMock)