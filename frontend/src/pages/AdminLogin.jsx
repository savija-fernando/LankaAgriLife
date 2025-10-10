// In your handleLogin function in AdminLogin.jsx
const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const res = await fetch("http://localhost:8070/AdminDetails/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // Save token and role
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminRole", data.admin.role || "Admin");
      localStorage.setItem("adminEmail", data.admin.email);

      console.log("Login successful", data);
      
      // Navigate to dashboard
      navigate("/dashboard/");
    } else {
      setError(data.message || "Login failed. Please try again.");
    }
  } catch (err) {
    console.error("Network error:", err);
    setError("An error occurred. Please check your connection.");
  } finally {
    setLoading(false);
  }
};