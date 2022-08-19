import "./widgets.scss";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export function Widgets() {
  return (
    <div className="widgets">
      <div className="widget">
        <p className="title">Revenue</p>
        <p className="center">
          <span className="mony">$2,454</span>
          <span className="arrow">
            -11,4
            <ArrowDownward className="icon" />
          </span>
        </p>
        <p className="compare">Compared to last month</p>
      </div>
      <div className="widget">
        <p className="title">Sales</p>
        <p className="center">
          <span className="mony">$4,454</span>
          <span className="arrow">
            -3,4
            <ArrowDownward className="icon" />
          </span>
        </p>
        <p className="compare">Compared to last month</p>
      </div>
      <div className="widget">
        <p className="title">Cost</p>
        <p className="center">
          <span className="mony">$2,454</span>
          <span className="arrow">
            +16,4
            <ArrowUpward className="icon green" />
          </span>
        </p>
        <p className="compare">Compared to last month</p>
      </div>
    </div>
  );
}
