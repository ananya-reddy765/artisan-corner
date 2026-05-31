import {
  useEffect,
  useState,
} from "react";

import {
  getUsers,
  deleteUser,
  updateRole,
} from "../../services/adminService";

export default function Users() {
  const [users, setUsers] =
    useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers =
    async () => {
      try {
        const data =
          await getUsers();

        setUsers(
          data.users || []
        );
      } catch (error) {
        console.log(error);
      }
    };

  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete this user?"
        );

      if (!confirmDelete)
        return;

      try {
        await deleteUser(id);

        loadUsers();
      } catch (error) {
        console.log(error);
      }
    };

  const handleRoleChange =
    async (
      id,
      role
    ) => {
      try {
        await updateRole(
          id,
          role
        );

        loadUsers();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-5xl font-bold mb-10">
        User Management
      </h1>

      <div className="bg-white rounded-3xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Role
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map(
              (user) => (
                <tr
                  key={user._id}
                  className="border-t"
                >
                  <td className="p-4">
                    {user.name}
                  </td>

                  <td className="p-4">
                    {user.email}
                  </td>

                  <td className="p-4">

                    <select
                      value={
                        user.role
                      }
                      onChange={(
                        e
                      ) =>
                        handleRoleChange(
                          user._id,
                          e.target
                            .value
                        )
                      }
                      className="
                        border
                        px-3
                        py-2
                        rounded-xl
                      "
                    >
                      <option value="buyer">
                        Buyer
                      </option>

                      <option value="vendor">
                        Vendor
                      </option>

                      <option value="admin">
                        Admin
                      </option>

                    </select>

                  </td>

                  <td className="p-4">

                    <button
                      onClick={() =>
                        handleDelete(
                          user._id
                        )
                      }
                      className="
                        bg-red-500
                        text-white
                        px-4
                        py-2
                        rounded-xl
                      "
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}