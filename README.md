# talker
GoogleHomeに喋らすぞい  
ついでに最寄りのバス停の出発時間も喋るぞい  
ポートは適当に8693にしたので、必要に応じて変更

# サービス起動
- pm2 start talker.js

# バスの時間を知りたい
- curl http://localhost:8693 -X POST

# 何か喋らせたい
- curl http://localhost:8693/talk -X POST -H "Content-Type: application/json" -d '{"value1": "ahoahoman"}'
  - jsonで value1 に詰め込んだテキストを喋ってくれる。上の例だと ahoahoman

# 他人に公開する
- expressを使ってWebサーバを立ててるので、http://IPアドレス:8693 にアクセスすると適当なページが表示されるので見ればわかるはず

## 不具合
- 午前中はバスの時間がおかしい
- キューイングしてないため、連続で喋らせようとすると後勝ちになる
