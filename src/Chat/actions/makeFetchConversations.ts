import { getConversations } from "../../api/messages"
import { IAppState } from "../../appReducer";
import { makeVerifyUnseenMessages } from "./makeVerifyUnseenMessages";
import { updateConversationList } from "./updateConversationList"

export function makeFetchConversations(){
  return async (dispatch: any, getState: () => IAppState) => {
    try {
      const connectedUser = getState().users.connectedUser;
      if(!connectedUser) { return }

      const conversations = await getConversations();

      /*
        conversationns = [ {_id: '1234567', unseenMessages: 0, messages: [mess1]}, conv2 ]
        const connectedUser = { conversationsSeen: { '123456': 'DATE' } }
        const conversation = {_id: '123456', unseenMessages: 0, messages: [mess1]}
      */
      /*
        conversationns = [
          {_id: '1234567', unseenMessages: 2, messages: [mess1]},
          {_id: '123456', unseenMessages: 4, messages: [mess2]}
        ]

        reduce((acc, conv) => acc + conv.unseenMessages, 0)
        const connectedUser = { conversationsSeen: { '123456': 'DATE' } }
        const conversation = {_id: '123456', unseenMessages: 0, messages: [mess1]}
      */

      await dispatch(updateConversationList(conversations));
      dispatch(makeVerifyUnseenMessages());
    } catch(err) {
      console.error(err);
    }
  }
}