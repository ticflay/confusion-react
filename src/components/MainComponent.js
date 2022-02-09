import React, { Component } from "react";
import Menu from "./MenuComponent";
import DishDetail from "./DishdetailComponent";
import { DISHES } from "../shared/dishes";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import { Routes, Route, Navigate } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null,
    };
  }
  onDishSelect(id) {
    this.setState({ selectedDish: id });
  }
  render() {
    const HomePage = () => {
      return <Home />;
    };

    const MenuPage = () => {
      return <Menu dishes={this.state.dishes} />;
    };

    return (
      <div>
        <Header />
        <Routes>
          <Route path="home/*" element={<Home />} />
          <Route path="menu/*" element={<Menu dishes={this.state.dishes} />} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>

        <Footer />
      </div>
    );
  }
}

export default Main;
