import React, { useState } from "react";
import "./index.css";

function CoachingPackage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const paymentHandler = (e) => {
    e.preventDefault();
    alert("Payment integration here!");
  };

  return (
    <div className="coaching-container">
      {/* Left Section */}
      <div className="package-details">
        <h2>1-on-1 Coaching Package (3 Months)</h2>
        <p>This 1-on-1 training and nutrition coaching package includes:</p>
        <ul>
          <li>
            <strong>High-Level Coaching:</strong> Personalized science-based approach.
          </li>
          <li>
            <strong>Direct Communication:</strong> Quick responses via messaging.
          </li>
          <li>
            <strong>Individualised Training Program:</strong> Tailored to your needs.
          </li>
          <li>
            <strong>Individualised Nutrition Program:</strong> Meal plans, grocery lists, daily targets.
          </li>
        </ul>
        <p>Supplement Protocol: Provided on a need basis.</p>

        <div className="contact-section">
          <p><strong>Contact Us:</strong></p>
          <p>📧 saketgokhale00@gmail.com</p>
          <p>📞 9373686933</p>
        </div>

        <div className="terms">
          <p><strong>Terms & Conditions:</strong></p>
          <p>
            You agree to share information entered on this page with
            Saket Gokhale (owner of this page) and Razorpay,
            adhering to applicable laws.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="payment-form">
        <h3>Payment Details</h3>
        <form onSubmit={paymentHandler}>
          <div className="form-group">
            <label>3 Month Coaching Package</label>
            <input type="text" value="₹ 60,000.00" readOnly className="readonly" />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Pincode</label>
            <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
          </div>
          <button type="submit" className="pay-btn">Pay Now</button>
        </form>

        <div className="payment-icons">
          <p>UPI | VISA | RuPay | Netbanking</p>
        </div>
      </div>
    </div>
  );
}

export default CoachingPackage;
