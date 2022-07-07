import { put, takeLatest } from 'redux-saga/effects';

import { messagesLoaded } from '../actions';

const messageDetails = {
  '2': [
    {
      id: '1',
      imageUrl: null,
      imageAlt: null,
      messageText: 'Ok fair enough. Well good talking to you.',
      createdAt: 'July 6',
      isMyMessage: true
    },
  ]
};

const delay = (ms) => new Promise(res => setTimeout(res, ms));

const messagesSaga = function*(action) {
    const { conversationId, numberOfMessages, lastMessageId } = action.payload;
    const messages = messageDetails[conversationId];
    const startIndex = lastMessageId ? messages.findIndex(message => message.id === lastMessageId) + 1: 0;
    const endIndex = startIndex + numberOfMessages;
    const pageGroup = messages.slice(startIndex, endIndex);
    const newLastMessageId = pageGroup.length > 0 ? pageGroup[pageGroup.length - 1].id: null;
    const hasMoreMessages = newLastMessageId && endIndex < (messages.length - 1);

    yield delay(1000);

    yield put(messagesLoaded(
        conversationId,
        pageGroup,
        hasMoreMessages,
        newLastMessageId
    ));

    if (hasMoreMessages) {
        yield delay(1000);
        yield put({
            type: 'MESSAGES_REQUESTED',
            payload: {
                conversationId,
                numberOfMessages,
                lastMessageId: newLastMessageId
            }
        })
    }
}

export const watchGetMessagesAsync = function*() {
    yield takeLatest('MESSAGES_REQUESTED', messagesSaga);
}