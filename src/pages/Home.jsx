import React, { useState, useEffect } from "react";
import Hero from "../component/Hero";
import Axios from "axios";
import { API_URL } from "../constants/API";
import ProductCard from "../component/ProductCard";
import { Spinner } from "react-activity";
import "react-activity/dist/Spinner.css";

const Home = () => {
  const [productList, setProductList] = useState([]);
  const [itemPerPage, setItemPerPage] = useState(4);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = () => {
    setLoading(true);
    Axios.get(`${API_URL}/products`)
      .then((res) => {
        setLoading(false);
        setProductList(res.data);
        setMaxPage(Math.ceil(res.data.length / itemPerPage));
      })
      .catch((err) => {
        setLoading(false);
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
      {loading ? (
        <div className="flex justify-center mt-5">
          <Spinner
            color="rgba(245, 158, 11)"
            size={32}
            speed={1}
            animating={true}
          />
        </div>
      ) : (
        renderProducts()
      )}
    </>
  );
};

export default Home;
