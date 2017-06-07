export class Challenge {
  public id: number;
  public name: string;
  public description: string;
  public created_at: Date;
  public updated_at: Date;
  public creator_id: number;
  public video_url: string;
  public category: string;
  public points: number;
  public expires_at: Date;
  public is_private: boolean;
  
  constructor(name: string, desc: string, creator_id: number, video_url: string, category: string, points: number, expires_at: Date, is_private: boolean) {
    this.name = name;
    this.description = desc;
    this.creator_id = creator_id;
    this.video_url = video_url;
    this.category = category;
    this.points = points;
    this.expires_at = expires_at;
    this.is_private = is_private;
  }
}

// CHALLENGE
// (FK) Creator id: number