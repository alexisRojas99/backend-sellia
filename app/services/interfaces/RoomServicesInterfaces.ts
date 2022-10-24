export interface RequestParams {}

export interface ResponseBody {}

export interface RequestBody {}

export interface RequestQuery {
  page?: number;
  per_page?: number;
  username?: string;
  is_suspended?: boolean;
}

export interface RequestQueryCreateRoom {
  name: string;
  description: number;
  status?: boolean;
}

export interface RoomServicesInterfaces {
  index(): Promise<object>;
  getRoomById(id: string): Promise<object>;
  createRoom(dataRoom: RequestQueryCreateRoom): Promise<object>;
}
