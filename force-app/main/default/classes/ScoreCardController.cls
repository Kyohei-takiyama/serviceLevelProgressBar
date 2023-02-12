public with sharing class ScoreCardController {
  // 集計対象のチャンネルリスト
  private static final String CHANNEL_VOICE = 'VoiceCall';
  private static final String CHANNEL_CASE = 'Case';
  private static final String CHANNEL_CHAT = 'LiveChatTranscript';

  // 全チャネルのスコアを取得
  @AuraEnabled
  public static List<Score> getScores(Id userId) {
    // 集計対象のユーザを取得
    User targetUser = getUserByUserId(userId);
    List<Score> scores = generateScores(targetUser);
    return scores;
  }

  private static User getUserByUserId(Id userId) {
    return [SELECT GoalVoiceCounts__c, GoalChatCounts__c, GoalCaseCounts__c FROM User WHERE Id = :userId];
  }

  private static List<Score> generateScores(User targetUser) {
    Id userId = targetUser.Id;
    Score voiceScore = new Score(CHANNEL_VOICE, targetUser.GoalVoiceCounts__c, userId);
    Score caseScore = new Score(CHANNEL_CASE, targetUser.GoalCaseCounts__c, userId);
    Score chatScore = new Score(CHANNEL_CHAT, targetUser.GoalChatCounts__c, userId);
    return new List<Score>{ voiceScore, caseScore, chatScore };
  }

  public class Score {
    @AuraEnabled
    public final String channel;
    @AuraEnabled
    public final Integer goalCounts;
    @AuraEnabled
    public final Integer currentCounts;
    @AuraEnabled
    public final Integer currentProgress;

    public Score(String channel, Decimal goalCounts, Id userId) {
      this.channel = channel;
      // ユーザ項目値が数値型のため、Integer型へ変換
      this.goalCounts = Integer.valueOf(goalCounts);
      this.currentCounts = getCurrentCounts(channel, userId);
      this.currentProgress = getProgress(this.currentCounts, this.goalCounts);
    }

    // 現在の応対件数を取得
    public Integer getCurrentCounts(String channel, Id userId) {
      String query = 'SELECT Id FROM ' + channel + ' WHERE OwnerId =:userId ';
      return Database.query(query).size();
    }

    // 電話応対の対応件数と個人目標の進捗率を取得
    private Integer getProgress(Integer currentCounts, Integer goalCounts) {
      return culuclateProgress(currentCounts, goalCounts);
    }

    // 進捗率を計算
    private Integer culuclateProgress(Integer currentCounts, Integer goalCounts) {
      Decimal resultsRounded = Decimal.valueOf(currentCounts).divide(goalCounts, 3);
      return Integer.valueOf(resultsRounded * 100);
    }
  }
}