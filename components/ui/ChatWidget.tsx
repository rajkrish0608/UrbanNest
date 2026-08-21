'use client';

import { useEffect } from 'react';
import { createChat } from '@n8n/chat';
import '@n8n/chat/style.css';

export default function ChatWidget() {
  useEffect(() => {
    // Initialize the official n8n embed chat widget with custom text.
    createChat({
      webhookUrl: 'https://shibagni.app.n8n.cloud/webhook/89f6f7b9-d89f-45d0-b564-1c514d4fceb1/chat',
      showWelcomeScreen: true,
      defaultLanguage: 'en',
      initialMessages: [
        'Hi there! 👋',
        'I am the UrbanNest bot. How can I assist you today?'
      ],
      i18n: {
        en: {
          title: 'UrbanNest',
          subtitle: 'Artisan Customer Support',
          footer: '',
          getStarted: 'New Conversation',
          inputPlaceholder: 'Ask about our products, gifts, or order...',
          closeButtonTooltip: 'Close chat',
        },
      },
    });
  }, []);

  return null;
}
