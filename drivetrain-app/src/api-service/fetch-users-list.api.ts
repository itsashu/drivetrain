import { octokit } from "../utility/autocomplete-utility-functions";

export const fetchData = async (searchString: string) => {
  try {
    const response = await octokit.request("GET /search/users", {
      q: searchString,
    });
    // const data = await response.json();
    console.dir(response);
    return response.data.items;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
