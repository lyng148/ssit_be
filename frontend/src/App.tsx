import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import Index from "./pages/Index";
import Settings from "./pages/settings/Settings";
import Profile from "./pages/user/Profile";
import NotFound from "./pages/NotFound";
import Landing from "./pages/landing/Landing";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Admin from "./pages/admin/Admin";
import UserManagement from "./pages/user/UserManagement";
import UserCreate from "./pages/user/UserCreate";
import UserEdit from "./pages/user/UserEdit";
import UserDetail from "./pages/user/UserDetail";
import TasksPage from "./pages/task/TasksPage";
import GroupsPage from "./pages/group/GroupsPage";
import CreateGroupPage from "./pages/group/CreateGroupPage";
import GroupAnalyzePage from "./pages/group/GroupAnalyzePage";
import GroupManagePage from "./pages/group/GroupManagePage";
import AdminAnalyzePage from "./pages/admin/AdminAnalyzePage";
import ProjectCreate from "./pages/project/ProjectCreate";
import ProjectDetails from "./pages/project/ProjectDetails";
import ProjectEdit from "./pages/project/ProjectEdit";
import ProtectedRoute from "./components/ProtectedRoute";
import ProjectAnalyzePage from "./pages/project/ProjectAnalyzePage";
import FreeRiderDetectionPage from "./pages/project/FreeRiderDetectionPage";
import FreeRiderEvidenceDetailPage from "./pages/project/FreeRiderEvidenceDetailPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <NotificationProvider>        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute roles={["ADMIN"]}>
                <Admin />
              </ProtectedRoute>
            } />
            {/* User Management Routes */}
            <Route path="/admin/users" element={
              <ProtectedRoute roles={["ADMIN"]}>
                <UserManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/users/create" element={
              <ProtectedRoute roles={["ADMIN"]}>
                <UserCreate />
              </ProtectedRoute>
            } />
            <Route path="/admin/users/:id" element={
              <ProtectedRoute roles={["ADMIN"]}>
                <UserDetail />
              </ProtectedRoute>
            } />
            <Route path="/admin/users/:id/edit" element={
              <ProtectedRoute roles={["ADMIN"]}>
                <UserEdit />
              </ProtectedRoute>
            } />
            {/* Project Management Routes */}
            <Route path="/projects/create" element={
              <ProtectedRoute roles={["INSTRUCTOR", "ADMIN"]}>
                <ProjectCreate />
              </ProtectedRoute>
            } />
            <Route path="/projects/:projectId/details" element={
              <ProtectedRoute>
                <ProjectDetails />
              </ProtectedRoute>
            } />
            <Route path="/projects/:projectId/edit" element={
              <ProtectedRoute roles={["INSTRUCTOR", "ADMIN"]}>
                <ProjectEdit />
              </ProtectedRoute>
            } />
            <Route path="/projects/:projectId/groups" element={
              <ProtectedRoute>
                <GroupsPage />
              </ProtectedRoute>
            } />
            <Route path="/projects/:projectId/groups/:groupId" element={
              <ProtectedRoute>
                <GroupsPage />
              </ProtectedRoute>
            } />
            <Route path="/projects/:projectId/groups/:groupId/manage" element={
              <ProtectedRoute>
                <GroupManagePage />
              </ProtectedRoute>
            } />
            <Route path="/projects/:projectId/create-group" element={
              <ProtectedRoute>
                <CreateGroupPage />
              </ProtectedRoute>
            } />
            <Route path="/projects/:projectId/tasks" element={
              <ProtectedRoute>
                <TasksPage />
              </ProtectedRoute>
            } />
            <Route path="/projects/:projectId/groups/:groupId/analyze" element={
              <ProtectedRoute>
                <GroupAnalyzePage />
              </ProtectedRoute>
            } />            <Route path="/projects/:projectId/project-analyze" element={
              <ProtectedRoute>
                <ProjectAnalyzePage />
              </ProtectedRoute>
            } />
            <Route path="/projects/:projectId/free-rider-detection" element={
              <ProtectedRoute roles={["ADMIN", "INSTRUCTOR", "STUDENT"]}>
                <FreeRiderDetectionPage />
              </ProtectedRoute>
            } />            <Route path="/projects/:projectId/admin-analyze" element={
              <ProtectedRoute roles={["ADMIN", "INSTRUCTOR"]}>
                <AdminAnalyzePage />
              </ProtectedRoute>
            } />
            {/* Global Free-Rider Detection Route */}            <Route path="/freerider-detection" element={
              <ProtectedRoute roles={["INSTRUCTOR", "ADMIN"]}>
                <FreeRiderDetectionPage />
              </ProtectedRoute>
            } />
            <Route path="/freerider-detection/evidence/:projectId/:userId" element={
              <ProtectedRoute roles={["INSTRUCTOR", "ADMIN"]}>
                <FreeRiderEvidenceDetailPage />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<NotFound />} />          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </NotificationProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
