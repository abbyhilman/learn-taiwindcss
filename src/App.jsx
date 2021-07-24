import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import DropDown from "./component/DropDown";
import Footer from "./component/Footer";
import MyNavbar from "./component/MyNavbar";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Admin from "./pages/Admin";
import History from "./pages/History";

import { connect } from "react-redux";
import { userKeepLogin, checkStorage } from "./redux/actions/user";
import { getCartData } from "./redux/actions/cart";

class App extends React.Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  componentDidMount() {
    const useLocalStorage = localStorage.getItem("userDataEmmerce");

    if (useLocalStorage) {
      const userData = JSON.parse(useLocalStorage);
      this.props.userKeepLogin(userData);
      this.props.getCartData(userData.id);
    } else {
      this.props.checkStorage();
    }

    const hideMenu = () => {
      if (window.innerWidth > 768 && this.state.isOpen) {
        this.setState({ isOpen: false });
      }
    };

    window.addEventListener("resize", hideMenu);

    return () => {
      window.removeEventListener("resize", hideMenu);
    };
  }
  render() {
    if (this.props.userGlobal.storageIsChecked) {
      return (
        <BrowserRouter>
          <MyNavbar toggle={() => this.toggle()} isOpen={this.state.isOpen} />
          <DropDown isOpen={this.state.isOpen} toggle={() => this.toggle()} />
          <Switch>
            <Route component={Product} path="/product" />
            <Route component={Login} path="/login" />
            <Route component={Register} path="/register" />
            <Route component={Admin} path="/admin" />
            <Route component={History} path="/history" />
            <Route component={Home} path="/" />
          </Switch>
          <Footer />
        </BrowserRouter>
      );
    } else {
      return (
        <div className="flex justify-center items-center bg-gray-900 h-screen">
          <div className="bg-blue-600 p-2  w-4 h-4 rounded-full animate-bounce blue-circle"></div>
          <div className="bg-green-600 p-2 w-4 h-4 rounded-full animate-bounce green-circle mx-1"></div>
          <div className="bg-red-600 p-2  w-4 h-4 rounded-full animate-bounce red-circle"></div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  userKeepLogin,
  checkStorage,
  getCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
