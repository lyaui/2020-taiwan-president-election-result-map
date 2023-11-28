import { years, levels } from '@/constants/index';

export type Year = (typeof years)[number];

export type Level = keyof typeof levels;

export interface SearchParams {
  [key: string]: string | undefined;
  year?: Year;
  city?: string;
  dist?: string;
}

export interface Candidate {
  cand_id: string;
  cand_name: string;
  cand_img: string;
  party_id: string;
  party_name: string;
}

export type VotingResult = {
  name: string;
  level: Level;
  affiliation: string;
  candidates: Record<string, number>;
  votes: {
    valid_votes: number;
    invalid_votes: number;
    total_votes: number;
  };
  voter_turnout: number;
};

export type Subareas = VotingResult[];

export interface PartyVotes {
  name: string;
  id: string;
  value: number;
}

export interface PreviousPartyVotes {
  year: Year;
  party_votes: PartyVotes[];
}
