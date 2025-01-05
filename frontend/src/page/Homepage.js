import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { AddShoppingCart, Add } from "@mui/icons-material";
import CartContext from "../store/cart-context";

export default function Homepage(props) {
  const { isLoggedIn, search } = props;
  const [loading, setLoading] = useState(false);
  const [initialState, setInitialState] = useState([]);
  const [filteredState, setFilteredState] = useState([]);

  const cart = useContext(CartContext);

  const fetchData = async () => {
    try {
      const result = await fetch("/api").then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("not able to fetch data correctly");
        }
      });
      setInitialState(result);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    let isMounted = true;
    const loadData = async () => {
      await fetchData();
      if (isMounted) {
        setLoading(false);
        isMounted = false;
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (search.trim().length > 0 && initialState) {
      let result = initialState.filter(
        (each) =>
          each["title"].toLowerCase().includes(search.toLowerCase()) ||
          each["description"].toLowerCase().includes(search.toLowerCase())
      );
      setFilteredState(result);
    }
  }, [search, initialState]);

  const handleClick = (id) => {
    if (isLoggedIn) {
      window.location = "/product/" + id;
    } else {
      alert("Please log in to add, edit or delete the product!");
    }
  };

  const addToCart = (item) => {
    cart.setCartItems(item);
  };

  const handleAddClick = () => {
    window.location = "/product";
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h3" align="center" gutterBottom>
        Welcome to Our Store
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary">
        Browse our collection of amazing products!
      </Typography>

      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          {(search.trim().length > 0 ? filteredState : initialState).map(
            (product, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                    transition: "transform 0.2s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {product.description}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      style={{ marginTop: "10px" }}
                    >
                      Quantity:{" "}
                      <b>
                        {product.quantity ? product.quantity : "Not Available"}
                      </b>
                    </Typography>
                    <Typography variant="h6" color="primary">
                      Price: ${product.price}
                    </Typography>
                  </CardContent>
                  <CardActions
                    style={{
                      justifyContent: "space-between",
                      padding: "0 16px 16px",
                    }}
                  >
                    {product.quantity ? (
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddShoppingCart />}
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    ) : (
                      <Typography variant="body2" color="error">
                        <b>Out of Stock</b>
                      </Typography>
                    )}
                    <Button
                      variant="outlined"
                      onClick={() => handleClick(product.id)}
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            )
          )}
        </Grid>
      )}

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        {isLoggedIn ? (
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Add />}
            onClick={handleAddClick}
          >
            Add a New Product
          </Button>
        ) : (
          <Typography variant="h6" color="textSecondary">
            Please log in to add, edit, or delete products!
          </Typography>
        )}
      </div>
    </div>
  );
}
