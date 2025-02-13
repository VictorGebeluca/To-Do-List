import { List, IconButton, Checkbox} from 'rsuite';
import { Trash } from '@rsuite/icons';
import { useState } from "react";

function Message({ dados, excluir }) {
const [riscados, setRiscados] = useState([]);
  
const alternarRisco = (id) => {
    setRiscados((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

    return (
    <div>
      <List>
        {dados.map((valor) => (
          <List.Item key={valor.id} style={{
            textDecoration: riscados.includes(valor.id)? "line-through" : 'none'
          }}
          onClick={() => alternarRisco(valor.id)}>
            <strong style={{ float: "left" }}>Item {valor.id}</strong> {valor.content}
            <IconButton
              icon={<Trash />}
              onClick={() => excluir(valor.id)} 
              appearance="subtle"
              color="red"
              style={{ float: "right" }}
            />
            <Checkbox style={{ float: "right" }}></Checkbox>
          </List.Item>
        ))}
      </List>
    </div>
  );
}

export default Message;
