import { LightningElement, api } from 'lwc';

export default class ScoreCardProgress extends LightningElement {
    @api icon;
    @api channel;
    @api value;
    @api progress;
    @api goal;

    @api
    setProgress({ width, background }) {
        const progressBar = this.getProgressBarValueElement();
        progressBar.style.width = width;
        progressBar.style.background = background;
    }

    getProgressBarValueElement() {
        return this.template.querySelector('.progress-value');
    }
}