import { LightningElement, track, wire } from 'lwc';
import USER_ID from '@salesforce/user/Id';
import getScores from '@salesforce/apex/ScoreCardController.getScores';

export default class ScoreCard extends LightningElement {
    cardContentProps = {
        isGoal: true,
        cardItemLabel: 'サービスレベル',
        cardItemValue: '96%', // 設定時間内応答数 / 着信数
    };
    cardContentProps2 = {
        isGoal: false,
        cardItemLabel: '休暇',
        cardItemValue: '1',
    };

    @track
    isRenderd = false;

    @track
    scores = [];

    async connectedCallback() {
        try {
            // 全スコアを取得
            const fetchedScores = await this.fetchScores(USER_ID);
            this.initScoreObjs(fetchedScores);
        } catch (error) {
            this.printErrorMessage(error.message);
        }
    }

    initScoreObjs(scores) {
        this.scores = [];
        scores.forEach((score) => {
            switch (score.channel) {
                case 'VoiceCall':
                    this.scores.push(this.generateScoreVoice(score));
                    break;
                case 'Case':
                    this.scores.push(this.generateScoreCase(score));
                    break;
                case 'LiveChatTranscript':
                    this.scores.push(this.generateScoreChat(score));
                    break;
                default:
                    throw new Error('対象のチャネルが見つかりません');
            }
        });
    }

    // スコアを取得
    async fetchScores(userId) {
        return await getScores({ userId });
    }

    renderedCallback() {
        console.log('render');
        this.scores.forEach(({ channel, progress }) => this.initProgress(channel, progress));
    }

    //進捗バー初期化処理
    initProgress(channel, progress) {
        this.template.querySelectorAll(`c-score-card-progress.${channel}`).forEach((ele) => ele.setProgress(progress));
    }

    async refreshProgress() {
        // 全スコアを取得
        const fetchedScores = await this.fetchScores(USER_ID);
        this.initScoreObjs(fetchedScores);
    }

    // 電話のスコアオブジェクトを生成
    generateScoreVoice({ currentCounts, currentProgress, goalCounts }) {
        const chekedProgress = this.checkGoledProgress(currentProgress);
        return {
            icon: 'standard:voice_call',
            channel: '電話応対',
            progress: {
                width: `${chekedProgress}%`,
                background: '#30c85a',
            },
            currentTotalValue: currentCounts,
            goalValue: goalCounts,
        };
    }

    // ケースのスコアオブジェクトを生成
    generateScoreCase({ currentCounts, currentProgress, goalCounts }) {
        const chekedProgress = this.checkGoledProgress(currentProgress);
        return {
            icon: 'standard:case',
            channel: 'ケース',
            progress: {
                width: `${chekedProgress}%`,
                background: '#f2cf5b',
            },
            currentTotalValue: currentCounts,
            goalValue: goalCounts,
        };
    }

    // チャットのスコアオブジェクトを生成
    generateScoreChat({ currentCounts, currentProgress, goalCounts }) {
        const chekedProgress = this.checkGoledProgress(currentProgress);
        return {
            icon: 'standard:live_chat',
            channel: 'チャット',
            progress: {
                width: `${chekedProgress}%`,
                background: '#f88960',
            },
            currentTotalValue: currentCounts,
            goalValue: goalCounts,
        };
    }

    // 進捗率が100%を超えている場合は、100を設定する
    checkGoledProgress(progress) {
        return progress >= 100 ? 100 : progress;
    }

    // エラーメッセージを表示
    printErrorMessage(message) {
        console.error(message);
    }
}