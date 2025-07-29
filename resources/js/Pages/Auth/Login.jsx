import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => reset('password');
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <>
            <Head title="Login" />
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

                * {
                    box-sizing: border-box;
                }

                body {
                    margin: 0;
                    font-family: 'Poppins', sans-serif;
                    background: linear-gradient(to right, #1e3c72, #2a5298);
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                }

                .login-wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    max-width: 480px;
                    padding: 3rem 2.5rem;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 1.5rem;
                    backdrop-filter: blur(30px);
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
                    animation: popIn 0.6s ease forwards;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                @keyframes popIn {
                    0% {
                        opacity: 0;
                        transform: scale(0.95) translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }

                .login-title {
                    font-size: 2rem;
                    font-weight: 600;
                    color: #fff;
                    margin-bottom: 2rem;
                    text-align: center;
                    text-shadow: 0 1px 2px rgba(0,0,0,0.25);
                }

                .form-group {
                    margin-bottom: 1.4rem;
                    width: 100%;
                    transition: all 0.3s;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                    color: #e0e0e0;
                    font-size: 0.95rem;
                    font-weight: 500;
                }

                .form-group input {
                    width: 100%;
                    padding: 0.8rem 1rem;
                    border: none;
                    border-radius: 12px;
                    background: rgba(255, 255, 255, 0.15);
                    color: #fff;
                    font-size: 1rem;
                    outline: none;
                    transition: all 0.3s ease;
                }

                .form-group input::placeholder {
                    color: #ccc;
                }

                .form-group input:focus {
                    background: rgba(255, 255, 255, 0.2);
                    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
                }

                .error {
                    color: #f87171;
                    font-size: 0.85rem;
                    margin-top: 0.4rem;
                }

                .remember-forgot {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.85rem;
                    margin-bottom: 1.6rem;
                    color: #e5e5e5;
                }

                .remember-forgot input[type="checkbox"] {
                    accent-color: #6366f1;
                    transform: scale(1.1);
                    margin-right: 0.5rem;
                }

                .forgot-link {
                    color: #cbd5e1;
                    text-decoration: none;
                    transition: color 0.3s;
                }

                .forgot-link:hover {
                    color: #fff;
                }

                .submit-button {
                    width: 100%;
                    padding: 0.85rem;
                    border: none;
                    border-radius: 12px;
                    background: linear-gradient(to right, #4f46e5, #6366f1);
                    color: white;
                    font-weight: 600;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: transform 0.2s, background 0.3s;
                }

                .submit-button:hover {
                    background: linear-gradient(to right, #4338ca, #4f46e5);
                    transform: translateY(-2px);
                }

                .status-message {
                    background: rgba(16, 185, 129, 0.15);
                    border-left: 4px solid #10b981;
                    color: #d1fae5;
                    padding: 0.75rem;
                    margin-bottom: 1.5rem;
                    border-radius: 8px;
                    font-size: 0.9rem;
                    width: 100%;
                    text-align: center;
                }

                @media (max-width: 500px) {
                    .login-wrapper {
                        padding: 2rem 1.5rem;
                    }
                }
            `}</style>

            <div className="login-wrapper">
                <div className="login-title">Distribution Management System</div>

                {status && <div className="status-message">{status}</div>}

                <form onSubmit={submit} className="w-full">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            placeholder="Enter your email"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && <div className="error">{errors.email}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        {errors.password && <div className="error">{errors.password}</div>}
                    </div>

                    <div className="remember-forgot">
                        <label>
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            Remember me
                        </label>

                        {/* {canResetPassword && (
                            <Link href={route('password.request')} className="forgot-link">
                                Forgot password?
                            </Link>
                        )} */}
                    </div>

                    <button type="submit" className="submit-button" disabled={processing}>
                        {processing ? 'Logging in...' : 'Log In'}
                    </button>
                </form>
            </div>
        </>
    );
}
