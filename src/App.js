import React, { useState } from "react";
import ABTestForm from "./ABTestForm";
import ABTestResult from "./ABTestResult";

function App() {
  const [groupAViews, setGroupAViews] = useState(""); // グループAのビュー数
  const [groupAEvents, setGroupAEvents] = useState(""); // グループAのイベント数
  const [groupBViews, setGroupBViews] = useState(""); // グループBのビュー数
  const [groupBEvents, setGroupBEvents] = useState(""); // グループBのイベント数
  const [result, setResult] = useState(null); // 結果
  const [testType, setTestType] = useState("z-test"); // 検定タイプの選択

  // ラジオボタンの変更ハンドラ
  const handleTestTypeChange = (event) => {
    setTestType(event.target.value);
  };

  const handleCalculate = async () => {
    try {
      const data = {
        groupA: {
          views: groupAViews || 0,
          events: groupAEvents || 0,
        },
        groupB: {
          views: groupBViews || 0,
          events: groupBEvents || 0,
        },
      };

      // 選択された検定方法に応じてURLを切り替える
      const url =
        testType === "z-test"
          ? "http://localhost:5000/calculate-ab-test"
          : "http://localhost:5000/calculate-binomial-test";

      console.log("request url:", url);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // 正しいデータ形式で送信
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const resultData = await response.json();

      console.log("p-value:", resultData.p_value);
      const pValue = resultData.p_value;
      const significant = pValue < 0.05; // p-valueが 0.05 未満なら有意差あり

      setResult({
        p_value: resultData.p_value,
        result: significant
          ? "有意差あり (p < 0.05)"
          : "有意差なし (p >= 0.05)",
        winner: significant
          ? parseFloat(groupAEvents) / parseFloat(groupAViews) >
            parseFloat(groupBEvents) / parseFloat(groupBViews)
            ? "Aグループ"
            : "Bグループ"
          : "なし",
      });
    } catch (error) {
      console.error("Error fetching the API:", error);
      console.error("Error details:", error.message);
    }
  };

  return (
    <div className="AB_Test-section">
      <div className="section_title">
        <h1>ABテスト解析ツール</h1>
      </div>
      <div className="section_option">
        <label>
          <input
            type="radio"
            value="z-test"
            checked={testType === "z-test"}
            onChange={handleTestTypeChange}
          />
          Z検定
        </label>
        <label>
          <input
            type="radio"
            value="binomial-test"
            checked={testType === "binomial-test"}
            onChange={handleTestTypeChange}
          />
          二項検定
        </label>
      </div>
      <section className="AB_Form">
        <ABTestForm
          groupAViews={groupAViews}
          setGroupAViews={setGroupAViews}
          groupAEvents={groupAEvents}
          setGroupAEvents={setGroupAEvents}
          groupBViews={groupBViews}
          setGroupBViews={setGroupBViews}
          groupBEvents={groupBEvents}
          setGroupBEvents={setGroupBEvents}
        />
      </section>
      <button onClick={handleCalculate}>結果を解析</button>
      {result && <ABTestResult result={result} />}
    </div>
  );
}

export default App;
