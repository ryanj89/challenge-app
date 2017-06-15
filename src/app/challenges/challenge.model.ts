export class Challenge {
  public id: number;
  public name: string;
  public challengers: any[];
  public submissions: any[];
  public description: string;
  public created_at: Date;
  public updated_at: Date;
  public creator_id: number;
  public public_id: string;
  public resource_type: string;
  public category: string;
  public is_private: boolean;
  
  constructor(name: string, desc: string, creator_id: number, public_id: string, resource_type: string, category: string, is_private: boolean) {
    this.name = name;
    this.description = desc;
    this.creator_id = creator_id;
    this.public_id = public_id;
    this.resource_type = resource_type;
    this.category = category;
    this.is_private = is_private;
  }
}

// CHALLENGE
// (FK) Creator id: number