import React, { useEffect, useState } from "react";

interface UserType {
  id: number;
  name: string;
}

const User: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  return <div>{user ? <h1>{user.name}</h1> : <p>Error: No user found</p>}</div>;
};

export default User;
