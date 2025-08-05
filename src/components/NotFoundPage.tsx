import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#fff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        textAlign: "center",
        padding: "0 20px",
      }}
    >
      <h1 style={{ fontSize: "8rem", margin: 0 }}>404</h1>
      <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>
        Oops! Page Not Found
      </h2>
      <p
        style={{ fontSize: "1.2rem", maxWidth: "400px", marginBottom: "30px" }}
      >
        The page you are looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/auth/login")}
        style={{
          padding: "12px 30px",
          fontSize: "1rem",
          backgroundColor: "#fff",
          color: "#764ba2",
          border: "none",
          borderRadius: "30px",
          cursor: "pointer",
          boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#f1f1f1")
        }
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default NotFoundPage;
