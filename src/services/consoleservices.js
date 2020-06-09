import { http } from './api'

export default {

  findAll:() => {
    return http.get('consoles');
  },

  findById:(id) => {
    return http.get(`consoles/${id}`);
  },

  store:(console) => {
    return http.post('consoles', console);
  },

  update:(console) => {
    return http.put(`consoles/${console.id}`, console);
  },

  delete: (console) => {
    return http.delete(`consoles/${console.id}`, {data: console});
  }
}
