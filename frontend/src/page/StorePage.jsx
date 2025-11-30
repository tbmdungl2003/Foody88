// src/pages/StorePage.js
import React, { useRef, useEffect, useState } from "react";
import { getFoods, getStore } from "../api/api";
import { Link } from "react-router-dom";
function StorePage() {
  const menuRef = useRef(null);

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState({});

  const scrollRight = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Fetch store info
  useEffect(() => {
    const fetchStore = async () => {
      try {
        const res = await getStore();
        setStore(res.data);
      } catch (error) {
        console.error("Lỗi khi tải store:", error);
      }
    };

    fetchStore();
  }, []);

  // Fetch foods
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await getFoods();
        console.log("Dữ liệu API trả về:", res.data);
        const cities = Object.values(res.data);     // lấy [{name, items}, {name, items}, ...]
const allFoods = cities.flatMap(city => city.items);  // gom toàn bộ items thành 1 mảng
setFoods(allFoods);

      } catch (error) {
        console.error("Lỗi lấy dữ liệu món ăn:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  return (
    <div style={{ width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f5f5f5" }}>

      {/* Header */}
      <div style={{ display: "flex", padding: "20px", background: "white", gap: "20px", borderBottom: "1px solid #ddd" }}>
        
        {/* Ảnh cửa hàng */}
        <div
          style={{
            width: "150px",
            height: "150px",
            background: "#e0e0e0",
            backgroundImage: store.image ? `url(${store.image})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "8px",
          }}
        >
          {!store.image && "Ảnh cửa hàng"}
        </div>

        {/* Thông tin cửa hàng */}
        <div>
          <h2>店舗管理ページ:{store.name || "Tên cửa hàng"}</h2>
          <p>住所: {store.adress || "..."}</p>
          <p>営業時間: {store.open || "..."}</p>
          <p>説明文 {store.description || "..."}</p>
        </div>
      </div>

      {/* Menu */}
      <div style={{ padding: "20px", position: "relative" }}>
        <h2>Menu</h2>

        <div
          ref={menuRef}
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "20px",
            paddingBottom: "10px",
            whiteSpace: "nowrap",
            scrollBehavior: "smooth",
          }}
        >
          {loading ? (
            <p>Đang tải menu...</p>
          ) : (
            foods.map((item, index) => (
              <div
                key={item.id}
                style={{
                  flex: "0 0 220px",
                  background: "white",
                  padding: "10px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
               <Link to={`/details/${item.id}`} style={{ display: "block" }}>
  <div
    style={{
      width: "100%",
      height: "150px",
      backgroundImage: `url(${item.image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: "5px",
      cursor: "pointer"
    }}
  />
</Link>


                <div style={{ marginTop: "10px" }}>
                  <h4>{item.name}</h4>
                  <p>Giá: {item.price} </p>
                </div>
              </div>
            ))
          )}
        </div>

        <button
          onClick={scrollRight}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            padding: "10px 15px",
            background: "#2ecc71",
            color: "white",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        >
          →
        </button>
      </div>

      
    </div>
  );
}

export default StorePage;
   