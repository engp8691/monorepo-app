import { http, HttpResponse } from 'msw';

const handlers = [
  http.get("http://localhost:5000/greeting", async () => {
    return HttpResponse.json({ greeting: "Hello" });
  }),
  // http.get('https://jsonplaceholder.typicode.com/posts/1', () => {
  //   return HttpResponse.json({ message: 'Mocked data' });
  // }),
  // http.get('/api/data', () => {
  //   return HttpResponse.json({ message: 'Mocked data' });
  // }),
  // http.post('/api/submit', async ({ request }) => {
  //   const data = await request.json();
  //   return HttpResponse.json({ received: data });
  // }),
];

export default handlers;