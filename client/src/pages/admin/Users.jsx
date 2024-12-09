import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    handleUsers();
  }, []);

  const handleUsers = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/user/list?userId=673e15380ce10815165584a2",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const responseJson = await response.json();
        console.log(responseJson.list);
        setUsers(responseJson.list);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Users</title>
        <meta name="description" content="Lista de usuários" />
      </Helmet>
      <div>
        <h1>Users</h1>
        {users &&
          users.map((item, index) => <span key={index}>{item.username}</span>)}
      </div>
    </HelmetProvider>
  );
}
