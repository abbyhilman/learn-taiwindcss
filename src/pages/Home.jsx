import React, { useState, useEffect } from "react";
import Hero from "../component/Hero";
import ProductCard from "../component/ProductCard";
import { setLoading } from "../redux/actions/global";
import { getProduct } from "../redux/actions/product";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state);
  const [itemPerPage, setItemPerPage] = useState(4);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getProduct(itemPerPage));
  }, [dispatch]);

  const renderProducts = () => {
    const beginningIndex = (page - 1) * itemPerPage;
    let rowData = [...product.productList];

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
