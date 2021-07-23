import React from "react";
import Axios from "axios";
import { API_URL } from "../constants/API";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCartData } from "../redux/actions/cart";

class ProductCard extends React.Component {
  render() {
    return (
      <div className="flex flex-col justify-center items-center bg-white h-screen font-mono py-40">
        <img
          src={this.props.productData.productImage}
          className="h-full rounded mb-20 shadow"
        />
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-2xl mb-2">
            {this.props.productData.productName}
          </h2>
          <p className="mb-2">{this.props.productData.description}</p>
          <span>Rp.{this.props.productData.price}</span>
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
