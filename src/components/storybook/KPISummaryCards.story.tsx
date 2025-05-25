
import React from "react";
import KPISummaryCards from "../kpi/KPISummaryCards";

const meta = {
  title: "Components/KPI/KPISummaryCards",
  component: KPISummaryCards,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export function Default() {
  return (
    <div className="p-6 bg-gray-50">
      <KPISummaryCards timeFrame="monthly" />
    </div>
  );
}

export function Weekly() {
  return (
    <div className="p-6 bg-gray-50">
      <KPISummaryCards timeFrame="weekly" />
    </div>
  );
}

export function Yearly() {
  return (
    <div className="p-6 bg-gray-50">
      <KPISummaryCards timeFrame="yearly" />
    </div>
  );
}
