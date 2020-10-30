import { IAppState } from "../../appReducer";
import { updateConversationList } from "./updateConversationList";

export function makeVerifyUnseenMessages(){
  return (dispatch: any, getState: () => IAppState) => {
    const conversations = getState().conversations.list;
    const connectedUser = getState().users.connectedUser;
    if(!connectedUser) {return}

    const updatedConversations = conversations.map(conversation => {
      const lastSeenDate = connectedUser.conversationsSeen[conversation._id]
      let unseenMessages;
      if(!lastSeenDate) {
        unseenMessages = conversation.messages.length;
      } else {
        unseenMessages = conversation.messages
                    .filter(message => new Date(message.createdAt) > new Date(lastSeenDate))
                    .length
      }
      conversation.unseenMessages = unseenMessages;
      return conversation
    })

    dispatch(updateConversationList(updatedConversations));
  }
}