import { ApiResponse, HTTPMethod } from 'store/RootStore/ApiStore/types';
import {ApiResp, ApiRespHome, GetPersonageListParams, IStarWarsStore} from "./types";
import { normalizePersonageItem, PersonageTileApi, PersonageTileModel } from 'store/models/starWars/PersonageTile';
import rootStore from '../RootStore';

export class StarWarsStore implements IStarWarsStore {
    private readonly apiStore = rootStore.apiStore;

    async getPersonageNextList(params: GetPersonageListParams, page: number): Promise<ApiResp<PersonageTileModel>> {
        let response = await this.apiStore.request<ApiResponse<PersonageTileApi, PersonageTileApi>>({method: HTTPMethod.GET, endpoint: `/api/${params.people}/?page=${page}`, headers: {}});        
        try {
            response.data = await response.data.results.map((item: any) => {
                return normalizePersonageItem({
                    name: item.name,
                    height: item.height,
                    mass: item.mass,
                    hair_color: item.hair_color,
                    skin_color: item.skin_color,
                    eye_color: item.eye_color,
                    birth_year: item.birth_year,
                    gender: item.gender,
                    homeworld: item.homeworld,
                });
            });           
        } catch (e) {            
            return {success: response.success, data: response.data, status: response.status};
        }

        return {success: response.success, data: response.data, status: response.status};
    }
    async getHomeworldNextList(params: string): Promise<ApiRespHome<string>> {
        let response = await this.apiStore.request<ApiResponse<string, string>>({method: HTTPMethod.GET, endpoint: `/api/${params}`, headers: {}});     
        try {
            response.data = await response.data.name; 
        } catch (e) {  
                      
            return {success: response.success, data: response.data, status: response.status};
        }

        return {success: response.success, data: response.data, status: response.status};
    }
}