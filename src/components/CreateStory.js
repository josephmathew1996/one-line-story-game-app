import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button,  Dropdown, DropdownToggle, DropdownMenu, DropdownItem }  from 'reactstrap';
import axios from '../services/api';

const CreateStory = ({ players, closeModal, getAllStories }) => {
  const [title, setTitle] = useState('');
  const [noOfSentences, setNoOfSentences] = useState(0);
  const [topic, setTopic] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedPlayerName, setSelectedPlayerName] = useState('Select Player');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    console.log("use efect called....")
    // Set the default selected player if available
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
        axios.post('/api/v1/stories', { title, no_of_sentences: noOfSentences, topic, player_id: selectedPlayer // Assuming you have playerId as the field in the database
    })
    .then(response => {
      console.log(response.data);
      // Close the modal after successful API call
      closeModal();
      getAllStories();
    })
    .catch(error => console.error(error));
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="title">Title:</Label>
          <Input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormGroup>

        <FormGroup>
          <Label for="noOfSentences">No of Sentences:</Label>
          <Input type="number" id="noOfSentences" value={noOfSentences} onChange={(e) => setNoOfSentences(e.target.value)} />
        </FormGroup>

        <FormGroup>
          <Label for="topic">Topic:</Label>
          <Input type="text" id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
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

        <Button type="submit">Create Story</Button>
      </Form>
    </div>
  );
};

export default CreateStory;
