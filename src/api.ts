export const API_URL = "https://rickandmortyapi.com/api";

export const GET_ALL_CHARACTERS = (page: number, name: string) => {
  const params = new URLSearchParams({
    page: page.toString(),
    name,
  }).toString();
  const url = `${API_URL}/character/?${params}`;

  return {
    url,
    options: {
      method: "GET",
    },
  };
};

export const GET_CHARACTER = (id: string) => {
  return {
    url: `${API_URL}/character/${id}`,
    options: {
      method: "GET",
    },
  };
};

export const GET_LOCATION = (url: string) => {
  return {
    url,
    options: {
      method: "GET",
    },
  };
};

export const GET_ALL_EPISODES = (ids: string[]) => {
  const episodesIds = ids.join(", ");

  return {
    url: `${API_URL}/episode/${episodesIds}`,
    options: {
      method: "GET",
    },
  };
};
