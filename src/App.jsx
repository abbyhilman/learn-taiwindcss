import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import DropDown from "./component/DropDown";
import Footer from "./component/Footer";
import MyNavbar from "./component/MyNavbar";
import Home from "./pages/Home";
import Product from "./pages/Product";

class App extends React.Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  componentDidMount() {
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
    return (
      <BrowserRouter>
        <MyNavbar toggle={() => this.toggle()} />
        <DropDown isOpen={this.state.isOpen} toggle={() => this.toggle()} />
        <Switch>
          <Route component={Product} path="/product" />
          <Route component={Home} path="/" />
        </Switch>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
