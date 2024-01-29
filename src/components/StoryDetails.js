import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import { List }  from 'reactstrap';


const StoryDetails = ({ id }) => {
  const [story, setStory] = useState({});

  useEffect(() => {
      axios.get(`/api/v1/stories/${id}`)
        .then(response => setStory(response.data))
        .catch(error => console.error(error));
  }, [id]);

  return (
    <div>
      {
        story &&  story.sentences && story.sentences.map((sentence)=> (
        <List key={sentence.id}>
           <li>
            {sentence.content}
          </li>
        </List>
        ))
      }
    </div>
  );
};

export default StoryDetails;
