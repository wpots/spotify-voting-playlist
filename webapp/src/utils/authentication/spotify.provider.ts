const getRefreshToken = async token => {
  try {
    const body = new URLSearchParams({ grant_type: "refresh_token", refresh_token: token.refreshToken });
    const clientId = process.env.SPOTIFY_CLIENT_ID as string;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET as string;
    const tokenEndpoint = `https://accounts.spotify.com/api/token`;
    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + new Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      },
      body,
    });
    const refreshedTokens = await response.json();
    if (!response.ok) throw refreshedTokens;
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.error("AUTHENTICATION SERVICE", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

export { getRefreshToken };
