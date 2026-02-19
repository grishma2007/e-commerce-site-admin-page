import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu } from "antd";
import axios from "axios";

const { SubMenu } = Menu;
axios.defaults.withCredentials = true;

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState({
    productId: "",
    name: "",
    price: "",
    discountPrice: "",
    brand: "",
    category: "",
    description: "",
    image: "",
  });


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://e-commerce-backend-node-js-eyecore.vercel.app/products");
        // setProducts(res.data);

        if (res.data.length > 0) {
          let productToEdit;
          if (id) {
            productToEdit = res.data.find((p) => p._id === id);
          }

          if (!productToEdit) {
            productToEdit = res.data[0];
            navigate(`/products/edit/${productToEdit._id}`);
          }

          setSelected(productToEdit);

          setForm({
            productId: productToEdit.productId || "",
            name: productToEdit.name || "",
            price: productToEdit.price || "",
            discountPrice: productToEdit.discountPrice || "",
            brand: productToEdit.brand || "",
            category: productToEdit.category || "",
            description: productToEdit.description || "",
            image: productToEdit.image || "",
          });
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchProducts();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProduct = async () => {
    try {
      await axios.put(
        `https://e-commerce-backend-node-js-eyecore.vercel.app/products/${selected._id}`,
        form
      );
      alert("Product updated successfully ✅");
      navigate("/products/all");
    } catch (err) {
      alert("Update failed ❌");
    }
  };

  return (
    <div className="app-layout d-flex">
      <aside className="sidebar">
        <div className="sidescroll">
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            defaultOpenKeys={["products"]}
            className="sidebar-menu"
          >
            <Menu.Item key="/info">
              <NavLink to="/info">
                <span className="sidebar-title">DASHBOARD</span>
              </NavLink>
            </Menu.Item>

            <SubMenu
              key="products"
              title={<span className="sidebar-title">PRODUCTS</span>}
            >
              <Menu.Item key="/products/add">
                <NavLink to="/products/add">Add Product</NavLink>
              </Menu.Item>

              <Menu.Item key="/products/all">
                <NavLink to="/products/all">All Products</NavLink>
              </Menu.Item>

              <Menu.Item >
                <NavLink >Edit Product</NavLink>
              </Menu.Item>
            </SubMenu>
       <SubMenu  key="Order"  title={<span className="sidebar-title">ORDER</span>}>
        <Menu.Item key="/Order/OrderList">
          <NavLink to="/Order/OrderList">Order List</NavLink>
        </Menu.Item>

         <Menu.Item key="/Order/OrderDetails">
          <NavLink to="/Order/OrderDetails">Order Details</NavLink>
         </Menu.Item>
         </SubMenu>
          </Menu> 
        </div>
      </aside>

      <div className="right-pr">
        <header className="product-head">
          <h3>EDIT PRODUCT</h3>
        </header>

        <main className="content-pr">
          <div className="details d-flex">
            {/* LEFT */}
            <div className="left-pr">
              <h5>Basic Info</h5>

              <div className="pricing d-flex">
                <div className="field me-3">
                  <label>Product ID</label>
                  <input
                    type="text"
                    name="productId"
                    value={form.productId}
                    onChange={handleChange}
                  />
                </div>

                <div className="field">
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="pricing d-flex">
                <div className="field me-3">
                  <label>Price</label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                  />
                </div>

                <div className="field">
                  <label>Discounted Price</label>
                  <input
                    type="number"
                    name="discountPrice"
                    value={form.discountPrice}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="pricing d-flex">
                <div className="field me-3">
                  <label>Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={form.brand}
                    onChange={handleChange}
                  />
                </div>

                <div className="field">
                  <label>Category</label>
                  <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="field">
                <label>Description</label>
                <textarea
                  className="txt-area"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              <div className="btn-group">
                <button
                  className="primary-btn me-3"
                  onClick={() => navigate("/products/all")}
                >
                  Cancel
                </button>

                <button
                  className="primary-btn"
                  onClick={handleUpdateProduct}
                >
                  SAVE
                </button>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="rg-pr">
              {form.image && (
                <img
                  src={`http://localhost:5000/${form.image}`}
                  alt=""
                  style={{ width: "100%", borderRadius: 12 }}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditProduct;
