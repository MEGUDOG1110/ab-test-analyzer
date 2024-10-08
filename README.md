# ABテスト解析ツール

このプロジェクトは、ABテストの解析を行うためのツールです。フロントエンドはReactで構築されており、バックエンドはPythonのFlaskを使用しています。

## セットアップ手順

### フロントエンド

1. プロジェクトディレクトリで以下のコマンドを実行し、必要なパッケージをインストールします。

   ```bash
   npm install
   ```

2. 以下のコマンドを実行して、開発用サーバーを起動します。

   ```bash
   npm start
   ```

3. ブラウザで [http://localhost:3000](http://localhost:3000) にアクセスして、フロントエンドのUIを確認できます。

### バックエンド

1. `backend` ディレクトリに移動します。

   ```bash
   cd backend
   ```

2. Flaskサーバーを起動します。

   ```bash
   python app.py
   ```

   または、プロジェクトルートディレクトリから以下のコマンドを実行してもバックエンドを起動できます。

   ```bash
   python backend/app.py
   ```

3. サーバーが正しく起動すると、[http://localhost:5000](http://localhost:5000) でバックエンドが稼働します。

## 使用方法

- **Z検定** または **二項検定** を選択し、各グループの表示数とイベント数を入力して、結果を解析します。
- 検定結果は、p値および勝者（AグループまたはBグループ）が表示されます。

## 注意

- 必要に応じて、`backend/app.py` ファイルを調整して検定ロジックを変更できます。
