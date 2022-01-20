import { StatusHTTP } from "../RootStore/ApiStore/types";
import { PersonageTileModel } from "../models/starWars/PersonageTile"; 

export type GetPersonageListParams = {
    people: string
}

export type ApiResp<PersonageTileApi> =  {success: boolean,
                        data: PersonageTileApi[],
                        status: number | StatusHTTP.BAD_STATUS}

export type ApiRespHome<PersonageTileApi> =  {success: boolean,
                        data: PersonageTileApi,
                        status: number | StatusHTTP.BAD_STATUS}

export interface IStarWarsStore {
    getPersonageNextList(params: GetPersonageListParams, page: number): Promise<ApiResp<PersonageTileModel>>;
    getHomeworldNextList(params: string): Promise<ApiRespHome<string>>;
}