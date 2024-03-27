'use client';

import { signOut, useSession } from 'next-auth/react';

export default function SettingsPage() {
  const session = useSession();

  const onClick = () => {
    signOut();
  };
  return (
    <div>
      Setting {JSON.stringify(session)}
      <button onClick={onClick} type="submit">
        Sign Out
      </button>
    </div>
  );
}
