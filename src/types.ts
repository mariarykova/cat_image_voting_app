export interface CatImage {
  id: string;
  url: string;
  voteScore?: number;
  userVote?: 1 | -1;
}

export interface Vote {
  id?: string;
  image_id: string;
  sub_id?: string;
  value: 1 | -1;
}

export type CatContextType = {
  cats: CatImage[];
  isLoading: boolean;
  getCats: () => void;
  vote: (imageId: string, value: 1 | -1) => void;
  votes: { image_id: string; value: 1 | -1 }[];
};