import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { NavLink, useNavigate,useLocation} from "react-router-dom";
import { Menu } from "antd";
import Modal from 'react-bootstrap/Modal';
const { SubMenu } = Menu;

const Info = ()=>{
    const [Data,setdata] = useState([]);
    const [New,setnew] = useState([]);
    const [show,setshow] = useState(false);
    const [current,setcurrent] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
  
  
   useEffect(() => {
  axios.get('http://localhost:5000/info', { withCredentials: true })
    .then(res => {
      setdata(res.data);
    })
    .catch(err => {
      if (err.response?.status === 401) {
        navigate('/Login');
      }
    });
}, [New, navigate]); 

  const Delete = (_id)=>{
    
    axios.delete(`http://localhost:5000/info/${_id}`,{ withCredentials: true})
      .then((response)=>{ 
        setnew(response.data.user)
      })
      .catch((error)=>{
        console.log(error);
      });
  };
  const handleClose = ()=>{ 
    setshow(false);
  };
  const handleshow = (info)=>{
    setcurrent(info);
    setshow(true);
  };
const handlesave = async () => {

  try {
    const res = await axios.put(
      `http://localhost:5000/info/${current._id}`,
      current,{ withCredentials: true}
    );

    console.log("Update response:", res.data);

    setnew(res.data);
    setshow(false);    
    setcurrent(null);
  } catch (err) {
    console.error("Update failed:", err);
  }
};
return(
<>
<div className=" app-layout  d-flex">
  <aside className="sidebar">
    <div className="sidescroll">
      <div className="sidebar-section">
          
 <Menu  mode="inline"  selectedKeys={[location.pathname]}   className="sidebar-menu">
                {/* DASHBOARD */}
                <Menu.Item  key="/info" >
                  <NavLink to="/info" end
      >
                    <span className="sidebar-title">DASHBOARD</span>
                  </NavLink>
                </Menu.Item>

                {/* PRODUCTS ACCORDION */}
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
          <NavLink to="/Order/OrderDetails/:Id">Order Details</NavLink>
         </Menu.Item>
         </SubMenu>
              </Menu>
          </div>
      </div>
  </aside>    
   <div className="right">
     
    <main className="content-area">
      <div className="content-table-wrapper">
            <h2 className="table-title">User Details</h2>

      <table className="user-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="info">
                {Data.length >0?(Data.map((info) => (
                  <tr key={info._id}>
                    <td>{info.name}</td>
                    <td>{info.email}</td>
                    <td>{info.phone}</td>
                    <td className="actions">
                      <FaEdit className="edit" onClick={()=>handleshow(info)} />
                      <FaTrash className="delete" onClick={()=>Delete(info._id)} />
                    </td>
                  </tr>
          ))
        ):  (
          <tr><td>no data Found</td></tr>
          
        )}
         </tbody>
        </table>
        </div>
      </main>
  </div>
</div>
{/* -------------------------------------------------------------------- */}
  <Modal show={show}onHide={handleClose}centeredbackdrop="static"className="dashboard-modal">
  <Modal.Header closeButton className="dashboard-modal-header">
    <Modal.Title>Edit User</Modal.Title>
  </Modal.Header>

  <Modal.Body className="dashboard-modal-body">
    {current && (
      <form className="edit-form">
        <div className="form-group">
          <label>Name</label>
          <input  type="text"  name="name"  value={current.name}  onChange={(e) => setcurrent({ ...current, name: e.target.value })  }/>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input  type="email"  name="email"  value={current.email}  onChange={(e) =>setcurrent({ ...current, email: e.target.value })  }/>
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input  type="number"  name="phone"  value={current.phone}  onChange={(e) =>  setcurrent({ ...current, phone: e.target.value })  }/>
        </div>
      </form>
    )}
  </Modal.Body>

  <Modal.Footer className="dashboard-modal-footer">
    <button className="btn-cancel" onClick={handleClose}>
      Close
    </button>
    <button className="btn-save" onClick={handlesave}>
      Save Changes
    </button>
  </Modal.Footer>
</Modal>
        
</>
)
};
export default Info;