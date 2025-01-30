import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Filters from '../components/Filters';
import Cards from '../components/Cards';
import Charts from '../components/Charts';
import { useFilters } from '../context/FiltersContext';
import { GetServerSideProps } from 'next';

interface Transaction {
  account: string;
  industry: string;
  state: string;
  date: string;
  amount: string;
  transaction_type: string;
  processed: boolean;
}

const Container = styled.div`
  display: flex;
  background: #f0f2f5;
  min-height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Content = styled.div<{ open: boolean }>`
  flex: 1;
  padding: 20px;
  margin-left: ${(props) => (props.open ? '250px' : '60px')};
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
    padding-top: 80px;
  }
`;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  if (res) {
    res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  }

  const transactionsData = require('../data/transactions.json');

  return {
    props: {
      transactionsData,
    },
  };
}

export default function Dashboard({ transactionsData }: { transactionsData: Transaction[] }) {
  const [auth, setAuth] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();
  const { filters } = useFilters();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('auth');
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      setAuth(true);
    }
  }, [router]);

  if (!auth) return null;

  const filteredTransactions = transactionsData.filter((t) => {
    return (
      (!filters.account || t.account === filters.account) &&
      (!filters.industry || t.industry === filters.industry) &&
      (!filters.state || t.state === filters.state) &&
      (!filters.startDate || new Date(t.date) >= new Date(filters.startDate)) &&
      (!filters.endDate || new Date(t.date) <= new Date(filters.endDate))
    );
  });

  return (
    <Container>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <Content open={sidebarOpen}>
        <Filters />
        <Cards transactions={filteredTransactions} />
        <Charts transactions={filteredTransactions} />
      </Content>
    </Container>
  );
}