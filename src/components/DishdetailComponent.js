import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }
  handleSubmit(values) {
    alert(JSON.stringify(values));
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Button outline className="" onClick={this.toggleModal}>
            Submit Comment
          </Button>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group mt-4">
                  <Label htmlFor="author" md={2}>
                    Author
                  </Label>
                  <Col md={10}>
                    <Control.text
                      model=".author"
                      id="author"
                      name="author"
                      placeholder="Author"
                      className="form-control"
                      validators={{
                        minLength: minLength(3),
                        maxLength: maxLength(15),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".author"
                      show="touched"
                      messages={{
                        minLength: "Must be greater than 3 characters",
                        maxLength: "Must be 15 characters or less",
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group mt-4">
                  <Label htmlFor="rating" md={2}>
                    Rating
                  </Label>
                  <Col md={10}>
                    <Control.select
                      model=".rating"
                      id="rating"
                      name="rating"
                      className="form-control"
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Control.select>
                  </Col>
                </Row>
                <Row className="form-group mt-4">
                  <Label htmlFor="comment" md={2}>
                    Comment
                  </Label>
                  <Col md={10}>
                    <Control.textarea
                      model=".comment"
                      id="comment"
                      name="comment"
                      placeholder="Leave a comment"
                      className="form-control"
                      rows={6}
                    />
                  </Col>
                </Row>
                <Row className="form-group mt-4">
                  <Col md={{ size: 10, offset: 9 }}>
                    <Button type="submit" color="primary">
                      Submit
                    </Button>
                  </Col>
                </Row>
              </LocalForm>
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}

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
        <CommentForm />
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
          <RenderComments comments={comment} />
        </div>
      </div>
    </div>
  );
};

export default DishDetail;
