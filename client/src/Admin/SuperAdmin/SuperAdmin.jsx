import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./SuperAdmin.scss";
import { useEffect, useMemo, useRef, useState } from "react";
import { getRevenue } from "../../services/orderService";
const SuperAdmin = () => {
  //     { date: "2024-01-01", price: 120 },
  //     { date: "2024-01-02", price: 125 },
  //     { date: "2024-01-03", price: 115 },
  //     { date: "2024-01-04", price: 130 },
  //     { date: "2024-01-05", price: 128 },
  //     { date: "2024-01-06", price: 132 },
  //     { date: "2024-01-07", price: 127 },

  //     { date: "2025-01-01", price: 120 },
  //     { date: "2025-01-02", price: 125 },
  //     { date: "2025-01-03", price: 115 },
  //     { date: "2025-01-04", price: 130 },
  //     { date: "2025-01-05", price: 128 },
  //     { date: "2025-01-06", price: 132 },
  //     { date: "2025-01-07", price: 127 },
  //     // Tháng 3
  //     { date: "2025-03-01", price: 110 },
  //     { date: "2025-03-15", price: 115 },
  //     { date: "2025-03-30", price: 118 },

  //     // Tháng 4
  //     { date: "2025-04-01", price: 120 },
  //     { date: "2025-04-15", price: 125 },
  //     { date: "2025-04-30", price: 123 },

  //     // Tháng 5
  //     { date: "2025-05-01", price: 126 },
  //     { date: "2025-05-15", price: 130 },
  //     { date: "2025-05-30", price: 128 },

  //     // Tháng 9
  //     { date: "2025-09-01", price: 120 },
  //     { date: "2025-09-02", price: 125 },
  //     { date: "2025-09-03", price: 115 },
  //     { date: "2025-09-04", price: 130 },
  //     { date: "2025-09-05", price: 128 },
  //     { date: "2025-09-06", price: 132 },
  //     { date: "2025-09-07", price: 127 },
  //   ];
  const [rawData, setRawData] = useState([]);
  console.log("🚀 ~ SuperAdmin ~ rawData:", rawData);
  const getRevenues = async () => {
    try {
      const res = await getRevenue();
      if (res.data.code === 200) {
        const rawData = res.data.data.map((item) => {
          // Chuyển đổi order_date sang định dạng "YYYY-MM-DD"
          const dateObject = new Date(item.order_date);
          const formattedDate = dateObject.toISOString().split("T")[0]; // Sử dụng toISOString() để đảm bảo UTC day
          return {
            date: formattedDate,
            price: item.total,
          };
        });
        setRawData(rawData);
      }
    } catch (error) {
      console.log("🚀 ~ getRevenues ~ error:", error);
    }
  };
  useEffect(() => {
    getRevenues();
  }, []);
  const aggregatedData = useMemo(() => {
    const monthlyTotals = {};
    const uniqueYears = new Set(); // Để lưu trữ các năm có trong dữ liệu

    // Đầu tiên, tìm tất cả các năm có trong rawData
    rawData?.forEach((item) => {
      uniqueYears.add(item.date.substring(0, 4)); // Lấy "YYYY" từ "YYYY-MM-DD"
    });

    // Khởi tạo tất cả các tháng cho MỌI năm có trong uniqueYears với doanh thu 0
    Array.from(uniqueYears)
      .sort()
      .forEach((year) => {
        for (let i = 1; i <= 12; i++) {
          const monthKey = `${year}-${i.toString().padStart(2, "0")}`; // VD: "2024-01", "2025-01"
          monthlyTotals[monthKey] = {
            monthLabel: `T${i}/${year.toString().substring(2)}`, // VD: "T1/24", "T1/25"
            revenue: 0,
          };
        }
      });

    // Duyệt qua dữ liệu gốc và cộng dồn doanh thu vào các tháng tương ứng
    rawData?.forEach((item) => {
      const monthKey = item.date.substring(0, 7); // "YYYY-MM"
      const price = parseFloat(item.price);

      if (monthlyTotals[monthKey]) {
        monthlyTotals[monthKey].revenue += price;
      }
    });

    // Chuyển đổi object thành mảng và sắp xếp theo khóa tháng/năm để đảm bảo thứ tự
    return Object.keys(monthlyTotals)
      .sort() // Sắp xếp theo "YYYY-MM" để đảm bảo thứ tự thời gian
      .map((key) => monthlyTotals[key]);
  }, [rawData]);

  // Điều chỉnh chiều rộng động: giờ nó sẽ dựa trên tổng số tháng của tất cả các năm
  const columnWidth = 100; // Chiều rộng ước tính cho mỗi cột + khoảng cách
  const minChartDisplayWidth = 800; // Chiều rộng tối thiểu mà biểu đồ sẽ hiển thị trước khi cuộn
  const dynamicChartWidth = Math.max(
    minChartDisplayWidth,
    aggregatedData.length * columnWidth
  );
  const scrollContainerRef = useRef(null);

  // Sử dụng useEffect để cuộn đến cuối (phía năm gần nhất) sau khi render
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft =
        scrollContainerRef.current.scrollWidth;
    }
  }, [aggregatedData]); // Cuộn lại khi dữ liệu tổng hợp thay đổi

  return (
    <div className="superAdminContainer">
      <h2 className="text-lg font-semibold mb-2">
        Biểu đồ doanh thu theo tháng
      </h2>
      {rawData?.length == 0 ? (
        <div>Chưa có doanh thu</div>
      ) : (
        <div className="chart">
          <div
            className="editScroll"
            ref={scrollContainerRef}
            style={{
              height:
                "calc(100% + 17px)" /* 17px là chiều cao điển hình của thanh cuộn trên Windows */,
              overflowX: "auto",
              overflowY: "hidden",
            }}
          >
            <ResponsiveContainer width={dynamicChartWidth} height={400}>
              <BarChart
                data={aggregatedData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid stroke="#444" strokeDasharray="3 3" />
                <XAxis dataKey="monthLabel" stroke="#fff" />
                <YAxis
                  unit="₫"
                  stroke="#fff"
                  // tickFormatter={(value) => `${(value / 1000000).toFixed(0)}tr`}
                  tickFormatter={(value) => `${value.toLocaleString("vi-VN")} `}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "#333", border: "none" }}
                  labelStyle={{ color: "#fff" }}
                  itemStyle={{ color: "#fff" }}
                  // Định dạng giá trị tooltip để hiển thị tiền tệ
                  formatter={(value) => `${value.toLocaleString("vi-VN")} ₫`}
                />
                <Bar
                  dataKey="revenue" // dataKey bây giờ là "revenue"
                  fill="#8884d8" // Màu của cột
                  // Bạn có thể thêm animation nếu muốn
                  // animationDuration={300}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdmin;
