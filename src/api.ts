export const API_URL = 'https://rickandmortyapi.com/api';

export const GET_ALL_CHARACTERS = (page: number) => {

    const params = new URLSearchParams({ page: page.toString() }).toString();
    const url = `${API_URL}/character/?${params}`;
    
    return {
        url,
        options: {
            method: 'GET'
        }
    };
};

export const GET_CHARACTER = (id: string) => {
    return {
        url: `${API_URL}/character/${id}`,
        options: {
            method: 'GET'
        }
    };
};