export interface RequestParams {}

export interface ResponseBody {}

export interface RequestBody {}

export interface RequestQuery {
  page?: number;
  per_page?: number;
  id_room?: string;
  is_suspended?: boolean;
}

export interface RequestQueryCreateMessage {
  user: string;
  id_room: string;
  message: string;
  status?: boolean;
}

export interface MessageServicesInterfaces {
  getAllMessages(queriesMessage: RequestQuery): Promise<object>;
  createMessage(dataMessage: RequestQueryCreateMessage): Promise<object>;
}
