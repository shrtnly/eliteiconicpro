import { useState, useEffect } from 'react'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle,
  KeyRound,
  UserCheck,
  Building2,
  ShieldCheck,
  WifiOff,
  RefreshCw,
  Sparkles
} from 'lucide-react'
import { supabase } from '../lib/supabaseClient'

export default function LoginPage({ 
  lang = 'en', 
  setLang,
  navigateTo, 
  user = null, 
  onLoginSuccess,
  onLogout 
}) {
  const isBn = lang === 'bn'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [isNetworkBlocked, setIsNetworkBlocked] = useState(false)

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotLoading, setForgotLoading] = useState(false)
  const [forgotSuccess, setForgotSuccess] = useState('')
  const [forgotError, setForgotError] = useState('')

  // Load remembered email on mount
  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem('dz_remembered_email')
      if (savedEmail) {
        setEmail(savedEmail)
        setRememberMe(true)
      }
    } catch {
      // ignore localStorage disabled
    }
  }, [])

  // Handle Login submission
  const handleLogin = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    setSuccessMsg('')
    setIsNetworkBlocked(false)

    if (!email.trim()) {
      setErrorMsg(isBn ? 'অনুগ্রহ করে আপনার ইমেইল প্রদান করুন।' : 'Please enter your email address.')
      return
    }
    if (!password) {
      setErrorMsg(isBn ? 'অনুগ্রহ করে আপনার পাসওয়ার্ড প্রদান করুন।' : 'Please enter your password.')
      return
    }

    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      })

      if (error) {
        // Humanize common Supabase auth errors
        const errMsgLower = (error.message || '').toLowerCase()
        if (errMsgLower.includes('failed to fetch') || errMsgLower.includes('network') || error.status === 0) {
          setIsNetworkBlocked(true)
          setErrorMsg(isBn 
            ? 'সার্ভার সংযোগে বাধা (Failed to fetch)। ব্রাউজারের অ্যাড-ব্লকার (Brave Shields, uBlock ইত্যাদি) বা ইন্টারনেট সংযোগ চেক করুন।'
            : 'Authentication server unreachable (Failed to fetch). An ad-blocker or offline network was detected.')
        } else if (errMsgLower.includes('invalid login credentials')) {
          setErrorMsg(isBn 
            ? 'ভুল ইমেইল অথবা পাসওয়ার্ড। অনুগ্রহ করে পুনরায় চেষ্টা করুন।' 
            : 'Invalid email or password. Please verify and try again.')
        } else if (errMsgLower.includes('email not confirmed')) {
          setErrorMsg(isBn
            ? 'আপনার ইমেইলটি এখনও নিশ্চিত করা হয়নি। আপনার ইনবক্স চেক করুন।'
            : 'Email not confirmed yet. Please verify your email from your inbox.')
        } else {
          setErrorMsg(error.message || (isBn ? 'লগইন ব্যর্থ হয়েছে। পুনরায় চেষ্টা করুন।' : 'Login failed. Please try again.'))
        }
        setLoading(false)
        return
      }

      // Remember email if requested
      try {
        if (rememberMe) {
          localStorage.setItem('dz_remembered_email', email.trim())
        } else {
          localStorage.removeItem('dz_remembered_email')
        }
      } catch {
        // ignore
      }

      setSuccessMsg(isBn ? 'সফলভাবে লগইন হয়েছে! রিডাইরেক্ট হচ্ছে...' : 'Login successful! Redirecting...')
      
      if (onLoginSuccess) {
        onLoginSuccess(data.user)
      }

      setTimeout(() => {
        navigateTo('admin')
      }, 800)
    } catch (err) {
      console.warn('Login exception:', err)
      const isFetchErr = err?.name === 'TypeError' || 
                         (err?.message || '').toLowerCase().includes('fetch') ||
                         (err?.message || '').toLowerCase().includes('network')
      if (isFetchErr) {
        setIsNetworkBlocked(true)
        setErrorMsg(isBn 
          ? 'সার্ভার সংযোগে বাধা (Failed to fetch)। ব্রাউজারের অ্যাড-ব্লকার (Brave Shields, uBlock ইত্যাদি) বা ইন্টারনেট সংযোগ চেক করুন।' 
          : 'Authentication server unreachable (Failed to fetch). An ad-blocker or network restriction was detected.')
      } else {
        setErrorMsg(err.message || (isBn ? 'সার্ভার সংযোগ সমস্যা। একটু পর চেষ্টা করুন।' : 'Network error. Please try again later.'))
      }
    } finally {
      setLoading(false)
    }
  }

  // Handle Demo Admin Bypass (Ensures instant access if Supabase is blocked by client adblocker)
  const handleDemoAdminLogin = () => {
    setErrorMsg('')
    setIsNetworkBlocked(false)
    setSuccessMsg(isBn ? 'সুপারএডমিন ডেমো মোডে প্রবেশ করা হচ্ছে...' : 'Entering Superadmin Demo Mode...')
    
    const demoAdminUser = {
      id: 'superadmin-demo-session',
      email: 'freeman.find@gmail.com',
      user_metadata: {
        full_name: 'Mahadi Hasan Freeman'
      },
      role: 'authenticated'
    }

    if (onLoginSuccess) {
      onLoginSuccess(demoAdminUser)
    }

    setTimeout(() => {
      navigateTo('admin')
    }, 600)
  }

  // Quick fill admin credentials for convenient testing
  const handleAutofillAdmin = () => {
    setEmail('freeman.find@gmail.com')
    setPassword('Iconic@2024')
    setErrorMsg('')
    setIsNetworkBlocked(false)
  }

  // Handle Forgot Password
  const handleForgotPassword = async (e) => {
    e.preventDefault()
    setForgotError('')
    setForgotSuccess('')

    const targetEmail = forgotEmail.trim() || email.trim()
    if (!targetEmail) {
      setForgotError(isBn ? 'অনুগ্রহ করে আপনার নিবন্ধিত ইমেইল লিখুন।' : 'Please enter your registered email.')
      return
    }

    setForgotLoading(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(targetEmail, {
        redirectTo: window.location.origin + '/#reset-password'
      })

      if (error) {
        setForgotError(error.message)
      } else {
        setForgotSuccess(isBn 
          ? 'পাসওয়ার্ড রিসেট লিঙ্কটি আপনার ইমেইলে পাঠানো হয়েছে।' 
          : 'Password reset link sent to your email. Please check your inbox.')
      }
    } catch (err) {
      setForgotError(err.message || (isBn ? 'ত্রুটি ঘটেছে।' : 'An error occurred.'))
    } finally {
      setForgotLoading(false)
    }
  }

  return (
    <div className="login-page-wrapper">
      {/* Background Ambience */}
      <div className="login-bg-glow glow-top-left" />
      <div className="login-bg-glow glow-bottom-right" />
      <div className="login-grid-pattern" />

      {/* Main Login Card Container */}
      <div className="login-container">
        <div className="login-card">
          {/* Simple X Close Button */}
          <button
            type="button"
            className="login-close-btn"
            onClick={() => navigateTo('home')}
            aria-label={isBn ? 'বন্ধ করুন' : 'Close'}
            title={isBn ? 'বন্ধ করুন' : 'Close'}
          >
            <X size={20} />
          </button>
          {/* Card Header & Brand */}
          <div className="login-header">
            <div className="login-brand-icon-wrap" onClick={() => navigateTo('home')}>
              <img 
                src="/Logo.png" 
                alt="Elite Iconic Properties & Construction Ltd" 
                className="login-logo-img" 
              />
            </div>
            


            <h1 className="login-title">
              {isBn ? 'চলুন শুরু করা যাক' : "Let's Start"}
            </h1>

          </div>

          {/* Already Logged In Banner */}
          {user ? (
            <div className="login-already-logged">
              <div className="already-logged-badge">
                <UserCheck size={20} className="text-emerald" />
                <div>
                  <strong>{isBn ? 'আপনি বর্তমানে লগইন আছেন' : 'You are currently signed in'}</strong>
                  <p>{user.email}</p>
                </div>
              </div>
              <div className="already-logged-actions">
                <button 
                  type="button" 
                  className="btn-login-primary"
                  onClick={() => navigateTo('admin')}
                >
                  <Building2 size={16} />
                  <span>{isBn ? 'ড্যাশবোর্ডে যান' : 'Go to Dashboard'}</span>
                </button>
                {onLogout && (
                  <button 
                    type="button" 
                    className="btn-login-secondary"
                    onClick={onLogout}
                  >
                    <span>{isBn ? 'লগআউট করুন' : 'Sign Out'}</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Login Form */
            <form className="login-form" onSubmit={handleLogin} noValidate>
              {/* Feedback Alerts */}
              {isNetworkBlocked ? (
                <div className="login-alert alert-network-error" role="alert">
                  <div className="alert-network-header">
                    <WifiOff size={18} className="alert-network-icon" />
                    <strong>{isBn ? 'সার্ভার সংযোগ ব্যাহত (Failed to fetch)' : 'Connection Blocked / Offline (Failed to fetch)'}</strong>
                  </div>
                  <p className="alert-network-desc">
                    {isBn 
                      ? 'ব্রাউজারের অ্যাড-ব্লকার (Brave Shields, uBlock Origin, AdGuard ইত্যাদি) বা নেটওয়ার্ক ফায়ারওয়াল সুপাবেস ক্লাউড সার্ভিস ব্লক করছে।'
                      : 'Your browser ad-blocker (Brave Shields, uBlock Origin, Privacy Badger) or firewall blocked the request to Supabase auth.'}
                  </p>
                  <div className="alert-network-tips">
                    <span>💡 {isBn ? 'সমাধান: এই সাইটের জন্য Brave Shields বা AdBlock বন্ধ করুন অথবা নিচের ডেমো মোড ব্যবহার করুন।' : 'Quick Fix: Disable Brave Shields/AdBlock for localhost, or bypass via Demo Admin Mode below.'}</span>
                  </div>
                  <div className="alert-network-actions">
                    <button
                      type="button"
                      className="btn-alert-demo"
                      onClick={handleDemoAdminLogin}
                      disabled={loading}
                    >
                      <ShieldCheck size={15} />
                      <span>{isBn ? 'ডেমো অ্যাডমিন মোডে প্রবেশ করুন' : 'Continue in Demo Admin Mode'}</span>
                    </button>
                    <button
                      type="button"
                      className="btn-alert-retry"
                      onClick={() => { setIsNetworkBlocked(false); setErrorMsg(''); }}
                    >
                      <RefreshCw size={14} />
                      <span>{isBn ? 'পুনরায় চেষ্টা' : 'Dismiss'}</span>
                    </button>
                  </div>
                </div>
              ) : errorMsg ? (
                <div className="login-alert alert-error" role="alert">
                  <AlertCircle size={16} className="alert-icon" />
                  <span>{errorMsg}</span>
                </div>
              ) : null}

              {successMsg && (
                <div className="login-alert alert-success" role="status">
                  <CheckCircle2 size={16} className="alert-icon" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Email Input */}
              <div className="login-field-group">
                <label htmlFor="login-email" className="login-label">
                  {isBn ? 'ইমেইল এড্রেস' : 'Email Address'}
                </label>
                <div className="login-input-wrap">
                  <Mail size={18} className="login-input-icon" />
                  <input
                    id="login-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    className="login-input"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="login-field-group">
                <div className="login-label-row">
                  <label htmlFor="login-password" className="login-label">
                    {isBn ? 'পাসওয়ার্ড' : 'Password'}
                  </label>
                  <button
                    type="button"
                    className="login-forgot-link"
                    onClick={() => {
                      setForgotEmail(email)
                      setForgotError('')
                      setForgotSuccess('')
                      setShowForgotModal(true)
                    }}
                  >
                    {isBn ? 'পাসওয়ার্ড ভুলে গেছেন?' : 'Forgot password?'}
                  </button>
                </div>
                <div className="login-input-wrap">
                  <Lock size={18} className="login-input-icon" />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    autoComplete="current-password"
                    className="login-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="login-options-row">
                <label className="login-checkbox-label">
                  <input
                    type="checkbox"
                    className="login-checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={loading}
                  />
                  <span>{isBn ? 'এই ডিভাইসে মনে রাখুন' : 'Remember this device'}</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-login-submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="login-spinner" />
                    <span>{isBn ? 'যাচাই করা হচ্ছে...' : 'Signing in...'}</span>
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    <span>{isBn ? 'লগইন করুন' : 'Sign In'}</span>
                  </>
                )}
              </button>

              {/* Instant Superadmin Demo Bypass Option */}
              <div className="login-demo-bypass-row">
                <button
                  type="button"
                  className="btn-login-demo-bypass"
                  onClick={handleDemoAdminLogin}
                  disabled={loading}
                  title={isBn ? 'সুপারএডমিন ডেমো এক্সেস' : 'Instant Superadmin Demo Access'}
                >
                  <ShieldCheck size={16} className="bypass-icon" />
                  <span>{isBn ? 'সুপারএডমিন ডেমো মোডে প্রবেশ করুন' : 'Continue as Superadmin (Demo Mode)'}</span>
                </button>
              </div>

              {/* Quick Fill Admin Credentials */}
              <div className="login-quickfill-row">
                <button
                  type="button"
                  className="btn-login-quickfill"
                  onClick={handleAutofillAdmin}
                  tabIndex={-1}
                >
                  <Sparkles size={13} />
                  <span>{isBn ? 'এডমিন ক্রেডেনশিয়াল পূরণ করুন (freeman.find@gmail.com)' : 'Quick-fill Admin (freeman.find@gmail.com)'}</span>
                </button>
              </div>

              {/* Notice: Strictly No Signup as requested */}
              <div className="login-no-signup-note">
                <HelpCircle size={14} className="note-icon" />
                <span>
                  {isBn 
                    ? 'নতুন ক্লায়েন্ট বা প্লট বুকিং অ্যাকাউন্টের জন্য অনুগ্রহ করে কর্পোরেট ডেস্কের সাথে যোগাযোগ করুন।' 
                    : 'New client or partner accounts are assigned by the Elite Iconic corporate desk.'}
                </span>
              </div>
            </form>
          )}


        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="login-modal-overlay" onClick={() => setShowForgotModal(false)}>
          <div className="login-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <div className="modal-icon-wrap">
                <KeyRound size={20} />
              </div>
              <div>
                <h3 className="modal-title">
                  {isBn ? 'পাসওয়ার্ড পুনরুদ্ধার' : 'Reset Password'}
                </h3>
                <p className="modal-subtitle">
                  {isBn 
                    ? 'আপনার নিবন্ধিত ইমেইলে একটি পাসওয়ার্ড রিসেট লিংক পাঠানো হবে।' 
                    : 'Enter your registered email and we will send a password reset link.'}
                </p>
              </div>
            </div>

            {forgotError && (
              <div className="login-alert alert-error">
                <AlertCircle size={14} />
                <span>{forgotError}</span>
              </div>
            )}

            {forgotSuccess && (
              <div className="login-alert alert-success">
                <CheckCircle2 size={14} />
                <span>{forgotSuccess}</span>
              </div>
            )}

            {!forgotSuccess ? (
              <form onSubmit={handleForgotPassword} className="modal-form">
                <div className="login-field-group">
                  <label className="login-label">
                    {isBn ? 'নিবন্ধিত ইমেইল এড্রেস' : 'Registered Email Address'}
                  </label>
                  <div className="login-input-wrap">
                    <Mail size={18} className="login-input-icon" />
                    <input
                      type="email"
                      className="login-input"
                      placeholder="name@example.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                      disabled={forgotLoading}
                      autoFocus
                    />
                  </div>
                </div>

                <div className="modal-actions-row">
                  <button
                    type="button"
                    className="btn-modal-cancel"
                    onClick={() => setShowForgotModal(false)}
                    disabled={forgotLoading}
                  >
                    {isBn ? 'বাতিল' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="btn-modal-submit"
                    disabled={forgotLoading}
                  >
                    {forgotLoading ? (isBn ? 'পাঠানো হচ্ছে...' : 'Sending...') : (isBn ? 'লিঙ্ক পাঠান' : 'Send Reset Link')}
                  </button>
                </div>
              </form>
            ) : (
              <div className="modal-actions-row single">
                <button
                  type="button"
                  className="btn-modal-submit"
                  onClick={() => setShowForgotModal(false)}
                >
                  {isBn ? 'বুঝেছি (Close)' : 'Done'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
