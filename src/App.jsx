import { useState } from 'react';
import './App.css';
import Message from './message';
import { Input, Button, Stack, Sidenav, Nav, IconButton } from 'rsuite';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import TrashIcon from '@rsuite/icons/legacy/Trash';

function App() {
  const [inputValor, setInputValor] = useState('');
  const [messages, setMessages] = useState([]);
  const [listasSalvas, setListasSalvas] = useState([]);
  const [listaSelecionadaId, setListaSelecionadaId] = useState(null);

  const adicionarItem = () => {
    if (!inputValor.trim()) return;

    const novaMensagem = {
      id: messages.length + 1,
      sender: 'Você',
      content: inputValor
    };

    setMessages(prevMessages => [...prevMessages, novaMensagem]);
    setInputValor('');
  };

  const excluirItem = (id) => {
    setMessages(prevMessages => prevMessages.filter(msg => msg.id !== id));
  };

  const salvar = () => {
    if (messages.length === 0) return;

    if (listaSelecionadaId !== null) {
      // Atualizar a lista já existente
      setListasSalvas(prevListas =>
        prevListas.map(lista =>
          lista.id === listaSelecionadaId
            ? { ...lista, itens: messages }
            : lista
        )
      );
    } else {
      // Criar uma nova lista
      setListasSalvas(prevListas => [
        ...prevListas,
        { id: prevListas.length + 1, nome: `Lista: ${prevListas.length + 1}`, itens: messages }
      ]);
    }

    setMessages([]);
    setListaSelecionadaId(null); // Resetar para evitar sobrescrever outra lista por engano
  };

  const carregarLista = (id) => {
    const listaSelecionada = listasSalvas.find(lista => lista.id === id);
    if (listaSelecionada) {
      setMessages(listaSelecionada.itens);
      setListaSelecionadaId(id); // Armazena a ID para futuras edições
    }
  };

  const excluirLista = (id) => {
    setListasSalvas(prevListas => prevListas.filter(lista => lista.id !== id));
    if (listaSelecionadaId === id) {
      setListaSelecionadaId(null);
      setMessages([]);
    }
  };

  return (
    <>
      <div style={{ width: 240 }}>
        <Sidenav>
          <Sidenav.Body>
            <Nav activeKey="1">
              <Nav.Menu title="Settings" icon={<GearCircleIcon />}>
                <Nav.Item
                  eventKey="4-1"
                  onClick={() => {
                    setMessages([]);
                    setListaSelecionadaId(null); // Reset ao criar nova lista
                  }}
                >
                  Criar Nova Lista
                </Nav.Item>
                <Nav.Menu eventKey="4-5" title="Listas Criadas">
                  {listasSalvas.length > 0 ? (
                    listasSalvas.map(lista => (
                      <Nav.Item
                        key={lista.id}
                        eventKey={`4-5-${lista.id}`}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <span
                          onClick={() => carregarLista(lista.id)}
                          style={{ cursor: 'pointer', flexGrow: 1 }}
                        >
                          {lista.nome}
                        </span>
                        <IconButton
                          icon={<TrashIcon />}
                          appearance="subtle"
                          color="red"
                          size="xs"
                          onClick={() => excluirLista(lista.id)}
                        />
                      </Nav.Item>
                    ))
                  ) : (
                    <Nav.Item disabled>Nenhuma lista salva</Nav.Item>
                  )}
                </Nav.Menu>
              </Nav.Menu>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </div>

      <Stack spacing={10} alignItems="center" style={{ width: '300px', margin: '50px auto' }} size="lg">
        <Input
          value={inputValor}
          size="lg"
          block
          placeholder="Escreva um item aqui..."
          onChange={(value) => setInputValor(value)}
        />
        <Button onClick={adicionarItem} size="lg" appearance="primary" block>
          Adicionar
        </Button>
      </Stack>

      <div>
        <Message dados={messages} excluir={excluirItem} />
        <Button
          appearance="primary"
          style={{
            display: messages.length > 0 ? 'block' : 'none',
            margin: '20px auto',
            justifyContent: 'center'
          }}
          onClick={salvar}
        >
          {listaSelecionadaId !== null ? 'Atualizar Lista' : 'Salvar'}
        </Button>
      </div>
    </>
  );
}

export default App;
