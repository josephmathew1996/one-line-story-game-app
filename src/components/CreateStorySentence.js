import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button,  Dropdown, DropdownToggle, DropdownMenu, DropdownItem }  from 'reactstrap';
import axios from '../services/api';

const CreateStorySentence = ({ players, closeModal, story }) => {
  const [sentence, setSentence] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedPlayerName, setSelectedPlayerName] = useState('Select Player');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    if (players.length > 0) {
      setSelectedPlayer(players[0].id);
      setSelectedPlayerName(players[0].username);
    }
  }, [players]);

  const handlePlayerSelect = (player) => {
    setSelectedPlayer(player.id);
    setSelectedPlayerName(player.username);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
        axios.post(`/api/v1/stories/${story.id}/sentences`,
         { player_id: selectedPlayer, content:  sentence}
    )
    .then(response => {
      console.log(response.data);
      closeModal();
    })
    .catch(error => console.error(error));
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="sentence">Sentence:</Label>
          <Input type="text" id="sentence" value={sentence} onChange={(e) => setSentence(e.target.value)} />
        </FormGroup>

         <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle caret>
          {selectedPlayerName}
          </DropdownToggle>
          <DropdownMenu>
            {players.map(player => (
              <DropdownItem key={player.id} onClick={() => handlePlayerSelect(player)}>
                {player.username}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <Button type="submit">Add sentence</Button>
      </Form>
    </div>
  );
};

export default CreateStorySentence;
