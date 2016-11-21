import {ValidationRenderer, RenderInstruction, ValidationError} from "aurelia-validation"

export class BootstrapFormRenderer {
    
    render(instruction) {
    
        for (let { error, elements } of instruction.unrender) {
            for (let element of elements) {
                this.remove(element, error);
            }
        }

        for (let { error, elements } of instruction.render) {
            for (let element of elements) {
                this.add(element, error);
            }
        }

    }

    add(element, error) {
        const formGroup = element.closest('.form-group');
        if (!formGroup) {
            return;
        }

        // add the has-error class to the enclosing form-group div
        formGroup.classList.add('has-error');

        // add help-block
        const message = document.createElement('span');
        message.className = 'help-block validation-message';
        message.textContent = error.message;
        message.id = `validation-message-${error.id}`;
        formGroup.appendChild(message);
    }

    remove(element, error) {
        const formGroup = element.closest('.form-group');
        if (!formGroup) {
            return;
        }
    }
}