import React, { useState, useEffect } from "react";
import Hero from "../component/Hero";
import Axios from "axios";
import { API_URL } from "../constants/API";
import ProductCard from "../component/ProductCard";

const Home = () => {
  const [productList, setProductList] = useState([]);
  const [itemPerPage, setItemPerPage] = useState(4);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = () => {
    Axios.get(`${API_URL}/products`)
      .then((res) => {
        setProductList(res.data);
        setMaxPage(Math.ceil(res.data.length / itemPerPage));
      })
      .catch((err) => {
        alert("Terjadi Kesalahan di server");
      });
  };

  const renderProducts = () => {
    const beginningIndex = (page - 1) * itemPerPage;
    let rowData = [...productList];

    const currentData = rowData.slice(
      beginningIndex,
      beginningIndex + itemPerPage
    );
    return currentData.map((item, index) => {
      return (
        <div key={index}>
          <ProductCard productData={item} />
        </div>
      );
    });
  };

  return (
    <>
      <Hero />
      {renderProducts()}
    </>
  );
};

export default Home;
