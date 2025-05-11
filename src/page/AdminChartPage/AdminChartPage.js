import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  Cell,
} from "recharts";
import "./style/AdminChartPage.style.css";
import { useDispatch, useSelector } from "react-redux";
import { getPopularProduct } from "../../features/product/productSlice";

const AdminChartPage = () => {
  const dispatch = useDispatch();
  const { popularProductList } = useSelector((state) => state.product);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    dispatch(getPopularProduct());
  }, []);

  useEffect(() => {
    const formattedList = popularProductList.map((item) => ({
      name: item.name,
      sold: item.soldCount,
    }));
    setProductList(formattedList);
  }, [popularProductList]);

  const categoryData = [
    { name: "상의", value: 55 },
    { name: "하의", value: 30 },
    { name: "악세서리", value: 15 },
  ];
  const COLORS = ["#66ccff", "#99cc66", "#ffcc66"];
  return (
    <div className="admin_dashboard_page">
      <h1>판매 대시보드</h1>
      <div class="chart_card_contanier">
        <div class="chart_card">
          <h3>총 판매량</h3>
          <p>1,230개</p>
        </div>
        <div class="chart_card">
          <h3>총 수익</h3>
          <p>₩29,000,000</p>
        </div>
        <div class="chart_card">
          <h3>베스트 상품</h3>
          <p>니트 셔츠</p>
        </div>
        <div class="chart_card">
          <h3>평균 주문량</h3>
          <p>2.7개</p>
        </div>
      </div>
      <div className="chart_contanier">
        <div className="chart_box">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={productList}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sold" fill="#3399ff" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart_box" style={{ maxWidth: "300px" }}>
          <h2>카테고리별 판매 비중</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminChartPage;
