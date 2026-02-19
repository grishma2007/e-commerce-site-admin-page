import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate,NavLink } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Menu } from "antd";
axios.defaults.withCredentials = true;
const { SubMenu } = Menu;


const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => setProducts(res.data))   
  };

const handleEdit = (id) => {
  navigate(`/products/edit/${id}`);
};


  const handleDelete = async (id) => {

    await axios.delete(`http://localhost:5000/products/${id}`);
    fetchProducts();
    
  };
  
  return (
    <div className=" app-layout  d-flex">
  <aside className="sidebar">
    <div className="sidescroll">
      <div className="sidebar-section">
          
 <Menu  mode="inline"    selectedKeys={[location.pathname]} defaultOpenKeys={["products"]}  className="sidebar-menu">

    <Menu.Item  key="/info" >
      <NavLink to="/info" end>
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
            <NavLink to="/products/edit/:id">Edit Product</NavLink>
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
 {/* -------------------------------------------------------------------  */}
  <div className="right-product">
    <div className="content-area d-flex">
      <div className="content-table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className="product">
            {products.map((p) => (
              <tr key={p._id} >
                <td>
                  <img
                    src={`http://localhost:5000/${p.image}`}
                    alt=""
                    style={{ width: 50, height: 50, borderRadius: 8 }}
                    />
                </td>
                <td>{p.productId}</td>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.category}</td>
                <td className="actions">
                  <EditOutlined
                    className="edit"
                    onClick={() => handleEdit(p._id)}
                    />
                  <DeleteOutlined
                    className="delete"
                   onClick={()=>handleDelete(p._id)}
                    />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  </div>  

  );
};

export default AllProducts;
