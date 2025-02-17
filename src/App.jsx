import React, { useState, useEffect } from 'react';
import { Container, Content } from 'rsuite';
import SidebarMenu from './components/SidebarMenu';
import HeaderBar from './components/HeaderBar';
import Home from './pages/Home';
import CriarLista from './pages/CriarLista';
import ListasSalvas from './pages/ListasSalvas';

const App = () => {
  const [expand, setExpand] = useState(true);
  const [page, setPage] = useState(window.location.hash || '#home');
  const [listas, setListas] = useState([]);

  useEffect(() => {
    const handleHashChange = () => {
      setPage(window.location.hash || '#home');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const adicionarLista = (nomeLista, itens) => {
    setListas([...listas, { nomeLista, itens }]);
  };

  const removerLista = (index) => {
    setListas(prevListas => prevListas.filter((_, i) => i !== index));
  };

  return (
    <Container style={{ background: '#0f131a', minHeight: '100vh', display: 'flex' }}>
      <SidebarMenu expand={expand} setExpand={setExpand} />

      <Container style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <HeaderBar />
        <Content style={{ color: 'white', padding: '20px' }}>
          {page === '#home' && <Home />}
          {page === '#criar-lista' && <CriarLista adicionarLista={adicionarLista} />}
          {page === '#listas-salvas' && <ListasSalvas listas={listas} setListas={setListas} removerLista={removerLista} />
        }
        </Content>
      </Container>
    </Container>
  );
};

export default App;
