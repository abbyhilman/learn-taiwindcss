import React from "react";
import ProductCard from "../component/ProductCard";
import Axios from "axios";
import { API_URL } from "../constants/API";
import { Spinner } from "react-activity";
import "react-activity/dist/Spinner.css";

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
    loading: false,
  };

  fetchProduct = () => {
    this.setState({ loading: true });
    Axios.get(`${API_URL}/products`)
      .then((res) => {
        this.setState({
          productList: res.data,
          maxPage: Math.ceil(res.data.length / this.state.itemPerPage),
          filteredProductList: res.data,
          loading: false,
        });
      })
      .catch((err) => {
        alert("Terjadi Kesalahan di server");
        this.setState({ loading: false });
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
          .includes(this.state.searchProductName.toLowerCase().toString()) &&
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
      <div className="max-w-md mx-auto overflow-hidden md:max-w-6xl md:my-4 md:flex md:flex-row">
        <div className="md:flex md:flex-col mt-4">
          <div className="md:flex-shrink-0">
            <div className="text-start p-3 bg-gray-300">
              <strong>Filter Product</strong>
            </div>
            <div className="flex flex-col bg-gray-100 p-5">
              <label htmlFor="searchProductName">Product Name</label>
              <input
                onChange={this.inputHandler}
                type="text"
                name="searchProductName"
                className="form-input mb-3 px-5"
              />

              <label htmlFor="searchCategory">Product Category</label>
              <select
                onChange={this.inputHandler}
                name="searchCategory"
                className="form-input"
              >
                <option value="">All Items</option>
                <option value="kaos">Kaos</option>
                <option value="celana">Celana</option>
                <option value="aksesoris">Aksesoris</option>
              </select>
              <button
                onClick={this.searchButtonHandler}
                className="bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 rounded-md  mt-3 p-2"
              >
                Search
              </button>
            </div>
          </div>

          <div className="md:flex-shrink-0 mt-4 ">
            <div className="text-start p-3 bg-gray-300">
              <strong>Sort Product</strong>
            </div>
            <div className="flex flex-col bg-gray-100 p-5">
              <select
                onChange={this.inputHandler}
                name="sortBy"
                className="form-control"
              >
                <option value="">Default</option>
                <option value="lowPrice">Lowest Price</option>
                <option value="highPrice">Highest Price</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
              </select>
            </div>
          </div>

          <div className="md:flex-shrink-0">
            <div className="flex flex-row justify-between p-7">
              <button
                disabled={this.state.page === 1}
                className="bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 w-10 h-10 rounded-md"
                onClick={this.prevPageHandler}
              >
                {"<"}
              </button>
              <div className="text-center items-center">
                Page {this.state.page} of {this.state.maxPage}
              </div>
              <button
                disabled={this.state.page === 4}
                className="bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 w-10 h-10  rounded-md"
                onClick={this.nextPageHandler}
              >
                {">"}
              </button>
            </div>
          </div>
        </div>

        <div className="md:flex mx-5 my-5 md:flex-row flex-wrap justify-between">
          {this.state.loading ? (
            <div>
              <Spinner
                color="rgba(245, 158, 11)"
                size={32}
                speed={1}
                animating={true}
              />
            </div>
          ) : (
            this.renderProducts()
          )}
        </div>
      </div>
    );
  }
}

export default Product;
