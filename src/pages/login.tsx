import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
`;

const Form = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('auth', 'true');
      router.push('/dashboard');
    } else {
      alert('Credenciais inválidas!');
    }
  };

  return (
    <Container>
      <Form>
        <h2>Login</h2>
        <Input type="text" placeholder="Usuário" onChange={(e) => setUsername(e.target.value)} />
        <Input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleLogin}>Entrar</Button>
      </Form>
    </Container>
  );
}