import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                navigate('/admin/dashboard');
            } else {
                const data = await res.json();
                console.error('Login failed:', data);
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-black text-white">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md p-8 space-y-6 bg-zinc-900/50 rounded-2xl border border-zinc-800"
            >
                <h1 className="text-2xl font-bold text-center">Admin Login</h1>

                {error && (
                    <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-lg">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 bg-black border border-zinc-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 bg-black border border-zinc-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium transition-colors"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
