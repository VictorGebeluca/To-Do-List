import React, { useState } from 'react';
import { Button, Input, Stack, List, Modal } from 'rsuite';
import { Check, Trash } from '@rsuite/icons';

const CriarLista = ({ adicionarLista }) => {
    const [item, setItem] = useState('');
    const [itens, setItens] = useState([]);
    const [concluidos, setConcluidos] = useState(new Set());
    const [showModal, setShowModal] = useState(false);
    const [nomeLista, setNomeLista] = useState('');

    const handleAdicionarItem = () => {
        if (item.trim() !== '') {
            setItens([...itens, item]);
            setItem('');
        }
    };

    const handleAbrirModal = () => {
        if (itens.length > 0) {
            setShowModal(true);
        }
    };

    const handleCriarLista = () => {
        if (nomeLista.trim() !== '') {
            adicionarLista(nomeLista.trim(), itens);
            setNomeLista('');
            setItens([]);
            setConcluidos(new Set());
            setShowModal(false);
        }
    };

    const handleRemoverItem = (index) => {
        setItens(itens.filter((_, i) => i !== index));
        setConcluidos(prev => {
            const newSet = new Set(prev);
            newSet.delete(index);
            return newSet;
        });
    };

    const handleToggleConcluido = (index) => {
        setConcluidos(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '20px' }}>
            <h2 style={{ color: 'white' }}>Criar Nova Lista</h2> <br /> 
            <Stack direction="row" spacing={10}>
                <Input 
                    placeholder="Adicionar item..." 
                    value={item}
                    onChange={value => setItem(value)}
                    style={{ width: '200px' }}
                />
                <Button appearance="primary" onClick={handleAdicionarItem}>
                    Adicionar
                </Button>
            </Stack>

            {itens.length > 0 && (
                <List sortable bordered style={{ width: '600px' }}>
                    {itens.map((it, index) => (
                        <List.Item key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ textDecoration: concluidos.has(index) ? 'line-through' : 'none' }}>
                                {it}
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

            <Button appearance="primary" onClick={handleAbrirModal} disabled={itens.length === 0}>
                Salvar
            </Button>

            {/* MODAL PARA DIGITAR O NOME DA LISTA */}
            <Modal open={showModal} onClose={() => setShowModal(false)} size="xs">
                <Modal.Header>
                    <Modal.Title>Nome da Lista</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input 
                        placeholder="Digite o nome da lista..." 
                        value={nomeLista}
                        onChange={value => setNomeLista(value)}
                        style={{ width: '100%' }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button appearance="primary" onClick={handleCriarLista} disabled={nomeLista.trim() === ''}>
                        Salvar
                    </Button>
                    <Button appearance="subtle" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CriarLista;
