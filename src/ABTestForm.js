import React from "react";

function ABTestForm({
  groupAViews,
  setGroupAViews,
  groupAEvents,
  setGroupAEvents,
  groupBViews,
  setGroupBViews,
  groupBEvents,
  setGroupBEvents,
  onCalculate,
}) {
  const handleSubmit = (e) => {
    e.preventDefault(); // フォームのデフォルトの動作（ページリロード）を防ぐ

    // 計算を実行
    onCalculate();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <h2>Aグループ（テストパターン）のデータ</h2>
        </div>
        <div>
          <label>
            全表示数:
            <input
              type="number"
              value={groupAViews}
              onChange={(e) => setGroupAViews(e.target.value)}
            />
          </label>
          <label>
            特定のイベントが発生した数:
            <input
              type="number"
              value={groupAEvents}
              onChange={(e) => setGroupAEvents(e.target.value)}
            />
          </label>
        </div>
      </div>
      <div>
        <div>
          <h2>Bグループ（オリジナルパターン）のデータ</h2>
        </div>
        <div>
          {" "}
          <label>
            全表示数:
            <input
              type="number"
              value={groupBViews}
              onChange={(e) => setGroupBViews(e.target.value)}
            />
          </label>
          <label>
            特定のイベントが発生した数:
            <input
              type="number"
              value={groupBEvents}
              onChange={(e) => setGroupBEvents(e.target.value)}
            />
          </label>
        </div>
      </div>
    </form>
  );
}

export default ABTestForm;
