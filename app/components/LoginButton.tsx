'use client'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';
import { useAuth } from './AuthProvider';
import { useState } from 'react';
import { IUser } from '@/server/model/users.model';

export default function LoginButton() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleUser = async (firebaseUser: any) => {
    if (!firebaseUser) return;

    setLoading(true);
    try {
      const response = await fetch('/api/auth/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          userUid: firebaseUser.uid, // Changed from userId to userUid
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to process user');
      }

      const data = await response.json();
      return data.user as IUser;
    } catch (error) {
      console.error('Error processing user:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await handleUser(result.user);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  if (loading) {
    return <button disabled className="opacity-50 cursor-not-allowed">Loading...</button>;
  }

  if (user) {
    return <button onClick={() => signOut(auth)}>Logout {user.email}</button>;
  }
  return <button onClick={login}>Login with Google</button>;
}