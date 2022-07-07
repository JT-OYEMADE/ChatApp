import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { conversationChanged, newMessageAdded, conversationDeleted, conversationsRequested } from '../../store/actions';
import ConversationSearch from '../../components/conversation/conversation-search/Conversation-Search';
import NoConversations from '../../components/conversation/no-conversation/NoConversation';
import ConversationList from '../../components/conversation/conversation-list/Conversation-List';
import NewConversation from '../../components/conversation/new-conversation/New-Conversation';
import ChatTitle from '../../components/chat-title/Chat-Title';
import MessageList from '../message/Message-List';
import ChatForm from '../../components/chat-form/Chat-Form';

import './Chat-App.css';

const ChatApp = ({ 
    conversations, 
    selectedConversation, 
    conversationChanged,
    onMessageSubmitted,
    onDeleteConversation,
    loadConversations
}) => {
    useEffect(() => {
        loadConversations();
    }, [loadConversations]);

    let conversationContent = (
        <>
            <NoConversations></NoConversations>
        </>
    );

    if (conversations.length > 0) {
        conversationContent = (
            <>
                <MessageList conversationId={selectedConversation.id} />
            </>
        );
    }

    return (
        <div id="chat-container">
            <ConversationSearch conversations={conversations} />
            <ConversationList
                onConversationItemSelected={conversationChanged}
                conversations={conversations}
                selectedConversation={selectedConversation} />
            <NewConversation />
            <ChatTitle 
                selectedConversation={selectedConversation}
                onDeleteConversation={onDeleteConversation} />
            {conversationContent}
            <ChatForm 
                selectedConversation={selectedConversation}
                onMessageSubmitted={onMessageSubmitted} />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        conversations: state.conversationState.conversations,
        selectedConversation: state.conversationState.selectedConversation
    };
};
  
const mapDispatchToProps = dispatch => ({
    conversationChanged: conversationId => dispatch(conversationChanged(conversationId)),
    onMessageSubmitted: messageText => { dispatch(newMessageAdded(messageText)); },
    onDeleteConversation: () => { dispatch(conversationDeleted()); },
    loadConversations: () => { dispatch(conversationsRequested())}
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatApp);