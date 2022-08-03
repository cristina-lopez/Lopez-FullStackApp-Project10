import React from 'react';
import { Redirect } from 'react-router-dom';

export default function UserSignOut({context}) {
  context.actions.signOut();
  console.log("You are now signed out!")

  return (
    <Redirect to="/courses" />
  );
}