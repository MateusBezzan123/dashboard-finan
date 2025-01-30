import React, { useMemo } from 'react';
import styled from 'styled-components';

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: flex-start;
  padding: 20px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: calc(25% - 15px);
  max-width: 250px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 1024px) {
    width: calc(33.33% - 15px);
  }

  @media (max-width: 768px) {
    width: calc(50% - 15px);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export default function Cards({ transactions }: { transactions: any[] }) {
  const { totalIncome, totalExpenses, pendingTransactions, totalBalance } = useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.transaction_type === 'deposit')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    const totalExpenses = transactions
      .filter((t) => t.transaction_type === 'withdraw')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    const pendingTransactions = transactions.filter((t) => !t.processed).length;
    const totalBalance = totalIncome - totalExpenses;

    return { totalIncome, totalExpenses, pendingTransactions, totalBalance };
  }, [transactions]);

  return (
    <CardsContainer>
      <Card><h3>Receitas</h3><p>R$ {totalIncome.toFixed(2)}</p></Card>
      <Card><h3>Despesas</h3><p>R$ {totalExpenses.toFixed(2)}</p></Card>
      <Card><h3>Transações Pendentes</h3><p>{pendingTransactions}</p></Card>
      <Card><h3>Saldo Total</h3><p>R$ {totalBalance.toFixed(2)}</p></Card>
    </CardsContainer>
  );
}