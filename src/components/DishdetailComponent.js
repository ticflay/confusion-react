import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

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
  const { dishes, comments } = props;
  let { dishId } = useParams();
  const dish = dishes.filter((dish) => dish.id === parseInt(dishId, 10))[0];
  const comment = comments.filter(
    (comment) => comment.dishId === parseInt(dishId, 10)
  );
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{dish.name}</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <RenderDish dish={dish} />
          </Card>
        </div>
        <div className="col-12  col-md-5 m-1">
          <RenderComments comments={comments} />
        </div>
      </div>
    </div>
  );
};

export default DishDetail;
