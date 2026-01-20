import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import Home from "./pages/homepage/Home";
import About from "./pages/about/About";
import Products from "./pages/products/Products";
import Contact from "./pages/contact/Contact";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Bulletins from "./pages/bulletin/Bulletin";
import Dashboard from "./pages/dashboard/Dashboard";
import ManageUsers from "./pages/user-management/UserManagement";
import ManageBulletins from "./pages/manage-bulletins/BulletinManagement";
import ManageProducts from "./pages/manage-products/ManageProducts";
import AnimatedPage from "./components/common/AnimatedPage";

// Wrapper component to use useLocation
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <AnimatedPage>
                <Home />
              </AnimatedPage>
            }
          />
          <Route
            path="/about"
            element={
              <AnimatedPage>
                <About />
              </AnimatedPage>
            }
          />
          <Route
            path="/products"
            element={
              <AnimatedPage>
                <Products />
              </AnimatedPage>
            }
          />
          <Route
            path="/bulletin"
            element={
              <AnimatedPage>
                <Bulletins />
              </AnimatedPage>
            }
          />
          <Route
            path="/contact"
            element={
              <AnimatedPage>
                <Contact />
              </AnimatedPage>
            }
          />
          <Route
            path="/login"
            element={
              <AnimatedPage>
                <Login />
              </AnimatedPage>
            }
          />
          <Route
            path="/register"
            element={
              <AnimatedPage>
                <Register />
              </AnimatedPage>
            }
          />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin", "hr_user", "sales_user"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <AnimatedPage>
                <Dashboard />
              </AnimatedPage>
            }
          />
          <Route
            path="users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AnimatedPage>
                  <ManageUsers />
                </AnimatedPage>
              </ProtectedRoute>
            }
          />
          <Route
            path="products"
            element={
              <ProtectedRoute allowedRoles={["admin", "sales_user"]}>
                <AnimatedPage>
                  <ManageProducts />
                </AnimatedPage>
              </ProtectedRoute>
            }
          />
          <Route
            path="bulletins"
            element={
              <ProtectedRoute allowedRoles={["admin", "hr_user"]}>
                <AnimatedPage>
                  <ManageBulletins />
                </AnimatedPage>
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
