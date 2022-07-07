import { put, takeEvery } from 'redux-saga/effects';

import { messagesLoaded } from '../actions';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

const conversations = [
  {
    id: '1',
    imageUrl: require('../images/profiles/tomi.jpg'),
    imageAlt: 'Oyemade Oluwatomisin',
    title: 'Oyemade Oluwatomisin',
    createdAt: 'June 6',
    latestMessageText: 'This is a message',
    messages: [
      {
        imageUrl: null,
        imageAlt: null,
        messageText: 'Ok then',
        createdAt: 'July 6',
        isMyMessage: true
      },
      {
        imageUrl: require('../images/profiles/tomi.jpg'),
        imageAlt: 'Oyemade Oluwatomisin',
        messageText: `Yeah I think is best we do that. Other things won't work well at all`,
        createdAt: 'July 6',
        isMyMessage: false 
      },
      {
        imageUrl: null,
        imageAlt: null,
        messageText: 'Maybe we can use Jim\'s studio.',
        createdAt: 'Apr 15',
        isMyMessage: true
      },
      {
        imageUrl: require('../images/profiles/tomi.jpg'),
        imageAlt: 'Oyemade Oluwatomisin',
        messageText: `
            All I know is where I live it's too hard
            to record because of all the street noise.
        `,
        createdAt: 'Apr 15',
        isMyMessage: false
      },
      {
        imageUrl: null,
        imageAlt: null,
        messageText: `
            Well we need to work out sometime soon where
            we really want to record our video course.
        `,
        createdAt: 'Apr 15',
        isMyMessage: true
      },
      {
        imageUrl: require('../images/profiles/tomi.jpg'),
        imageAlt: 'Oyemade Oluwatomisin',
        messageText: `
            I'm just in the process of finishing off the
            last pieces of material for the course.
        `,
        createdAt: 'Apr 15',
        isMyMessage: false
      },
      {
        imageUrl: null,
        imageAlt: null,
        messageText: 'How\'s it going?',
        createdAt: 'Apr 13',
        isMyMessage: true
      },
      {
        imageUrl: require('../images/profiles/tomi.jpg'),
        imageAlt: 'Oyemade Oluwatomisin',
        messageText: ' Hey mate what\'s up?',
        createdAt: 'Apr 13',
        isMyMessage: false
      },
      {
        imageUrl: null,
        imageAlt: null,
        messageText: 'Oyemade Oluwatomisin?',
        createdAt: 'Apr 13',
        isMyMessage: true
      }
    ]

  }
];

export const conversationsSaga = function*() {
  yield delay(1000);
  yield put(messagesLoaded(conversations[0].id, conversations[0].messages, false, null));

  yield put({
      type: 'CONVERSATIONS_LOADED',
      payload: {
          conversations,
          selectedConversation: conversations[0]
      }
  });
}

export function* watchGetConversationsAsync() {
  yield takeEvery('CONVERSATIONS_REQUESTED', conversationsSaga);
}