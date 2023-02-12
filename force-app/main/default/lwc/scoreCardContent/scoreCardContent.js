import { LightningElement, api } from 'lwc';

export default class ScoreCardContent extends LightningElement {
    @api isGoal;
    @api cardItemLabel;
    @api cardItemValue;

    get style() {
        return this.isGoal
            ? 'data-card-item-content slds-text-color_success'
            : 'data-card-item-content text-color_hot-orange';
    }
}