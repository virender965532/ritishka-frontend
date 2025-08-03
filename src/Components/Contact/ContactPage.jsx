import React, { useState } from "react";
import "./ContactPage.css";

const GOLD = "#ffebc6";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let temp = {};
    temp.name = form.name ? "" : "Name is required.";
    temp.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
      ? ""
      : "Valid email is required.";
    temp.message = form.message ? "" : "Message is required.";
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Custom email sending function (requires backend endpoint)
  const sendEmail = async (data) => {
    // You must implement /api/send-email on your backend to handle this POST
    const html = `
      <div style="background:#fff;padding:32px 24px;border-radius:12px;border:2px solid ${GOLD};font-family:sans-serif;max-width:600px;margin:auto;">
        <h2 style="color:${GOLD};margin-bottom:16px;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <div style="background:#f7f7f7;padding:16px;border-radius:8px;border:1px solid #eee;">${data.message.replace(/\n/g, "<br/>")}</div>
        <hr style="margin:32px 0 8px 0;border:0;border-top:1px solid ${GOLD};"/>
        <div style="font-size:13px;color:#bfa14a;">Sanjay and Company | A-79/16 Baba Colony Burari, Delhi, India 110084</div>
      </div>
    `;
    return fetch(`/api/send-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: "care@ritishka.in",
        subject: "New Contact Form Submission",
        html,
      }),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    if (!validate()) return;
    setLoading(true);
    try {
      await sendEmail(form);
      setSuccess("Thank you for contacting us! We will get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setSuccess("Something went wrong. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="contact-full-bg">
      <div className="contact-details-large">
        <h1 style={{ fontSize: "3rem", margin: "32px 0 12px 0", fontWeight: 900, letterSpacing: 2 }}>
          Sanjay and Company
        </h1>
        <div style={{ fontSize: "1.5rem", color: "#7c6f57", marginBottom: 8 }}>
          A-79/16 Baba Colony Burari, Delhi, India 110084
        </div>
        <div style={{ fontSize: "1.3rem", color: "#7c6f57", marginBottom: 8 }}>
          <span style={{ fontWeight: 700 }}>Email:</span> care@ritishka.in
        </div>
        <div style={{ fontSize: "1.3rem", color: "#7c6f57", marginBottom: 24 }}>
          <span style={{ fontWeight: 700 }}>Phone:</span> +91 9716620018
        </div>
      </div>
      <div className="contact-map-large">
        <iframe
          src="https://www.google.com/maps?q=A-79/16+Baba+Colony+Burari,+Delhi,+India+110084&output=embed"
          width="100%"
          height="500"
          allowFullScreen=""
          loading="lazy"
          title="Sanjay and Company Location"
          style={{ border: `4px solid ${GOLD}`, borderRadius: "20px", display: "block" }}
        ></iframe>
      </div>
      <div className="contact-form-large">
        <h2 style={{ fontSize: "2.2rem", fontWeight: 800, marginTop: 20, marginBottom: 20, textAlign: "center" }}>
          Get In Touch
        </h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group-large">
            <input
              type="text"
              name="name"
              value={form.name}
              placeholder="Your Name *"
              onChange={handleChange}
              required
              className={errors.name ? "input-error" : ""}
              style={{ fontSize: "1.2rem" }}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group-large">
            <input
              type="email"
              name="email"
              value={form.email}
              placeholder="Email Address *"
              onChange={handleChange}
              required
              className={errors.email ? "input-error" : ""}
              style={{ fontSize: "1.2rem" }}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group-large">
            <textarea
              name="message"
              rows={8}
              placeholder="Your Message *"
              value={form.message}
              onChange={handleChange}
              required
              className={errors.message ? "input-error" : ""}
              style={{ fontSize: "1.2rem" }}
            />
            {errors.message && <span className="error">{errors.message}</span>}
          </div>
          <button
            type="submit"
            className="gold-btn-large"
            disabled={loading}
            style={{
              background: GOLD,
              color: "#222",
              fontWeight: 700,
              fontSize: "1.3rem",
              padding: "22px 0",
              borderRadius: "10px",
              marginTop: "10px",
              width: "100%",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 2px 12px rgba(247,228,192,0.18)",
              transition: "background 0.2s",
            }}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
          {success && <div className="success-large">{success}</div>}
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
