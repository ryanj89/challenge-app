export class Challenge {
  id: number;
  
  constructor(
    name: string,
    description: string,
    created_at: Date,
    updated_at: Date,
    creator: string,
    video_url: string,
    category: string,
    points: number,
    expires_at: Date,
    is_private: boolean
  ) { }
}

// CHALLENGE
// (FK) Creator id: number