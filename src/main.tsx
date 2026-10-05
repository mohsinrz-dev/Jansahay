import { Toaster } from "@/components/ui/sonner";
import React, { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import { LanguageProvider } from "@/lib/i18n";
import { ProfileProvider } from "@/lib/profile";
import { SavedProvider } from "@/lib/saved";
import { AuthProvider } from "@/contexts/auth";

const Landing       = lazy(() => import("./pages/Landing.tsx"));
const AuthPage      = lazy(() => import("./pages/Auth.tsx"));
const Dashboard     = lazy(() => import("./pages/Dashboard.tsx"));
const NotFound      = lazy(() => import("./pages/NotFound.tsx"));
const Explore       = lazy(() => import("./pages/Explore.tsx"));
const Checker       = lazy(() => import("./pages/Checker.tsx"));
const Results       = lazy(() => import("./pages/Results.tsx"));
const SchemeDetails = lazy(() => import("./pages/SchemeDetails.tsx"));
const HowItWorks    = lazy(() => import("./pages/HowItWorks.tsx"));
const About         = lazy(() => import("./pages/About.tsx"));

function RouteLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading…</div>
    </div>
  );
}

class RootErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; message: string }
> {
  state = { hasError: false, message: "" };
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error.message || "Unknown error" };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 text-center">
          <div>
            <p className="font-semibold">Something went wrong</p>
            <p className="mt-2 text-sm text-muted-foreground">{this.state.message}</p>
            <button
              className="mt-4 rounded bg-primary px-4 py-2 text-sm text-white"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootErrorBoundary>
      <AuthProvider>
        <LanguageProvider>
          <ProfileProvider>
            <SavedProvider>
              <BrowserRouter>
                <Suspense fallback={<RouteLoading />}>
                  <Routes>
                    <Route path="/"             element={<Landing />} />
                    <Route path="/explore"      element={<Explore />} />
                    <Route path="/check"        element={<Checker />} />
                    <Route path="/results"      element={<Results />} />
                    <Route path="/scheme/:id"   element={<SchemeDetails />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/about"        element={<About />} />
                    <Route path="/auth"         element={<AuthPage redirectAfterAuth="/dashboard" />} />
                    <Route path="/dashboard"    element={<Dashboard />} />
                    <Route path="*"             element={<NotFound />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
              <Toaster />
            </SavedProvider>
          </ProfileProvider>
        </LanguageProvider>
      </AuthProvider>
    </RootErrorBoundary>
  </StrictMode>,
);
