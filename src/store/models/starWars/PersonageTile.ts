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
        url: string
    }[],
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
        url: string
    }[],
    count: string
}

export const normalizePersonageItem = (from: PersonageTileApi): PersonageTileModel => {
    const result = from.personage.map(item => {
        return {name: item.name,
                    height: item.height,
                    mass: item.mass,
                    hairColor: item.hair_color,
                    skinColor: item.skin_color,
                    eyeColor: item.eye_color,
                    birthYear: item.birth_year,
                    gender: item.gender,
                    homeworld: item.homeworld,
                    url: item.url
                }
    })
    return {
        personage: result ,
        count: from.count,
    }
}