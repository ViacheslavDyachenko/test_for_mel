import React from "react";
import { StarWarsStore } from "store/StarWarsStore/StarWarsStore";
import style from "./PersonageTile.module.scss"

interface IProps {
    name: string,
    height: string,
    mass: string,
    hairColor: string,
    skinColor: string,
    eyeColor: string,
    birthYear: string,
    gender: string,
    homeworld: string,
    index: number
}

interface IState {
    name: string
}

class PersonageTile extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            name: ''
        };
    }
    starWars = new StarWarsStore();
    async componentDidMount() {
        if(this.props.homeworld) {
            const result = await this.starWars.getHomeworldNextList(this.props.homeworld.replace('https://swapi.dev/api/', ''));        
            this.setState({name: result.data}); 
        }       
    }

    render(): React.ReactNode { 
        console.log(this.state);
               
        return (
            this.props.index % 2
            ? <div className={style.tile}>
                <div className={style.tile__content}>
                    <p className={style.tile__content_name}>Имя: {this.props.name}</p>
                    <p className={style.tile__content_height}>Рост: {this.props.height}</p>
                    <p className={style.tile__content_mass}>Вес: {this.props.mass}</p>
                    <p className={style.tile__content_hair_color}>Цвет волос: {this.props.hairColor}</p>
                    <p className={style.tile__content_skin_color}>Цвет кожи: {this.props.skinColor}</p>
                    <p className={style.tile__content_eye_color}>Цвет глаз: {this.props.eyeColor}</p>
                    <p className={style.tile__content_birth_ear}>Год рождения: {this.props.birthYear}</p>
                    <p className={style.tile__content_gender}>Пол: {this.props.gender}</p>
                    <p className={style.tile__content_homeworld}>Родная планета: {this.state.name}</p>
                </div>
                <button className={style.tile__btn}>Узнать больше</button>
            </div>
            : <div className={style.tile_white}>
                <div className={style.tile__content}>
                    <p className={style.tile_white__content_name_white}>Имя: {this.props.name}</p>
                    <p className={style.tile_white__content_height_white}>Рост: {this.props.height}</p>
                    <p className={style.tile_white__content_mass_white}>Вес: {this.props.mass}</p>
                    <p className={style.tile_white__content_hair_color_white}>Цвет волос: {this.props.hairColor}</p>
                    <p className={style.tile_white__content_skin_color_white}>Цвет кожи: {this.props.skinColor}</p>
                    <p className={style.tile_white__content_eye_color_white}>Цвет глаз: {this.props.eyeColor}</p>
                    <p className={style.tile_white__content_birth_ear_white}>Год рождения: {this.props.birthYear}</p>
                    <p className={style.tile_white__content_gender_white}>Пол: {this.props.gender}</p>
                    <p className={style.tile_white__content_homeworld_white}>Родная планета: {this.state.name}</p>
                </div>
                <button className={style.tile_white__btn_white}>Узнать больше</button>
            </div>
        )
    }
}
export default PersonageTile;