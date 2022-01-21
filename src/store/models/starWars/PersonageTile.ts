export type PersonageTileApi = {
    personage: {
        name: string,
        height: string,
        mass: string,
        hair_color: string,
        skin_color: string,
        eye_color: string,
        birth_year: string,
        gender: string,
        homeworld: string,
    },
    count: string
}

export type PersonageTileModel = {
    personage: {
        name: string,
        height: string,
        mass: string,
        hairColor: string,
        skinColor: string,
        eyeColor: string,
        birthYear: string,
        gender: string,
        homeworld: string,
    },
    count: string
}

export const normalizePersonageItem = (from: PersonageTileApi): PersonageTileModel => {
    return {
        personage: {
            name: from.personage.name,
            height: from.personage.height,
            mass: from.personage.mass,
            hairColor: from.personage.hair_color,
            skinColor: from.personage.skin_color,
            eyeColor: from.personage.eye_color,
            birthYear: from.personage.birth_year,
            gender: from.personage.gender,
            homeworld: from.personage.homeworld,
        },
        count: from.count
    }
}