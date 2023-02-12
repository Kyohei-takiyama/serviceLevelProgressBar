# Salesforce DX Project: Next Steps

Now that you’ve created a Salesforce DX project, what’s next? Here are some documentation resources to get you started.

## How Do You Plan to Deploy Your Changes?

Do you want to deploy a set of changes, or create a self-contained application? Choose a [development model](https://developer.salesforce.com/tools/vscode/en/user-guide/development-models).

## Configure Your Salesforce DX Project

The `sfdx-project.json` file contains useful configuration information for your project. See [Salesforce DX Project Configuration](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_ws_config.htm) in the _Salesforce DX Developer Guide_ for details about this file.

## Read All About It

- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
- [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)

## コンポーネントの説明
   ホーム画面などに配置し、個人の様々なレコードの応対件数を集計し、自身が設定した個人目標に対する進捗率を可視化するコンポーネント
   
## コンポーネントイメージ
![image](https://user-images.githubusercontent.com/80765755/218294540-4a2b970e-3fc4-424f-b18d-0ae869381438.png)

## 使用にあたる準備
ユーザ項目に下記のカスタム項目を作成
- API参照名：GoalVoiceCounts__c 音声コール(ServiceCloudVoice専用オブジェクト)の応対件数個人目標を設定するのに使用
- API参照名：GoalCaseCounts__c　ケースの応対件数個人目標を設定するのに使用
- API参照名：GoalChatCounts__c　チャットのトランスクリプトの応対件数個人目標を設定するのに使用
