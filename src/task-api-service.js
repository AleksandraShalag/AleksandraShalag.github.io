import ApiService from "./framework/view/api-service.js";


const Method = {
 GET: 'GET',
 PUT: 'PUT',
 POST: 'POST',
 DELETE: 'DELETE',
};


export default class TasksApiService extends ApiService {

  async getTasks() {
    const response = await this._load({url: 'tasks'});
    return ApiService.parseResponse(response);
  }

  async addTask(task) {
    const response = await this._load({
      url: 'tasks',
      method: Method.POST,
      body: JSON.stringify(task),
      headers: new Headers({ 'Content-Type': 'application/json' })
    });
    return ApiService.parseResponse(response);
  }

  async updateTask(task) {
    const response = await this._load({
      url: `tasks/${task.id}`,
      method: Method.PUT,
      body: JSON.stringify(task),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
 
    const parsedResponse = await ApiService.parseResponse(response);
 
    return parsedResponse;
  
}

   
async deleteTask(taskId) {
  await this._load({
    url: `tasks/${taskId}`,
    method: Method.DELETE,
  });
}
      
     
     

}
