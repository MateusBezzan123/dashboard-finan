import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('auth') === 'true';

    if (!isAuthenticated) {
      router.replace('/login');
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Bem-vindo à Dashboard</h1>
      <button onClick={() => { localStorage.removeItem('auth'); router.push('/login'); }}>Sair</button>
    </div>
  );
}
