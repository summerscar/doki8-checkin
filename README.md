# 心动日剧 自动签到

<http://www.doki8.com/>

## Github Action secrets

* USERNAME: 用户名
* PASSWORD: 密码
* SCKEY(optional): Server酱 sckey
* TG_TOKEN(optional): telegram bot token
* TG_ID(optional): telegram user id

## 使用

1. Fork 仓库
2. Settings-secrets 添加上方所需 secret
3. Actions- enable Github actions
4. 运行
    * Actions- doki8-checkin -run workflow 可手动运行 Actions
    * 早上8点自动执行
5. 推送自动结果至微信、Telegram
