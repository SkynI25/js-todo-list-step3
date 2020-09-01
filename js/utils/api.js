import { BASE_URL } from "./data.js";

const request = async (url, option) => {
  try {
    const response = await fetch(url, option);
    return response.json();
  } catch (err) {
    throw new Error(err);
  }
};

const options = {
  POST: (data) => {
    return {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    };
  },
  DELETE: () => {
    return {
      method: "DELETE",
    };
  },
  TOGGLE: () => {
    return {
      method: "PUT",
    };
  },
  EDIT: (text) => {
    return {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        contents: text,
      }),
    };
  },
  PRIORITY: (priority) => {
    return {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priority,
      }),
    };
  },
};
const api = {
  getTeamList: () => {
    return request(`${BASE_URL}/api/teams`);
  },
  getOneTeam: (_id) => {
    return request(`${BASE_URL}/api/teams/${_id}`);
  },
  addTeamList: (data) => {
    return request(`${BASE_URL}/api/teams`, options.POST(data));
  },
  getUserList: () => {
    return request(`${BASE_URL}/api/u/`);
  },
  getTodoList: (username) => {
    return request(`${BASE_URL}/api/u/${username}/item`);
  },
  addTodoList: (username, data) => {
    return request(`${BASE_URL}/api/u/${username}/item`, options.POST(data));
  },
  deleteTodo: (username, _id) => {
    return request(
      `${BASE_URL}/api/u/${username}/item/${_id}`,
      options.DELETE()
    );
  },
  toggleTodo: (username, _id) => {
    return request(
      `${BASE_URL}/api/u/${username}/item/${_id}/toggle`,
      options.TOGGLE()
    );
  },
  editTodo: (username, _id, contents) => {
    return request(
      `${BASE_URL}/api/u/${username}/item/${_id}`,
      options.EDIT(contents)
    );
  },
  setPriority: (username, _id, priority) => {
    return request(
      `${BASE_URL}/api/u/${username}/item/${_id}/priority`,
      options.PRIORITY(priority)
    );
  },
};
export default api;
