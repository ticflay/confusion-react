import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

class DishDetail extends Component {
  renderDish(dish) {
    if (dish) {
      return (
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      );
    } else {
      return <div></div>;
    }
  }
  renderComments(comments) {
    if (comments) {
      return (
        <Card className="list-unstyled">
          <h4>Comments</h4>
          {comments.map((com) => {
            return (
              <CardBody key={com.id}>
                <CardText>{com.comment}</CardText>
                <CardText>{`-- ${com.author}, ${new Intl.DateTimeFormat(
                  "en-US",
                  { year: "numeric", month: "short", day: "2-digit" }
                ).format(new Date(Date.parse(com.date)))}`}</CardText>
              </CardBody>
            );
          })}
        </Card>
      );
    } else {
      return <div></div>;
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row col-12">
          <div className="col-12 col-md-5 m-1">
            <Card>
              <CardImg
                width="100%"
                src={this.props.dish.image}
                alt={this.props.dish.name}
              />
              {this.renderDish(this.props.dish)}
            </Card>
          </div>
          <div className="col-12  col-md-5 m-1">
            {this.renderComments(this.props.dish.comments)}
          </div>
        </div>
      </div>
    );
  }
}

export default DishDetail;
