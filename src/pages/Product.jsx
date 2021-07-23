import React from "react";
import ProductCard from "../component/ProductCard";
import Axios from "axios";
import { API_URL } from "../constants/API";

class Product extends React.Component {
  state = {
    productList: [],
    filteredProductList: [],
    page: 1,
    maxPage: 0,
    itemPerPage: 6,
    searchProductName: "",
    searchCategory: "",
    sortBy: "",
  };

  fetchProduct = () => {
    Axios.get(`${API_URL}/products`)
      .then((res) => {
        this.setState({
          productList: res.data,
          maxPage: Math.ceil(res.data.length / this.state.itemPerPage),
          filteredProductList: res.data,
        });
      })
      .catch((err) => {
        alert("Terjadi Kesalahan di server");
      });
  };

  renderProducts() {
    const beginningIndex = (this.state.page - 1) * this.state.itemPerPage;
    let rowData = [...this.state.filteredProductList];

    const compareString = (a, b) => {
      if (a.productName < b.productName) {
        return -1;
      }
      if (a.productName > b.productName) {
        return 1;
      }
      return 0;
    };

    switch (this.state.sortBy) {
      case "lowPrice":
        rowData.sort((a, b) => a.price - b.price);
        break;
      case "highPrice":
        rowData.sort((a, b) => b.price - a.price);
        break;
      case "az":
        rowData.sort(compareString);
        break;
      case "za":
        rowData.sort((a, b) => compareString(b, a));
        break;
      default:
        rowData = [...this.state.filteredProductList];
        break;
    }
    const currentData = rowData.slice(
      beginningIndex,
      beginningIndex + this.state.itemPerPage
    );
    return currentData.map((item, index) => {
      return (
        <div key={index}>
          <ProductCard productData={item} />
        </div>
      );
    });
  }

  nextPageHandler = () => {
    if (this.state.page < this.state.maxPage) {
      this.setState({ page: this.state.page + 1 });
    }
  };

  prevPageHandler = () => {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 });
    }
  };

  inputHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ [name]: value });
  };

  searchButtonHandler = () => {
    const filteredProductList = this.state.productList.filter((val) => {
      return (
        val.productName
          .toLowerCase()
          .includes(this.state.searchProductName.toLowerCase()) &&
        val.category
          .toLowerCase()
          .includes(this.state.searchCategory.toLowerCase())
      );
    });

    this.setState({
      filteredProductList,
      maxPage: Math.ceil(filteredProductList.length / this.state.itemPerPage),
      page: 1,
    });
  };

  componentDidMount() {
    this.fetchProduct();
  }

  render() {
    return (
      <div>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {this.renderProducts()}
            {/* <!-- /End replace --> */}
          </div>
        </main>
      </div>
    );
  }
}

export default Product;
