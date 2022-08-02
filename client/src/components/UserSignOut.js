import React from 'react';
import { Redirect } from 'react-router-dom';

export default function UserSignOut({context}) {
  context.actions.signOut();

  return (
    <Redirect to="/courses" />
  );
}