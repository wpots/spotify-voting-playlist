import type { IPlaylist, IUser } from '@domain/content';
import type { Vote } from '@firebase/api';

const votesMapper = {
  resolveVotedAverage(votes: number[]) {
    const avg = votes.reduce((acc, cum) => acc + cum, 0) / votes.length;
    return parseFloat(avg.toFixed(1));
  },
  resolveMembersVoted(votes: Vote[]) {},
  resolveVotesForPlaylistTracks(playlist: IPlaylist, votes?: Vote[]) {
    return {
      ...playlist,
      tracks: {
        ...playlist.tracks,
        items: playlist.tracks.items.map(item => {
          const trackVotes = votes?.filter(vote => vote.trackId === item?.id);
          const trackVotesWithRating = trackVotes?.reduce((a, c) => {
            if (c?.rating) a.push(c.rating);
            return a;
          }, [] as number[]);
          return {
            ...item,
            votes:
              !trackVotes || trackVotes?.length === 0
                ? undefined
                : {
                    total: trackVotes?.length,
                    veto: trackVotes?.filter(v => v.rating === -1),
                    average:
                      trackVotesWithRating && trackVotesWithRating.length > 0
                        ? this.resolveVotedAverage(trackVotesWithRating)
                        : 0,
                    items: trackVotes,
                  },
          };
        }),
      },
    };
  },

  unshiftCurrentUser(currentUserId: string, array?: IUser[]) {
    if (array?.some(i => i.id === currentUserId)) {
      const currentUserIdx = array.map(u => u.id).indexOf(currentUserId);
      const userInArray = array.splice(currentUserIdx, 1);
      array.unshift(userInArray[0]);
    }
  },
};

export default votesMapper;
