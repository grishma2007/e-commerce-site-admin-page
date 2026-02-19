import { NavLink, useLocation} from "react-router-dom";
import { useState } from "react";
import { Menu, message } from "antd";

// import { useNavigate } from "react-router-dom";
import axios from "axios";
const { SubMenu } = Menu;

const Products = () => {
const [image, setImage] = useState(null);
const [preview, setPreview] = useState(null);

const location = useLocation();

const [form, setForm] = useState({
    productId: "",       
    name: "",
    price: "",
    discountPrice: "",
    brand: "",
    category: "",
    description: "",

});

const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 
const handleDiscard = () => {
  setForm({
    productId: "",
    name: "", 
    price: "",
    discountPrice: "",
    brand: "",
    category: "",
    description: "",

  });
  setImage(null);
  setPreview(null);
};

const handleAddProduct = async () => {
    try {

      const data = new FormData();
      Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    if (image) {
      data.append("image", image);
    }
await axios.post("https://e-commerce-backend-node-js-eyecore.vercel.app/products", data, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});     
    message.success("Product added successfully");
      // console.log(form)
    } catch (err) {
      if (err.response && err.response.data.message) {
      message.error
      (err.response.data.message);
    } else {
      alert("Something went wrong");
    }
    }
  };
  const handleImageChange = (e) => {
  const file = e.target.files[0];
      // console.log(file);
  if (!file) return;

  setImage(file);
  setPreview(URL.createObjectURL(file));
};
    return(
        <>
        <div className=" app-layout  d-flex">
          <aside className="sidebar">
            <div className="sidescroll">
             <div className="sidebar-section">
              <Menu  mode="inline"  selectedKeys={[location.pathname]}  defaultOpenKeys={["products"]}  className="sidebar-menu">
                <Menu.Item  key="/info" >
                  <NavLink to="/info">
                    <span className="sidebar-title">DASHBOARD</span>
                  </NavLink>
                </Menu.Item>

                <SubMenu  key="products"  title={<span className="sidebar-title">PRODUCTS</span>}>
                  <Menu.Item key="/products/add">
                    <NavLink to="/products/add">Add Product</NavLink>
                  </Menu.Item>

                  <Menu.Item key="/products/all">
                    <NavLink to="/products/all">All Products</NavLink>
                  </Menu.Item>

                  <Menu.Item key="/products/edit">
                    <NavLink to="/products/edit/:Id">Edit Product</NavLink>
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
            </div>
          </aside>    
           <div className="right-pr">
                <header className=" product-head d-flex justify-content-between">
                  <h3>ADD NEW PRODUCT</h3>        
                </header>
                <main className="content-pr ">
                  <div className="details d-flex">
                    <div className="left-pr">
                        <h5 className="mb-3">Basic Info</h5>
                         <div className="pricing d-flex">
                            <div className="field me-3">
                               <label>Product ID</label>
                              <input  type="text"  name="productId"  value={form.productId}  onChange={handleChange}/>
                            </div>
                            <div className="field">
                                <label>Product Name</label>
                                <input  type="text"  name="name"  value={form.name}  onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="pricing d-flex">
                            <div className="field me-3">
                                <label>Price</label>
                                <input  type="number"  name="price"  value={form.price}  onChange={handleChange}/>
                            </div>
                            <div className="field">
                                <label>Discounted Price</label>
                                <input  type="number"  name="discountPrice"  value={form.discountPrice}  onChange={handleChange}/>
                            </div>                        
                        </div>
                        <div className="pricing d-flex">
                            <div className="field me-3">
                                <label>Brand</label>
                                 <input  type="text"  name="brand"  value={form.brand}  onChange={handleChange}/>
                            </div>
                            <div className="field">
                                <label>Category</label>
                                 <input  type="text"  name="category"  value={form.category}  onChange={handleChange}/>
                            </div>                        
                        </div>
                        <div className="field">
                            <label>Product Description</label><br />
                           <textarea  className="txt-area"  name="description"  value={form.description}  onChange={handleChange}/>
                        </div>
                        <div className="btn-group">
                          <button  className="primary-btn pr-btn me-3"  onClick={handleDiscard}>  Discard</button>  
                          <button className="primary-btn pr-btn"  onClick={handleAddProduct}>ADD</button>
                        </div>
                    </div>
                  <div className="rg-pr">
  <div id="drop-zone">

    <input
      type="file"
      id="file-input"
      accept="image/*"
      style={{ display: "none" }}
      onChange={handleImageChange}
    />

    <label htmlFor="file-input" className="upload-btn">
      Click to choose image
    </label>

    {preview && (
      <img
        src={preview}
        alt="Preview"
        style={{
          width: "100%",
          marginTop: "10px",
          borderRadius: "8px",
        }}
      />
    )}
  </div>
</div>

                  </div>
                    
                </main>
          </div>
              
        </div>
         
        </>

    )
};
export default Products;