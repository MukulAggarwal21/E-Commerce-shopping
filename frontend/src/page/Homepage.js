import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Tooltip,
} from "@mui/material";
import { AddShoppingCart, Add } from "@mui/icons-material";
import CartContext from "../store/cart-context";
import { motion } from "framer-motion";

export default function Homepage(props) {
  const { isLoggedIn, search } = props;
  const [loading, setLoading] = useState(false);
  const [initialState, setInitialState] = useState([]);
  const [filteredState, setFilteredState] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const cart = useContext(CartContext);

  const fetchData = async () => {
    try {
      const result = await fetch("/api").then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Unable to fetch data.");
        }
      });
      setInitialState(result);
    } catch (e) {
      console.error(e.message);
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
      const result = initialState.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredState(result);
    }
  }, [search, initialState]);

  const handleClick = (id) => {
    if (isLoggedIn) {
      window.location = `/product/${id}`;
    } else {
      alert("Please log in to view or edit products.");
    }
  };

  const addToCart = (item) => {
    cart.setCartItems(item);
    setSnackbarMessage("Item added to cart!");
    setSnackbarOpen(true);
  };

  const handleAddClick = () => {
    window.location = "/product";
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "'Poppins', sans-serif" }}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: "center", marginBottom: "30px" }}
      >
        <Typography variant="h2" style={{ fontWeight: 700, color: "#3f51b5" }}>
          Welcome to Our Store
        </Typography>
        <Typography
          variant="subtitle1"
          style={{ color: "#6c757d", marginTop: "10px" }}
        >
          Discover amazing products tailored just for you.
        </Typography>
      </motion.div>

      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <CircularProgress size={60} thickness={5} />
          </motion.div>
        </div>
      ) : (
        <Grid container spacing={4} style={{ marginTop: "20px" }}>
          {(search.trim().length > 0 ? filteredState : initialState).map(
            (product, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ height: "100%" }}
                >
                  <Card
                    style={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                      transition: "all 0.3s",
                    }}
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
                        Quantity: {" "}
                        <b>
                          {product.quantity ? product.quantity : "Not Available"}
                        </b>
                      </Typography>
                      <Typography
                        variant="h6"
                        style={{ color: "#28a745", marginTop: "10px" }}
                      >
                        Price: ${product.price}
                      </Typography>
                    </CardContent>
                    <CardActions style={{ justifyContent: "space-between" }}>
                      {product.quantity ? (
                        <Tooltip title="Add to Cart" arrow>
                          <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddShoppingCart />}
                            onClick={() => addToCart(product)}
                          >
                            Add
                          </Button>
                        </Tooltip>
                      ) : (
                        <Typography
                          variant="body2"
                          color="error"
                          style={{ fontWeight: 600 }}
                        >
                          Out of Stock
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
                </motion.div>
              </Grid>
            )
          )}
        </Grid>
      )}

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        {isLoggedIn ? (
          <motion.div whileHover={{ scale: 1.1 }}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Add />}
              onClick={handleAddClick}
            >
              Add a New Product
            </Button>
          </motion.div>
        ) : (
          <Typography variant="h6" color="textSecondary">
            Please log in to add, edit, or delete products.
          </Typography>
        )}
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
