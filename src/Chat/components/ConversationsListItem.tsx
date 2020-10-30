import { ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeVerifyUnseenMessages } from '../actions/makeVerifyUnseenMessages';
import { IConversation } from '../types';

function ConversationsListItem({conversation, verifyUnseenMessage} : {conversation: IConversation, verifyUnseenMessage: () => void}){
  return (
    <ListItem
      divider
      button
      component={Link}
      to={`/conversation/${conversation._id}`}
      onClick={verifyUnseenMessage}
      key={conversation._id}>
        <ListItemText
          primary={conversation._id}
          secondary={conversation.messages[0]?.content || 'No message...'}
        />
    </ListItem>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  verifyUnseenMessage: () => { dispatch(makeVerifyUnseenMessages()) }
})
export default connect(undefined, mapDispatchToProps)(ConversationsListItem);