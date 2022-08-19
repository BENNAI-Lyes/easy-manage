import "./chart.scss";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  Tooltip,
  CartesianGrid,
  Line,
} from "recharts";

export default function Chart({ data, title, dataKey, grid }) {
  return (
    <div className="chart">
      <h4 className="title"> {title} </h4>
      <ResponsiveContainer aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#5550bd" />
          <Line type="monotone" dataKey={dataKey} stroke="#82ca9d" />
          <Tooltip />
          {grid && <CartesianGrid strokeDasharray="5 5" stroke="#e0dfdf" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
