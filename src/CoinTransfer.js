// CoinTransfer.js
import React, { useState, useEffect } from 'react';
import { auth, firestore } from './Firebase';

const CoinTransfer = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [coins, setCoins] = useState(0);
  const [recipient, setRecipient] = useState('');
  const [transferAmount, setTransferAmount] = useState(0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        fetchUserData(user.uid);
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const userDoc = await firestore.collection('users').doc(userId).get();
      if (userDoc.exists) {
        setCoins(userDoc.data().coins || 0);
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  const handleTransfer = async () => {
    try {
      if (coins >= transferAmount) {
        const senderRef = firestore.collection('users').doc(currentUser.uid);
        await firestore.runTransaction(async (transaction) => {
          const senderDoc = await transaction.get(senderRef);
          const updatedSenderCoins = senderDoc.data().coins - transferAmount;
          transaction.update(senderRef, { coins: updatedSenderCoins });

          const recipientRef = firestore.collection('users').doc(recipient);
          const recipientDoc = await transaction.get(recipientRef);
          const updatedRecipientCoins = (recipientDoc.data().coins || 0) + transferAmount;
          transaction.update(recipientRef, { coins: updatedRecipientCoins });
        });

        setCoins(coins - transferAmount);
        setRecipient('');
        setTransferAmount(0);

        alert('Coins transferred successfully!');
      } else {
        alert('Insufficient coins for transfer!');
      }
    } catch (error) {
      console.error('Error transferring coins:', error.message);
    }
  };

  return (
    <div>
      {currentUser ? (
        <>
          <h2>Your Coins: {coins}</h2>
          <div>
            <label>Recipient ID: </label>
            <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
          </div>
          <div>
            <label>Transfer Amount: </label>
            <input
              type="number"
              value={transferAmount}
              onChange={(e) => setTransferAmount(parseInt(e.target.value, 10))}
            />
          </div>
          <button onClick={handleTransfer}>Transfer Coins</button>
        </>
      ) : (
        <p>Please log in to view and transfer coins.</p>
      )}
    </div>
  );
};

export default CoinTransfer;
