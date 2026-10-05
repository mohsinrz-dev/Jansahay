import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth";
import logo from "@/assets/logo.svg";
import { LogIn, UserPlus, Mail, User, LockKeyhole, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router";

interface AuthProps {
  redirectAfterAuth?: string;
}

export default function AuthPage({ redirectAfterAuth = "/dashboard" }: AuthProps) {
  const { isAuthenticated, isLoading, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const requestedRedirect = searchParams.get("returnTo");
  const redirect = requestedRedirect?.startsWith("/") && !requestedRedirect.startsWith("//")
    ? requestedRedirect
    : redirectAfterAuth;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && isAuthenticated) navigate(redirect, { replace: true });
  }, [isAuthenticated, isLoading, navigate, redirect]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (mode === "signup" && !name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setSubmitting(true);
    try {
      if (mode === "signup") {
        const hasSession = await signUp(email.trim(), password, name.trim(), redirect);
        if (hasSession) {
          navigate(redirect, { replace: true });
        } else {
          setSuccess("Account created. Check your email to confirm your address, then sign in.");
        }
      } else {
        await signIn(email.trim(), password);
        navigate(redirect, { replace: true });
      }
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "Authentication failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <Link to="/" className="mb-8 flex items-center gap-2">
        <img src={logo} alt="JANSAHAY" className="h-8 w-8" />
        <span className="text-xl font-extrabold tracking-tight text-primary">JANSAHAY</span>
      </Link>

      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {mode === "signup" ? "Create your account" : "Welcome"}
          </CardTitle>
          <CardDescription>
            {mode === "signup"
              ? "Create an account to save your schemes"
              : "Sign in to access your saved schemes"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            {mode === "signup" && <div className="grid gap-1.5">
              <label htmlFor="name" className="text-sm font-medium">Your name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="Mohsin"
                  className="pl-9"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  autoComplete="name"
                  required={mode === "signup"}
                />
              </div>
            </div>}

            <div className="grid gap-1.5">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-9"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="grid gap-1.5">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="At least 8 characters"
                  className="pl-9"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  minLength={8}
                  required
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
            )}
            {success && (
              <p role="status" className="rounded-md bg-primary/10 px-3 py-2 text-sm text-primary">{success}</p>
            )}

            <Button type="submit" className="w-full" disabled={submitting || isLoading}>
              {submitting ? <LoaderCircle className="mr-2 size-4 animate-spin" /> :
                mode === "signup" ? <UserPlus className="mr-2 size-4" /> : <LogIn className="mr-2 size-4" />}
              {submitting ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in"}
            </Button>
          </form>

          <div className="mt-5 border-t border-border pt-4 text-center">
            <p className="mb-3 text-sm text-muted-foreground">
              {mode === "signup" ? "Already have an account?" : "New to JANSAHAY?"}{" "}
              <button
                type="button"
                className="font-medium text-primary hover:underline"
                onClick={() => {
                  setMode(mode === "signup" ? "login" : "signup");
                  setError(null);
                  setSuccess(null);
                }}
              >
                {mode === "signup" ? "Sign in" : "Create an account"}
              </button>
            </p>
            <Link to="/explore" className="text-xs text-muted-foreground hover:text-foreground">
              Skip — browse without signing in →
            </Link>
          </div>
        </CardContent>
      </Card>

      <p className="mt-5 max-w-sm text-center text-xs text-muted-foreground">
        Your account data is stored securely. JANSAHAY does not ask for Aadhaar or payment details.
      </p>
    </div>
  );
}
