import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import DashboardLayout from "./components/layout/DashboardLayout";
import { ToastProvider } from "./components/ui/Toast";
import Login from "./pages/Login";
import Overview from "./pages/Overview";
import ValidationRequests from "./pages/ValidationRequests";
import VerificationReview from "./pages/VerificationReview";
import Chargers from "./pages/Chargers";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route path="/login" element={<Login />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route index element={<Overview />} />
                <Route path="validations" element={<ValidationRequests />} />
                <Route path="validations/:id" element={<VerificationReview />} />
                <Route path="chargers" element={<Chargers />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Route>
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
