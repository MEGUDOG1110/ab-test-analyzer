import React from "react";

const ABTestResult = ({ result }) => {
  if (!result) {
    return <p>結果を表示するためにデータを入力してください。</p>;
  }

  return (
    <section className="result">
      <p>p-value: {result.p_value}</p>
      <p>結果: {result.result}</p>
      <p>勝者: {result.winner}</p>
    </section>
  );
};

export default ABTestResult;
