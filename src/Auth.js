// Auth.js
import React, { useState } from 'react';
import { auth } from './Firebase';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      alert('Account created successfully!');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleSignIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      alert('Signed in successfully!');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      alert('Signed out successfully!');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Firebase Authentication</h2>
      <div>
        <label>Email: </label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password: </label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <button onClick={handleSignUp}>Sign Up</button>
        <button onClick={handleSignIn}>Sign In</button>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
};

export default Auth;
