import "./Order.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import SubMenu from "antd/es/menu/SubMenu";

const OrderDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
useEffect(() => {
  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/orders",
        { withCredentials: true }
      );

      setOrder(res.data);

      if (res.data.length > 0) {
        let orderToShow;

        // CASE 1: clicked from order list
        if (id) {
          orderToShow = res.data.find((o) => o._id === id);
        }

        // CASE 2: clicked from sidebar OR invalid id
        if (!orderToShow) {
          orderToShow = res.data[0]; // FIRST ORDER
          navigate(`/Order/OrderDetails/${orderToShow._id}`);
        }

        setOrder(orderToShow);
      }
    } catch (err) {
      console.error("Fetch orders error:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, [id, navigate]);
  if (loading) return <div className="loading">Loading...</div>;
  if (!order) return null;

  const orderDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="app-layout d-flex">

      {/* SIDEBAR (UNCHANGED) */}
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
                  <NavLink to="/Order/OrderDetails">
                    Order Details
                  </NavLink>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </div>
        </aside>


      {/* RIGHT CONTENT */}
      <div className="right">
      
          <div className="order-details-wrapper">

            {/* HEADER */}
            <div className="order-header-section">
              <h2>Order #{order._id.slice(-6).toUpperCase()}</h2>
              <hr />
              <div className="order-meta">
                Order Placed On : {orderDate} • {order.items.length} items • Total ₹₹{order.totalAmount.toFixed(2)}
              </div>
              <hr />
            </div>

            {/* MAIN GRID */}
            <div className="order-grid">

              {/* LEFT : ITEMS */}
              <div className="items-section">
                <div className="section-header">ITEMS</div>

                {/* SCROLLABLE ITEMS */}
                <div className="items-body">
                  {order.items.map((item, i) => (
                    <div className="item-row" key={i}>
                      <div className="item-img">
                        <img
                          src={item.image || "/placeholder.png"}
                          alt={item.name}
                          onError={(e) => (e.target.src = "/placeholder.png")}
                        />
                      </div>

                      <div className="item-info">
                        <div className="item-name">{item.name}</div>
                        <div className="item-sub">Category</div>
                      </div>

                      <div className="item-qty">x{item.quantity}</div>
                      <div className="item-price">₹{item.price}</div>
                    </div>
                  ))}
                </div>

                {/* PRICING (STICKY BOTTOM) */}
                <div className="pricing">
                  <div><span>Subtotal</span><span>₹₹{order.totalAmount.toFixed(2)}</span></div>
                  <div><span>Shipping</span><span>₹0.00</span></div>
                  <div><span>Tax (GST)</span><span>₹0.00</span></div>
                  <div className="total"><span>Total</span><span>₹₹{order.totalAmount.toFixed(2)}</span></div>
                </div>
              </div>

              {/* RIGHT : 2x2 INFO CARDS */}
              <div className="info-column-vertical">

                <div className="info-card">
                  <h4>Summary</h4>
                  <p><span>Order ID</span>{order._id.slice(0, 10)}...</p>
                  <p><span>Date</span>{orderDate}</p>
                  <p><span>Total</span>₹{order.totalAmount}</p>
                </div>

                <div className="info-card">
                  <h4>Payment</h4>
                  <p>
                    <span>Status</span>
                    <span className={`badge ${order.isPaid ? "paid" : "unpaid"}`}>
                      {order.isPaid ? "PAID" : "UNPAID"}
                    </span>
                  </p>
                  <p><span>Order Status</span>{order.status}</p>
                </div>

                <div className="info-card">
                  <h4>Shipping Address</h4>
                  <div className="address">
                    <strong>{order.customer.firstName} {order.customer.lastName}</strong>
                    <div>{order.customer.address}</div>
                    <div>{order.customer.city}, {order.customer.postalCode}</div>
                    <div>{order.customer.country}</div>
                    <div>+91 9876543210</div>
                  </div>
                </div>

                <div className="info-card">
                  <h4>Order Tracking</h4>
                  <ul className="tracking">
                    <li className="done">Order Placed</li>
                    <li className="done">Processing</li>
                    <li>Shipped</li>
                    <li>Delivered</li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
       
      </div>
    </div>
  );
};

export default OrderDetails;
