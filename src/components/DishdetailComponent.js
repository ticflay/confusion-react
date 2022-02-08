import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

function RenderDish({ dish }) {
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
function RenderComments({ comments }) {
  if (comments) {
    return (
      <Card>
        <h4>Comments</h4>
        <ul className="list-unstyled">
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
        </ul>
      </Card>
    );
  } else {
    return <div></div>;
  }
}
const DishDetail = (props) => {
  return (
    <div className="container">
      <div className="row col-12">
        <div className="col-12 col-md-5 m-1">
          <Card>
            <CardImg
              width="100%"
              src={props.dish.image}
              alt={props.dish.name}
            />
            <RenderDish dish={props.dish} />
          </Card>
        </div>
        <div className="col-12  col-md-5 m-1">
          <RenderComments comments={props.dish.comments} />
        </div>
      </div>
    </div>
  );
};

export default DishDetail;
