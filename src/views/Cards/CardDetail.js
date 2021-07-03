import React, { useState } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
// import { PropTypes } from "prop-types";
const CardDetail = (props) => {   
    return(         
            <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                         { props.detail.name}
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {props.detail.number}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> {props.detail.percent}
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
            </Col>
    );
}
export default CardDetail;
