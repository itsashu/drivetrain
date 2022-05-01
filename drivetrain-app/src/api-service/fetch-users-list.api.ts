import { octokit } from "../utility/autocomplete-utility-functions";

export const fetchData = async (searchString: string, page: number = 1) => {
  try {
    const response = await octokit.request("GET /search/users", {
      q: searchString,
      order: "asc",
      per_page: 12,
      page,
    });
    console.dir(response);
    return response.data.items;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
