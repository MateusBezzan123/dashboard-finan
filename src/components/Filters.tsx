import React, { useState, useContext, useCallback } from 'react';
import styled from 'styled-components';
import { FiltersContext } from '../context/FiltersContext';

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FilterInput = styled.input`
  flex: 1;
  min-width: 150px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ApplyButton = styled.button`
  padding: 8px 16px;
  background: #0070f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #005bb5;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ClearButton = styled.button`
  padding: 8px 16px;
  background: #ff4d4f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #ff7875;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default function Filters() {
  const { filters, setFilters } = useContext(FiltersContext);
  const [localFilters, setLocalFilters] = useState(filters);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setLocalFilters((prev) => ({ ...prev, [key]: e.target.value }));
  }, []);

  const handleApplyFilters = useCallback(() => {
    setFilters(localFilters);
  }, [localFilters, setFilters]);

  const handleClearFilters = useCallback(() => {
    const emptyFilters = {
      account: '',
      industry: '',
      state: '',
      startDate: '',
      endDate: '',
    };
    setLocalFilters(emptyFilters); // Limpa os filtros locais
    setFilters(emptyFilters); // Limpa os filtros globais
  }, [setFilters]);

  return (
    <FiltersContainer>
      <FilterInput
        type="text"
        placeholder="Conta"
        value={localFilters.account || ''}
        onChange={(e) => handleInputChange(e, 'account')}
      />
      <FilterInput
        type="text"
        placeholder="Indústria"
        value={localFilters.industry || ''}
        onChange={(e) => handleInputChange(e, 'industry')}
      />
      <FilterInput
        type="text"
        placeholder="Estado"
        value={localFilters.state || ''}
        onChange={(e) => handleInputChange(e, 'state')}
      />
      <FilterInput
        type="date"
        value={localFilters.startDate || ''}
        onChange={(e) => handleInputChange(e, 'startDate')}
      />
      <FilterInput
        type="date"
        value={localFilters.endDate || ''}
        onChange={(e) => handleInputChange(e, 'endDate')}
      />
      <ApplyButton onClick={handleApplyFilters}>
        Aplicar Filtros
      </ApplyButton>
      <ClearButton onClick={handleClearFilters}>
        Limpar Filtros
      </ClearButton>
    </FiltersContainer>
  );
}