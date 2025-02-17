import React from 'react';
import { Button, Stack } from 'rsuite';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', color: 'white', padding: '20px' }}>
      <h2>Bem-vindo ao List Creator</h2>
      <br /><br />
      <p>Crie e gerencie suas listas de forma simples e rápida.</p>
      
      <Stack spacing={20} justifyContent="center" style={{ marginTop: '20px' }}>
        <Button appearance="primary" size="lg" href="#criar-lista">
          Criar Nova Lista
        </Button>
        <Button appearance="ghost" size="lg" href="#listas-salvas">
          Ver Listas Salvas
        </Button>
      </Stack>
    
    </div>
  );
};

export default Home;
