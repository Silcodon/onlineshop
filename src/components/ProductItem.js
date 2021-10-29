import React from "react";

const ProductItem = props => {
  const { product } = props;
  const { user } = props;
  return (
    <div className=" column is-half">
      <div className="box">
        <div className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img
                src={product.image}
                alt={product.shortDesc}
              />
            </figure>
          </div>
          <div className="media-content">
            <b style={{ textTransform: "capitalize" }}>
              {product.name}{" "}
              <span className="tag is-primary">${product.price}</span>
            </b>
            <div>{product.shortDesc}</div>
            {product.stock > 0 ? (
              <small>{product.stock + " em Stock"}</small>
            ) : (
              <small className="has-text-danger">Sem Stock</small>
            )}
            <div className="is-clearfix">
              <button
                className="button is-small is-outlined is-primary   is-pulled-right"
                onClick={() =>
                  props.addToCart({
                    id: product.name,
                    product,
                    amount: 1
                  })
                }
              >
                Comprar
              </button>
            </div>
            {user && user.accessLevel < 1 && (
            <div
            className="media-right"
            onClick={() => props.deleteProduct(product.id,product)}
            >
            <span className="delete is-large"></span>
          </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;