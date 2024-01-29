import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Row,
  Col,
} from 'reactstrap';
import CreateStory from './CreateStory';
import StoryDetails from './StoryDetails';
import CreateStorySentence from './CreateStorySentence';

const StoryList = () => {
  const [stories, setStories] = useState([]);
  const [players, setPlayers] = useState([]);
  const [createStoryModal, setCreateStoryModal] = useState(false);
  const [viewSentencesModal, setViewSentencesModal] = useState(false);
  const [createStorySentenceModal, setCreateStorySentenceModal] = useState(false);
  const [completeStoryModal, setCompleteStoryModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    getAllStories()

    axios.get('/api/v1/players')
    .then(response => setPlayers(response.data))
    .catch(error => console.error(error));
  }, 
  []);

  const getAllStories = () => {
    axios
    .get('/api/v1/stories')
    .then((response) => setStories(response.data))
    .catch((error) => console.error(error));

  }

  const toggleCreateStoryModal = () => {
    setCreateStoryModal(!createStoryModal);
  };
  const toggleViewSentencesModal = (story) => {
    if(!viewSentencesModal) {
      setSelectedStory(story);
    }
    setViewSentencesModal(!viewSentencesModal);
  };
  const toggleCreateStorySentenceModal = (story) => {
    setSelectedStory(story);
    setCreateStorySentenceModal(!createStorySentenceModal);
  };
  const toggleCompleteStoryModal = (story) => {
    setSelectedStory(story);
    setCompleteStoryModal(!completeStoryModal);
  };

  const closeCreateStoryModal = () => {
    setCreateStoryModal(false);
  };
  const closeCreateStorySentenceModal = () => {
    setCreateStorySentenceModal(false);
  };
  const closeCompleteStorySentenceModal = () => {
    setCompleteStoryModal(false);
  };

  const setStoryCompleted = (id) => {
        axios.patch(`/api/v1/stories/${id}`,
         { status: 'completed'}
    )
    .then(response => {
      console.log(response.data);
      closeCompleteStorySentenceModal();
      getAllStories();
    })
    .catch(error => console.error(error));
  };

  return (
    <div>
      <h1 className="text-center mt-4">Stories</h1>
      <Row className="mb-3">
        <Col className="text-center">
          <Button color="primary" onClick={toggleCreateStoryModal}>Create Story</Button>
        </Col>
      </Row>
      <Row>
        {stories &&
          stories.items &&
          stories.items.map((story) => (
            <Col key={story.id} md={4} className="mb-3">
            <Card
              key={story.id}
              style={{
                width: '18rem',
              }}
            >
              <CardBody>
                <CardTitle tag="h5">Title: {story.title}</CardTitle>
                {story.topic && (
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    Topic: {story.topic}
                  </CardSubtitle>
                )}
                <CardText>Status: {story.status}</CardText>
                  <Button  color="secondary" onClick={() => toggleViewSentencesModal(story)}>View story</Button>
                  <Button  color="primary" onClick={() => toggleCreateStorySentenceModal(story)}>Add sentence</Button>
                {
                  story.status && story.status === 'ongoing' &&
                  <Row className='mt-4'>
                    <Button  color="success" onClick={() => toggleCompleteStoryModal(story)}>Complete</Button>
                  </Row>
                }
              </CardBody>
            </Card>
            </Col>
          ))}
        </Row>

      {/* Create Story Modal */}
      <Modal isOpen={createStoryModal} toggle={toggleCreateStoryModal}>
        <ModalHeader toggle={toggleCreateStoryModal}>Create Story</ModalHeader>
        <ModalBody>
         <CreateStory  players={players} closeModal={closeCreateStoryModal} getAllStories={getAllStories}/>
        </ModalBody>
      </Modal>

      {/* View Sentences Modal */}
      <Modal isOpen={viewSentencesModal} toggle={toggleViewSentencesModal}>
        <ModalHeader toggle={toggleViewSentencesModal}>Story Sentences</ModalHeader>
        <ModalBody>
          {/* Add your logic to display sentences of the selected story */}
          {selectedStory && (
            <div>
              <h5>{selectedStory.title} Sentences:</h5>
              <StoryDetails id={selectedStory.id}/>
            </div>
          )}
        </ModalBody>
      </Modal>

         {/* Create Story Sentence Modal */}
        <Modal isOpen={createStorySentenceModal} toggle={toggleCreateStorySentenceModal}>
          <ModalHeader toggle={toggleCreateStorySentenceModal}>Add Story Sentence</ModalHeader>
          <ModalBody>
          <CreateStorySentence  players={players} closeModal={closeCreateStorySentenceModal} story={selectedStory}/>
          </ModalBody>
        </Modal>

       {/* Complete Story Modal */}
       <Modal isOpen={completeStoryModal} toggle={toggleCompleteStoryModal}>
        <ModalHeader toggle={toggleCompleteStoryModal}>Complete Story</ModalHeader>
        <ModalBody>
        <Form>
          Do you want to set the story as completed ? 
         <Button onClick={() => setStoryCompleted(selectedStory.id)}>Yes</Button>
         <Button onClick={closeCompleteStorySentenceModal}>No</Button>
        </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default StoryList;
