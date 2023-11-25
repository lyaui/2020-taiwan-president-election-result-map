export interface SearchParams {
  [key: string]: string | undefined;
  year?: string;
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
  level: 0 | 1 | 2 | 3; // 全國 | 縣市 | 區域 | 鄉里
  candidates: Record<string, string>;
  votes: {
    valid_votes: string;
    invalid_votes: string;
    total_votes: string;
  };
  voter_turnout: string;
}
