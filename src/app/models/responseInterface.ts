export interface ResponseInterface  {
  id: number;
  title: string;
  question: string;
  answers: Answer[];
  tags: QuestionTag[];
}

export interface QuestionTag {
  id: number;
  tagName: string;
}

export interface Answer {
  id: number;
  answer: string;
}


export interface ErrorInterface {
  headers: Headers;
  status: number;
  statusText: string;
  url: string;
  ok: boolean;
  name: string;
  message: string;
  error: Error;
}

export interface Error {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}

export interface Headers {
  normalizedNames: NormalizedNames;
  lazyUpdate?: any;
}

export interface NormalizedNames {
}
