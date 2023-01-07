export default interface PostsInitialState {
  filter: {
    _start: number;
    limit: number;
  };
  comment: {
    name: string;
    email: string;
    body: string;
  };
  post: {
    userId: number;
    title: string;
    body: string;
  };
}
