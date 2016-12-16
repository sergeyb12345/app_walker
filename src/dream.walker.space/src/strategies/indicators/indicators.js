import {inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {IndicatorService} from '../../services/indicator-service';

@inject(EventAggregator, IndicatorService, "ErrorParser")
export class Indicators {

}