export type PersonageInfoApi = {
    name: string,
    height: string,
    mass: string,
    hair_color: string,
    skin_color: string,
    eye_color: string,
    birth_year: string,
    gender: string,
    homeworld: string,
}

export type PersonageInfoModel = {
    name: string,
    height: string,
    mass: string,
    hairColor: string,
    skinColor: string,
    eyeColor: string,
    birthYear: string,
    gender: string,
    homeworld: string,
}

export const normalizePersonageInfo = (from: PersonageInfoApi): PersonageInfoModel => {
    return {
        name: from.name,
        height: from.height,
        mass: from.mass,
        hairColor: from.hair_color,
        skinColor: from.skin_color,
        eyeColor: from.eye_color,
        birthYear: from.birth_year,
        gender: from.gender,
        homeworld: from.homeworld,
    }
}