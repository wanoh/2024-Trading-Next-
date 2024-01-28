import React, { useEffect } from 'react';

const ForexWebSocket: React.FC = () => {
  useEffect(() => {
    // const apiKey =
    const pairToSubscribe = 'eurusd';

    const socket = new WebSocket('wss://forex.financialmodelingprep.com');

    // Connection opened
    socket.addEventListener('open', (event) => {
      console.log('+++FMPWebSocket connected');

      // Sending login information
      const loginMessage = JSON.stringify({
        event: 'login',
        data: { apiKey :  '4gJyYudlalNuoLCwIhZ1PiJD44XDwJop'},
      });
      socket.send(loginMessage);

      // Subscribing to a forex pair
      const subscribeMessage = JSON.stringify({
        event: 'subscribe',
        data: { ticker: pairToSubscribe },
      });
      socket.send(subscribeMessage);
    });

    // Listen for messages from the server
    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      console.log('+++FMP Received message:', data);
    });

    // Listen for errors
    socket.addEventListener('error', (event) => {
      console.error('+++FMP WebSocket error:', event);
    });

    // Listen for the connection to be closed
    socket.addEventListener('close', (event) => {
      console.log('+++FMP WebSocket closed:', event);
    });

    // Clean up the WebSocket connection on component unmount
    return () => {
      socket.close();
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      {/* Your component JSX goes here */}
    </div>
  );
};

export default ForexWebSocket;
