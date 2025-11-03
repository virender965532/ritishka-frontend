import React from "react";

const CareerPage = () => {
  return (
    <div style={styles.container}>
      {/* Header Section */}
      <h1 style={styles.title}>Careers at Ritishka</h1>
      <p style={styles.subtitle}>
        Join us in redefining sterling silver jewellery with passion and creativity.
      </p>

      {/* About Section */}
      <section style={styles.section}>
        <h2 style={styles.heading}>About Working at Ritishka</h2>
        <p style={styles.text}>
          At Ritishka, we foster a culture of creativity, craftsmanship, and authenticity. 
          Our team benefits from continuous learning, growth opportunities, and a supportive 
          work environment.
        </p>
      </section>

      {/* Current Openings */}
      <section style={styles.noticeBox}>
        <span style={styles.icon}>🚫</span>
        <div>
          <strong>Currently, we don’t have any open positions.</strong>
          <p style={styles.textSmall}>But we’d love to stay connected with you!</p>
        </div>
      </section>

      {/* Stay Connected Section */}
      <section style={styles.section}>
        <h2 style={styles.heading}>Stay Connected</h2>
        <p style={styles.text}>
          If you’d like to be considered for upcoming opportunities, send your resume to{" "}
          <a href="mailto:ritishkasilver@gmail.com" style={styles.email}>
            ritishkasilver@gmail.com
          </a>{" "}
          and we’ll get in touch when a role opens up.
        </p>
        <a href="mailto:ritishkasilver@gmail.com" style={styles.button}>
          Send Your CV
        </a>
      </section>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "40px 20px",
    textAlign: "center",
    color: "#333",
  },
  title: {
    fontSize: "2.2rem",
    fontWeight: "700",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "40px",
    color: "#555",
  },
  section: {
    marginBottom: "40px",
  },
  heading: {
    fontSize: "1.4rem",
    fontWeight: "600",
    marginBottom: "15px",
  },
  text: {
    fontSize: "1rem",
    lineHeight: "1.6",
    color: "#444",
  },
  noticeBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f4f4f4",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "40px",
    gap: "15px",
  },
  icon: {
    fontSize: "2rem",
  },
  textSmall: {
    fontSize: "0.95rem",
    color: "#666",
    marginTop: "5px",
  },
  email: {
    color: "#0066cc",
    textDecoration: "none",
    fontWeight: "bold",
  },
  button: {
    display: "inline-block",
    marginTop: "20px",
    backgroundColor: "#333",
    color: "#fff",
    padding: "12px 25px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default CareerPage;
