const link = 'https://opentdb.com/api_token.php?command=request';
const requestToken = async () => {
  try {
    const response = await fetch(link);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export default requestToken;
