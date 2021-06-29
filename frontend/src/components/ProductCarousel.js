import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listTopProductsAction } from "../actions/productActions";
import Loader from "./Loader";

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const productTopRated = useSelector((state) => state.productTopRated);
  const { products, loading, error } = productTopRated;

  useEffect(() => {
    dispatch(listTopProductsAction());
  }, [dispatch]);
  return loading ? (
    <Loader />
  ) : error ? (
    <div className="alert alert-danger">{error}</div>
  ) : (
    <Carousel pause="hover" className=" bg-dark">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image
              src={product.image}
              alt={product.name}
              fluid
              className="carousel-image"
            />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {" "}
                {product.name} (${product.price} )
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
