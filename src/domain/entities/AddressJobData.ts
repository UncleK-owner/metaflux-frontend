export class AddressJobData {
  id: string;
  title: string;
  description: string;
  createdAt: Date; 
  updatedAt: Date; 

  constructor(id: string, title: string, description: string, createdAt: string, updatedAt: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
  }
}
