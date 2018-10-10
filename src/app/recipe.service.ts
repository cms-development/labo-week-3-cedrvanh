import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Recipe } from './recipe';
import { RECIPES } from './mock-recipes';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private API_URL = 'https://cedrvanh.cmsdevelopment.be/wp-json/wp/v2'; // url to web api
  private API_ENDPOINT = '/recipe'

  constructor(
    private http: HttpClient,
    private messageService: MessagesService) { }

  getRecipes(): Observable<Recipe[]> {
    this.messageService.add('RecipeService: Fetched Recipes');
    return this.http.get<Recipe[]>(this.API_URL + this.API_ENDPOINT + '?_embed');
  }

  getRecipe(id: number): Observable<Recipe> {
    this.messageService.add(`RecipeService: fetched recipe id=${id}`);
    return this.http.get<Recipe>(this.API_URL + this.API_ENDPOINT + `/${id}?_embed`);
  }

  private log(message: string) {
    this.messageService.add(`RecipeService: ${message}`);
  }
}
