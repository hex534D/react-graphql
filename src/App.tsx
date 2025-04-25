import { gql, useQuery } from '@apollo/client';

import './App.css';

const query = gql`
  query GetUsersAndTodos {
    getAllUsers {
      id
      name
      email
      todos {
        title
      }
    }
  }
`;

interface User {
  id: string;
  name: string;
  email: string;
  todos: Todo[];
}

interface Todo {
  id: string;
  title: string;
}

function App() {
  const { data: userTodos, loading } = useQuery(query);
  if (loading)
    return <h1 className="h-screen text-4xl">Loading....</h1>;
  return (
    <>
      <h1 className="text-4xl">GraphQL Apollo</h1>
      <h1 className="text-3xl my-8">Users with their Todos</h1>
      {/* <div>{JSON.stringify(data)}</div> */}

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-50"
              >
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-50"
              >
                Todos List
              </th>
            </tr>
          </thead>
          <tbody>
            {userTodos?.getAllUsers.map((user: User) => (
              <tr
                className="border border-gray-200"
                key={user?.id}
              >
                <td className="px-6 py-4 first:font-medium first:text-gray-900">
                  {user?.name}
                </td>
                <td className="px-6 py-4">{user?.email}</td>
                <td className="px-6 py-4 bg-gray-50">
                  {user?.todos.map((todo: Todo) => (
                    <li key={todo?.id}>{todo?.title}</li>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
