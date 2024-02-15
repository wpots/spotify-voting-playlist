import * as FireStoreService from '@/utils/firebase/firebase.service';
import type { SpotifyProfile } from 'next-auth/providers/spotify';

const getRefreshToken = async (token: any) => {
  try {
    const body = new URLSearchParams({ grant_type: 'refresh_token', refresh_token: token.refreshToken });
    const clientId = process.env.SPOTIFY_CLIENT_ID as string;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET as string;
    const tokenEndpoint = `https://accounts.spotify.com/api/token`;
    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
      },
      body,
    });
    const refreshedTokens = await response.json();
    if (!response.ok) {
      throw refreshedTokens;
    }
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.exp * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error: any) {
    console.error('AUTHENTICATION REFRESH TOKEN', error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};

const providerOptions = {
  clientId: process.env.SPOTIFY_CLIENT_ID as string,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
  authorization: {
    url: `https://accounts.spotify.com/authorize`,
    params: {
      scope: `user-read-email`,
    },
  },

  async profile(profile: SpotifyProfile) {
    const verifiedUser = await FireStoreService.getVerifiedUser(profile.id);
    const userProfile = {
      id: profile.id,
      name: profile.display_name,
      email: profile.email,
      ...(profile.images?.[0]?.url && { image: profile.images?.[0]?.url }),
    };
    if (verifiedUser) {
      // update users profile info to match spotify
      await FireStoreService.setUserProfile(userProfile);
    }
    return userProfile;
  },
};

export { providerOptions, getRefreshToken };
