import React from "react";
import Axios from "axios";
import { API_URL } from "../constants/API";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCartData } from "../redux/actions/cart";

class ProductCard extends React.Component {
  addToCartHandler = () => {
    // Check apakah user sudah memiliki barang tsb in cart
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId: this.props.userGlobal.id,
        productId: this.props.productData.id,
      },
    }).then((res) => {
      if (res.data.length) {
        // Barang sudah ada di cart user
        Axios.patch(`${API_URL}/carts/${res.data[0].id}`, {
          quantity: res.data[0].quantity + 1,
        })
          .then(() => {
            alert("Berhasil menambahkan barang");
            this.props.getCartData(this.props.userGlobal.id);
          })
          .catch(() => {
            alert("Terjadi Kesalahan di server");
          });
      } else {
        // Ketika barangnya blm ada di cart user
        Axios.post(`${API_URL}/carts`, {
          userId: this.props.userGlobal.id,
          productId: this.props.productData.id,
          price: this.props.productData.price,
          productName: this.props.productData.productName,
          productImage: this.props.productData.productImage,
          quantity: 1,
        })
          .then(() => {
            alert("Berhasil menambahkan barang");
            this.props.getCartData(this.props.userGlobal.id);
          })
          .catch(() => {
            alert("Terjadi Kesalahan di server");
          });
      }
    });
  };
  render() {
    return (
      <div className="flex flex-col justify-center items-center bg-white h-screen font-mono py-40">
        <img
          src={this.props.productData.productImage}
          className="h-full rounded mb-20 shadow"
        />
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-xl mb-2">{this.props.productData.productName}</h2>

          <span>Rp.{this.props.productData.price}</span>

          <button
            onClick={this.addToCartHandler}
            className="bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 rounded-md p-2 my-2"
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  getCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
