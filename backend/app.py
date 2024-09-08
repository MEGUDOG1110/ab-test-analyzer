from flask import Flask, request, jsonify
from flask_cors import CORS
from scipy import stats
from scipy.stats import binomtest
import numpy as np

app = Flask(__name__)
CORS(app)

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal Server Error"}), 500

# データの取得と共通処理を行う関数
def get_ab_test_data():
    data = request.json
    groupA = data['groupA']
    groupB = data['groupB']
    
    events_A = int(groupA['events'])
    views_A = int(groupA['views'])
    events_B = int(groupB['events'])
    views_B = int(groupB['views'])
    
    return events_A, views_A, events_B, views_B

@app.route('/calculate-ab-test', methods=['POST'])
def calculate_ab_test():
    events_A, views_A, events_B, views_B = get_ab_test_data()

    # コンバージョン率の計算
    conversion_rate_A = events_A / views_A
    conversion_rate_B = events_B / views_B

    # プールされた確率の計算
    p_pool = (events_A + events_B) / (views_A + views_B)

    # 標準誤差の計算
    standard_error = np.sqrt(p_pool * (1 - p_pool) * (1 / views_A + 1 / views_B))

    # Zスコアの計算
    z_score = (conversion_rate_A - conversion_rate_B) / standard_error

    # p-value の計算
    p_value = 2 * (1 - stats.norm.cdf(abs(z_score)))

    # p-value が非常に小さい場合は科学記数法で表示
    if p_value < 1e-10:
        p_value = format(p_value, '.2e')
    else:
        p_value = round(p_value, 10)

    return jsonify({
        'z_score': z_score,
        'p_value': p_value
    })

@app.route('/calculate-binomial-test', methods=['POST'])
def calculate_binomial_test():
    try:
        events_A, views_A, events_B, views_B = get_ab_test_data()

        # グループAの成功確率
        if views_A == 0 or views_B == 0:
            raise ValueError("Views for group A or B cannot be zero.")
        
        p_A = events_A / views_A

        # 新しいbinomtestの実行
        result = binomtest(events_A, n=views_A + views_B, p=p_A, alternative='two-sided')

        # p値の取得
        p_value = result.pvalue

        # p値が非常に小さい場合は科学記数法で表示
        if p_value < 1e-10:
            p_value_str = format(p_value, '.2e')
        else:
            p_value_str = str(round(p_value, 10))

        # ここで数値の p_value を使って有意性を判定
        significant = bool(p_value < 0.05)

        # 結果を返す際に、p_value_str を返す
        return jsonify({
            'p_value': p_value_str,
            'significant': significant
        })

    except Exception as e:
        print(f"Error: {e}")  # エラーログを出力
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='localhost', port=5000)
