import React from "react";

const PaymentSummary = ({ onPay }) => {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Appointment Summary</h2>

        <div style={styles.row}>
          <span>Doctor</span>
          <strong>Dr. Anil Kumar</strong>
        </div>

        <div style={styles.row}>
          <span>Date</span>
          <strong>14 July 2025</strong>
        </div>

        <div style={styles.row}>
          <span>Time</span>
          <strong>10:30 AM</strong>
        </div>

        <hr style={styles.divider} />

        <div style={styles.totalRow}>
          <span>Total Amount</span>
          <strong style={styles.amount}>₹499</strong>
        </div>

        <button style={styles.payBtn} onClick={onPay}>
          Pay & Confirm
        </button>

        <p style={styles.secureText}>🔒 100% Secure Payments via Razorpay</p>
      </div>
    </div>
  );
};

export default PaymentSummary;
