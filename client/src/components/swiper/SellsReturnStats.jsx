import "./sellsReturnStats.scss";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";

import TabelStats from "../tabelStats/TabelStats";

const SellsReturnStats = ({
  products,
  sellsStats,
  returnStats,
  sellsStatsM,
  expenseStatsM,
}) => {
  const x = [...sellsStats];
  const sellsStatsSort = x.sort((a, b) =>
    a._id.localeCompare(b._id, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  );

  return (
    <div className="sellsReturnStats">
      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {sellsStats.map((s, index) => (
          <SwiperSlide key={index}>
            <TabelStats
              products={products}
              sellsStats={sellsStatsSort}
              returnStats={returnStats}
              s={s}
              sellsStatsM={sellsStatsM}
              expenseStatsM={expenseStatsM}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SellsReturnStats;
