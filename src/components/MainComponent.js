import React, { Component } from "react";
import Menu from "./MenuComponent";
import DishDetail from "./DishdetailComponent";
import { DISHES } from "../shared/dishes";
import { COMMENTS } from "../shared/comments";
import { LEADERS } from "../shared/leaders";
import { PROMOTIONS } from "../shared/promotions";

import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import { Routes, Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

class Main extends Component {
  constructor(props) {
    super(props);
  }
  onDishSelect(id) {
    this.setState({ selectedDish: id });
  }

  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route
            path="home/*"
            element={
              <Home
                dish={this.props.dishes.filter((dish) => dish.featured)[0]}
                promotion={
                  this.props.promotions.filter(
                    (promotion) => promotion.featured
                  )[0]
                }
                leader={
                  this.props.leaders.filter((leader) => leader.featured)[0]
                }
              />
            }
          />
          <Route path="menu/*" element={<Menu dishes={this.props.dishes} />} />
          <Route
            path="/menu/:dishId"
            element={
              <DishDetail
                dishes={this.props.dishes}
                comments={this.props.comments}
              />
            }
          />
          <Route path="contactus/*" element={<Contact />} />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route
            path="/aboutus/*"
            element={<About leaders={this.props.leaders} />}
          />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Main);
