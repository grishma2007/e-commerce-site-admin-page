import "./Order.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu } from "antd";
import { FaRegEye, FaTrash } from "react-icons/fa";
import SubMenu from "antd/es/menu/SubMenu";

const OrderList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders", {
        withCredentials: true,
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error("Order fetch failed", err);
      });
  }, []);

const filteredOrders = orders.filter((order) => {
    const fullName =
      `${order.customer.firstName} ${order.customer.lastName}`.toLowerCase();

    return (
      fullName.includes(search.toLowerCase()) ||
      order.status.toLowerCase().includes(search.toLowerCase()) ||
      order._id.toLowerCase().includes(search.toLowerCase())
    );
  });
   
 const Decline = async (id) => { 
    if (!window.confirm("Are you sure you want to Decline this order?")) return;

    try {
 

      await axios.put(`http://localhost:5000/api/orders/${id}/cancel`, 
        { status: "Cancelled by Seller" }, 
        { withCredentials: true }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status: "Cancelled by Seller" } : order
        )
      );
    } catch (err) {
      console.error("Decline failed", err);
      alert("Failed to decline order.");
    }
  };
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "cancelled":
        return "status-cancelled"; 
      case "delivered":
        return "status-delivered";  
      case "processing":
       return "status-processing"; 
      case "shipped":
       return "status-shipped"; 
      default:
        return "status-default";           
    }
  };
  return (
    <>
      <div className="app-layout d-flex">
        {/* ================= SIDEBAR ================= */}
        <aside className="sidebar">
          <div className="sidescroll">
            <Menu
              mode="inline"
              selectedKeys={[location.pathname]}
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
              </SubMenu>

              <SubMenu
                key="Order"
                title={<span className="sidebar-title">ORDER</span>}
              >
                <Menu.Item key="/Order/OrderList">
                  <NavLink to="/Order/OrderList">Order List</NavLink>
                </Menu.Item>

                <Menu.Item key="/Order/OrderDetails">
                  <NavLink to="/Order/OrderDetails/1">
                    Order Details
                  </NavLink>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </div>
        </aside>

        {/* ================= RIGHT SIDE ================= */}
        <div className="right">
          <main className="content-area">
            <div className="content-table-wrapper">
              <div className="table-header">
                <h2 className="table-title">Order List</h2>
                <div className="table-header-right">
                  <input
                    type="text"
                    className="table-search"
                    placeholder="Search orders..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* TABLE */}
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ORDER ID</th>
                    <th>DATE</th>
                    <th>CUSTOMER</th>
                    <th>PAID</th>
                    <th>ITEMS</th>
                    <th>TOTAL</th> 
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id.slice(-6).toUpperCase()}</td>
                        <td>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          {order.customer.firstName}{" "}
                          {order.customer.lastName}
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              order.isPaid ? "paid" : "unpaid"
                            }`}
                          >
                            {order.isPaid ? "Paid" : "Unpaid"}
                          </span>
                        </td>
                        <td>{order.items.length}</td>

                        <td>₹{order.totalAmount.toFixed(2)}</td>
                       <td>
                          <span className={`badge ${getStatusClass(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="actions d-flex justify-content-around">
                          {/* <button
                            className="btn-view"
                            onClick={() =>
                              navigate(
                                `/Order/OrderDetails/${order._id}`
                              )
                            }
                          > */}

                          {/* </button> */}
                            <FaRegEye className="btn-view" onClick={() =>navigate(`/Order/OrderDetails/${order._id}`)} />
                            <FaTrash className="decline" onClick={()=>Decline(order._id)}/>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8">no data Found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default OrderList;
