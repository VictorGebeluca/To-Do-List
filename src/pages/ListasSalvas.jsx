import React, { useState } from 'react';
import { List, Button } from 'rsuite';
import { Trash, Check, ArrowLeft } from '@rsuite/icons';
import EyeIcon from '@rsuite/icons/legacy/Eye';

const ListasSalvas = ({ listas, setListas, removerLista }) => {
  const [listaSelecionada, setListaSelecionada] = useState(null);
  const [concluidos, setConcluidos] = useState(new Set());

  const handleToggleConcluido = (index) => {
    setConcluidos(prev => {
      const newSet = new Set(prev);
      newSet.has(index) ? newSet.delete(index) : newSet.add(index);
      return newSet;
    });

    if (listaSelecionada) {
      const novasListas = listas.map((lista) =>
        lista.nomeLista === listaSelecionada.nomeLista
          ? { ...lista, itens: lista.itens }
          : lista
      );
      setListas(novasListas);
    }
  };

  const handleRemoverItem = (index) => {
    if (listaSelecionada) {
      const novaLista = { 
        ...listaSelecionada, 
        itens: listaSelecionada.itens.filter((_, i) => i !== index) 
      };

      setListaSelecionada(novaLista);
      setListas(listas.map(lista => 
        lista.nomeLista === listaSelecionada.nomeLista ? novaLista : lista
      ));
    }
  };

  return (
    <div style={{ color: 'white', padding: '20px', textAlign: 'center' }}>
      {listaSelecionada ? (
        /** ✅ Tela da Lista Selecionada */
        <div>
          <h2>{listaSelecionada.nomeLista}</h2><br/>

          {listaSelecionada.itens.length === 0 ? (
            <p>Essa lista está vazia.</p>
          ) : (
            <List bordered style={{ width: '400px', margin: '0 auto' }}>
              {listaSelecionada.itens.map((item, index) => (
                <List.Item key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ textDecoration: concluidos.has(index) ? 'line-through' : 'none' }}>
                    {item}
                  </span>
                  <div>
                    <Button appearance="link" onClick={() => handleToggleConcluido(index)}>
                      <Check style={{ color: concluidos.has(index) ? 'green' : 'gray' }} />
                    </Button>
                    <Button appearance="link" color="red" onClick={() => handleRemoverItem(index)}>
                      <Trash />
                    </Button>
                  </div>
                </List.Item>
              ))}
            </List>
          )}

          <br />
          <Button appearance="primary" onClick={() => setListaSelecionada(null)}>
            <ArrowLeft /> Voltar
          </Button>
        </div>
      ) : (
        /** ✅ Tela de Listas Salvas */
        <div>
          <h2>Suas Listas Salvas</h2> <br />
          {listas.length === 0 ? (
            <p>Nenhuma lista salva ainda.</p>
          ) : (
            <List bordered style={{ width: '400px', margin: '0 auto' }}>
              {listas.map((lista, index) => (
                <List.Item key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{lista.nomeLista}</span>
                  <div>
                    <Button appearance="link" onClick={() => setListaSelecionada(lista)}>
                      <EyeIcon style={{ color: '#3498db' }} />
                    </Button>
                    <Button appearance="link" color="red" onClick={() => removerLista(index)}>
                      <Trash />
                    </Button>
                  </div>
                </List.Item>
              ))}
            </List>
          )}
        </div>
      )}
    </div>
  );
};

export default ListasSalvas;
