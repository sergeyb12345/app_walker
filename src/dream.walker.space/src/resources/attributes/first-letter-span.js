import {inject, customAttribute, containerless} from "aurelia-framework";

//@containerless()
@inject(Element)
@customAttribute('first-letter-span')
export class FirstLetterSpan {

    constructor(element){
        this.element = element;
        if(this.element.childElementCount === 0) {
            this.wrapFirstLetterInSpan();
        }
    }

    wrapFirstLetterInSpan(){
        let text = this.element.innerText;
        let transformed = text.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        transformed = transformed.replace(/\b([a-z])/gi, '<span>$1</span>')
        this.element.innerHTML = transformed;
    }

}