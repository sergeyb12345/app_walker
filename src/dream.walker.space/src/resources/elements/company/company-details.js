import {inject, bindable} from "aurelia-framework";
import moment from 'moment';

export class CompanyDetails {
    @bindable company;    

    formatDate(date) {
        let date1 = moment(date);
        let date2 = moment(new Date());

        let diff = date2.diff(date1);
        let duration = moment.duration(diff); 
        let days = duration.asDays();

        //let m = moment(date).format('DD/MM/YYYY');
        return Math.round(days) + ' days ago';
    }
}