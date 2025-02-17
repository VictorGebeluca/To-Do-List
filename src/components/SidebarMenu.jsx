import React from 'react';
import { Sidebar, Sidenav, Nav, IconButton, Stack } from 'rsuite';
import { Icon } from '@rsuite/icons';
import { MdHome, MdAdd, MdFolder, MdKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdMenu } from 'react-icons/md';

const SidebarMenu = ({ expand, setExpand }) => {
  return (
    <Sidebar
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: '#1a1d24',
      }}
      width={expand ? 260 : 56}
      collapsible
    >
      <Sidenav.Header
        style={{ borderBottom: '1px solid #0f131a', cursor: 'pointer' }}
        onClick={() => setExpand(!expand)}
      >
        <Stack justifyContent="center" alignItems="center" style={{ height: 60 }}>
          <MdMenu size={40} color="white" />
        </Stack>
      </Sidenav.Header>
      
      <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
        <Sidenav.Body>
          <Nav defaultActiveKey="1">
            <Nav.Item href="#home" eventKey="1" icon={<Icon as={MdHome} />} style={{ color: 'white' }}>
              Home
            </Nav.Item>
            <Nav.Item href="#criar-lista" eventKey="2" icon={<Icon as={MdAdd} />} style={{ color: 'white' }}>
              Criar Lista
            </Nav.Item>
            <Nav.Item href="#listas-salvas" eventKey="3" icon={<Icon as={MdFolder} />} style={{ color: 'white' }}>
              Listas Salvas
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>

      <Stack className="nav-toggle" justifyContent={expand ? 'flex-end' : 'center'}>
        <IconButton
          onClick={() => setExpand(!expand)}
          appearance="subtle"
          size="lg"
          icon={expand ? <MdKeyboardArrowLeft /> : <MdOutlineKeyboardArrowRight />}
          style={{ color: 'white' }}
        />
      </Stack>
    </Sidebar>
  );
};

export default SidebarMenu;
