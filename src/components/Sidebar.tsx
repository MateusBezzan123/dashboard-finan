// components/Sidebar.tsx
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useState } from 'react';

// Defina a interface para as props do Sidebar
interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SidebarContainer = styled.div<{ open: boolean }>`
  width: ${(props) => (props.open ? '250px' : '60px')};
  height: 100vh;
  background: #0070f3;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  transition: width 0.3s ease;
  overflow: hidden;
  position: fixed;
  z-index: 10;

  @media (max-width: 768px) {
    width: ${(props) => (props.open ? '100%' : '60px')};
    height: ${(props) => (props.open ? '100%' : '60px')};
    position: fixed;
    top: 0;
    left: 0;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  align-self: flex-start;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  margin: 10px 0;
  cursor: pointer;
  text-align: left;

  &:hover {
    text-decoration: underline;
  }
`;

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    router.push('/login');
  };

  return (
    <SidebarContainer open={open}>
      <ToggleButton onClick={() => setOpen(!open)}>{open ? '❌' : '☰'}</ToggleButton>
      {open && (
        <>
          <h2>Dashboard</h2>
          <Button onClick={() => router.push('/dashboard')}>Home</Button>
          <Button onClick={handleLogout}>Logout</Button>
        </>
      )}
    </SidebarContainer>
  );
}