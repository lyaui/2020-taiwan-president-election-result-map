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

export interface VotingResult {
  name: string;
  level: Level;
  affiliation: string;
  candidates: Record<string, string>;
  votes: {
    valid_votes: string;
    invalid_votes: string;
    total_votes: string;
  };
  voter_turnout: string;
}
